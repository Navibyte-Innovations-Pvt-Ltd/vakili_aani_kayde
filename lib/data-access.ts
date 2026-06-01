import { prisma_db } from "./prisma";
import { cache } from "react";
import type { Language } from "./languages";
import { toIST, fromIST, getNowIST } from "./date-utils";
import { startOfDay, subDays, eachDayOfInterval, format } from "date-fns";

export type BookwiseSales = {
    rangeDays: number;
    summary: { revenue: number; units: number; orders: number; prevRevenue: number; prevUnits: number };
    books: { ebookId: string; title: string; isCombo: boolean; revenue: number; units: number }[];
    daily: { date: string; revenue: number; units: number }[];
    /** Per-book daily revenue, aligned index-for-index with `daily` dates. */
    seriesByBook: Record<string, number[]>;
};

export type AdPerformance = {
    rangeDays: number;
    summary: {
        spend: number; revenue: number; orders: number; roas: number; net: number; cac: number;
        prevSpend: number; prevRevenue: number; prevRoas: number;
    };
    daily: { date: string; spend: number; revenue: number; orders: number; roas: number | null; net: number }[];
};

/**
 * Blended ad performance: daily total ad spend vs PAID revenue → ROAS/net/CAC.
 * Account-level (not per-campaign). IST day-bucketed, with previous equal period.
 */
export async function getAdPerformance(rangeDays: number): Promise<AdPerformance> {
    const nowIST = getNowIST();
    const startIST = startOfDay(subDays(nowIST, rangeDays - 1));
    const prevStartIST = startOfDay(subDays(nowIST, rangeDays * 2 - 1));
    const from = fromIST(startIST);
    const prevFrom = fromIST(prevStartIST);

    const [orders, spends] = await Promise.all([
        prisma_db.order.findMany({
            where: { status: "PAID", createdAt: { gte: prevFrom } },
            select: { amount: true, createdAt: true },
        }),
        prisma_db.adSpend.findMany({
            where: { date: { gte: prevFrom } },
            select: { amount: true, date: true },
        }),
    ]);

    const dayRev = new Map<string, { revenue: number; orders: number }>();
    const daySpend = new Map<string, number>();
    let prevRevenue = 0;
    let prevSpend = 0;

    for (const o of orders) {
        if (o.createdAt >= from) {
            const k = format(toIST(o.createdAt), "yyyy-MM-dd");
            const d = dayRev.get(k) ?? { revenue: 0, orders: 0 };
            d.revenue += o.amount; d.orders += 1; dayRev.set(k, d);
        } else { prevRevenue += o.amount; }
    }
    for (const s of spends) {
        if (s.date >= from) {
            const k = format(toIST(s.date), "yyyy-MM-dd");
            daySpend.set(k, (daySpend.get(k) ?? 0) + s.amount);
        } else { prevSpend += s.amount; }
    }

    const daily = eachDayOfInterval({ start: startIST, end: nowIST }).map((d) => {
        const k = format(d, "yyyy-MM-dd");
        const rev = dayRev.get(k) ?? { revenue: 0, orders: 0 };
        const spend = Math.round(daySpend.get(k) ?? 0);
        const revenue = Math.round(rev.revenue);
        return {
            date: k,
            spend,
            revenue,
            orders: rev.orders,
            roas: spend > 0 ? Number((revenue / spend).toFixed(2)) : null,
            net: revenue - spend,
        };
    });

    const spend = daily.reduce((s, d) => s + d.spend, 0);
    const revenue = daily.reduce((s, d) => s + d.revenue, 0);
    const ordersCount = daily.reduce((s, d) => s + d.orders, 0);
    prevRevenue = Math.round(prevRevenue);
    prevSpend = Math.round(prevSpend);

    return {
        rangeDays,
        summary: {
            spend, revenue, orders: ordersCount,
            roas: spend > 0 ? Number((revenue / spend).toFixed(2)) : 0,
            net: revenue - spend,
            cac: ordersCount > 0 ? Math.round(spend / ordersCount) : 0,
            prevSpend, prevRevenue,
            prevRoas: prevSpend > 0 ? Number((prevRevenue / prevSpend).toFixed(2)) : 0,
        },
        daily,
    };
}

/**
 * Daily book-wise PAID sales for the dashboard, bucketed by IST day.
 * "units" = count of OrderItem rows (no quantity field exists); a combo is a
 * single line on the combo SKU and does not double-count its included books.
 * Includes the immediately preceding equal-length period for delta comparison.
 */
export async function getBookwiseSales(rangeDays: number): Promise<BookwiseSales> {
    const nowIST = getNowIST();
    const startIST = startOfDay(subDays(nowIST, rangeDays - 1));
    const prevStartIST = startOfDay(subDays(nowIST, rangeDays * 2 - 1));
    const from = fromIST(startIST);
    const prevFrom = fromIST(prevStartIST);

    // One query covers current + previous window (createdAt >= prevFrom).
    const items = await prisma_db.orderItem.findMany({
        where: { order: { status: "PAID", createdAt: { gte: prevFrom } } },
        select: {
            price: true,
            ebookId: true,
            orderId: true,
            order: { select: { createdAt: true } },
            ebook: { select: { title: true, isCombo: true } },
        },
    });

    const bookMap = new Map<string, { title: string; isCombo: boolean; revenue: number; units: number }>();
    const dayMap = new Map<string, { revenue: number; units: number }>();
    const bookDayMap = new Map<string, Map<string, number>>(); // ebookId -> dayKey -> revenue
    const orderSet = new Set<string>();
    let prevRevenue = 0;
    let prevUnits = 0;

    for (const it of items) {
        const created = it.order.createdAt;
        if (created >= from) {
            // Current period
            const key = it.ebookId;
            const book = bookMap.get(key) ?? { title: it.ebook.title, isCombo: it.ebook.isCombo, revenue: 0, units: 0 };
            book.revenue += it.price;
            book.units += 1;
            bookMap.set(key, book);

            const dayKey = format(toIST(created), "yyyy-MM-dd");
            const day = dayMap.get(dayKey) ?? { revenue: 0, units: 0 };
            day.revenue += it.price;
            day.units += 1;
            dayMap.set(dayKey, day);

            const bd = bookDayMap.get(key) ?? new Map<string, number>();
            bd.set(dayKey, (bd.get(dayKey) ?? 0) + it.price);
            bookDayMap.set(key, bd);

            orderSet.add(it.orderId);
        } else {
            // Previous comparison period
            prevRevenue += it.price;
            prevUnits += 1;
        }
    }

    // Zero-filled daily series across the whole range.
    const daily = eachDayOfInterval({ start: startIST, end: nowIST }).map((d) => {
        const dayKey = format(d, "yyyy-MM-dd");
        const day = dayMap.get(dayKey) ?? { revenue: 0, units: 0 };
        return { date: dayKey, revenue: Math.round(day.revenue), units: day.units };
    });

    const books = Array.from(bookMap.entries())
        .map(([ebookId, b]) => ({ ebookId, title: b.title, isCombo: b.isCombo, revenue: Math.round(b.revenue), units: b.units }))
        .sort((a, b) => b.revenue - a.revenue);

    const revenue = books.reduce((s, b) => s + b.revenue, 0);
    const units = books.reduce((s, b) => s + b.units, 0);

    const dayKeys = daily.map((d) => d.date);
    const seriesByBook: Record<string, number[]> = {};
    for (const [ebookId, bd] of bookDayMap.entries()) {
        seriesByBook[ebookId] = dayKeys.map((k) => Math.round(bd.get(k) ?? 0));
    }

    return {
        rangeDays,
        summary: { revenue, units, orders: orderSet.size, prevRevenue: Math.round(prevRevenue), prevUnits },
        books,
        daily,
        seriesByBook,
    };
}

// Cache tags kept for revalidateTag() callers (no-op without persistent cache)
export const CACHE_TAGS = {
    EBOOKS: "ebooks",
    ORDERS: "orders",
} as const;

/**
 * 1. Get all enabled ebooks (Full list)
 */
export async function getEbooks() {
    const data = await prisma_db.ebook.findMany({
        where: { isEnabled: true },
        orderBy: { createdAt: "desc" },
    });
    return data.map((ebook) => ({
        ...ebook,
        price: ebook.price.toString(),
        category: ebook.category || null,
    }));
}

/**
 * 1b. Get ebooks filtered by language
 */
export async function getEbooksByLanguage(language: Language) {
    const data = await prisma_db.ebook.findMany({
        where: { isEnabled: true, language },
        orderBy: { createdAt: "desc" },
    });
    return data.map((ebook) => ({
        ...ebook,
        price: ebook.price.toString(),
        category: ebook.category || null,
    }));
}

/**
 * 2. Get Combo Packages only
 */
export async function getComboEbooks() {
    const data = await prisma_db.ebook.findMany({
        where: { isEnabled: true, isCombo: true },
        orderBy: { createdAt: "desc" },
    });
    return data.map((ebook) => ({
        ...ebook,
        price: ebook.price.toString(),
        category: ebook.category || null,
    }));
}

/**
 * 3. Get Ebook by ID with full details
 * React.cache gives per-request memoization only (no cross-request DB cache).
 */
export const getEbookById = cache(async (idOrSlug: string) => {
    // Resolve by SEO slug first, then fall back to the cuid id (old links).
    const ebook = await prisma_db.ebook.findFirst({
        where: { OR: [{ slug: idOrSlug }, { id: idOrSlug }] },
        include: { includedEbooks: { include: { ebook: true } } },
    });
    if (!ebook) return null;

    // Flatten join table and sort based on comboOrder
    let sortedIncludedEbooks = ebook.includedEbooks.map((ci) => ci.ebook);
    if (ebook.comboOrder && ebook.comboOrder.length > 0) {
        const orderMap = new Map(ebook.comboOrder.map((id: string, index: number) => [id, index]));
        sortedIncludedEbooks = [...sortedIncludedEbooks].sort((a, b) => {
            const indexA = orderMap.get(a.id) ?? 9999;
            const indexB = orderMap.get(b.id) ?? 9999;
            return indexA - indexB;
        });
    }

    return {
        ...ebook,
        price: ebook.price.toString(),
        category: ebook.category || null,
        includedEbooks: sortedIncludedEbooks.map((item) => ({
            ...item,
            price: item.price.toString(),
            category: item.category || null,
        })),
    };
});

/**
 * 4. Search Ebooks with query
 */
export async function searchEbooks(query: string) {
    const isNumeric = /^\d+$/.test(query);
    const displayId = isNumeric ? parseInt(query) : undefined;

    const ebooks = await prisma_db.ebook.findMany({
        where: {
            isEnabled: true,
            OR: [
                { title: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
                { category: { contains: query, mode: 'insensitive' } },
                ...(displayId !== undefined ? [{ displayId }] : []),
            ],
        },
        orderBy: [
            // If it's a numeric query, prioritize exact displayId match
            ...(displayId !== undefined ? [{ displayId: 'asc' as const }] : []),
            { createdAt: 'desc' as const },
        ],
        take: 20, // Limit results for performance
    });

    return ebooks.map((ebook) => ({
        ...ebook,
        price: ebook.price.toString(),
        category: ebook.category || null,
    }));
}
