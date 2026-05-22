import { prisma_db } from "./prisma";
import { cache } from "react";

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
export async function getEbooksByLanguage(language: "MARATHI" | "HINDI" | "ENGLISH") {
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
export const getEbookById = cache(async (id: string) => {
    const ebook = await prisma_db.ebook.findUnique({
        where: { id },
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
