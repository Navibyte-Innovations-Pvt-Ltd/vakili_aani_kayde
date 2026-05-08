import { prisma_db } from "./prisma";
import { unstable_cache } from "next/cache";
import { cache } from "react";

// Cache tags for invalidation
export const CACHE_TAGS = {
    EBOOKS: "ebooks",
    ORDERS: "orders",
} as const;

/**
 * 1. Get all enabled ebooks (Full list)
 * Cached for 1 hour, tagged for manual invalidation.
 */
export const getEbooks = unstable_cache(
    async () => {
        const data = await prisma_db.ebook.findMany({
            where: { isEnabled: true },
            orderBy: { createdAt: "desc" },
        });
        return data.map((ebook) => ({
            ...ebook,
            price: ebook.price.toString(),
            category: ebook.category || null,
        }));
    },
    ["all-ebooks"],
    { tags: [CACHE_TAGS.EBOOKS], revalidate: 86400 }
);

/**
 * 1b. Get ebooks filtered by language
 */
export const getEbooksByLanguage = (language: "MARATHI" | "HINDI" | "ENGLISH") =>
    unstable_cache(
        async () => {
            const data = await prisma_db.ebook.findMany({
                where: { isEnabled: true, language },
                orderBy: { createdAt: "desc" },
            });
            return data.map((ebook) => ({
                ...ebook,
                price: ebook.price.toString(),
                category: ebook.category || null,
            }));
        },
        [`ebooks-lang-${language}`],
        { tags: [CACHE_TAGS.EBOOKS], revalidate: 86400 }
    )();

/**
 * 2. Get Combo Packages only
 */
export const getComboEbooks = unstable_cache(
    async () => {
        const data = await prisma_db.ebook.findMany({
            where: { isEnabled: true, isCombo: true },
            orderBy: { createdAt: "desc" },
        });
        return data.map((ebook) => ({
            ...ebook,
            price: ebook.price.toString(),
            category: ebook.category || null,
        }));
    },
    ["combo-ebooks"],
    { tags: [CACHE_TAGS.EBOOKS], revalidate: 86400 }
);

/**
 * 3. Get Ebook by ID with full details
 * Uses React.cache for per-request memoization + unstable_cache for persistent caching.
 */
export const getEbookById = cache(async (id: string) => {
    return unstable_cache(
        async (id: string) => {
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
        },
        [`ebook-${id}-sorted`],
        { tags: [CACHE_TAGS.EBOOKS], revalidate: 86400 }
    )(id);
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
