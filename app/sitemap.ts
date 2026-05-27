import { MetadataRoute } from "next";
import { getEbooks, getComboEbooks } from "@/lib/data-access";

const BASE_URL = "https://www.vakilianikayde.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [ebooks, combos] = await Promise.all([getEbooks(), getComboEbooks()]);

    const staticRoutes: MetadataRoute.Sitemap = [
        { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
        { url: `${BASE_URL}/ebooks`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
        { url: `${BASE_URL}/ebooks/hindi`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
        { url: `${BASE_URL}/ebooks/english`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
        { url: `${BASE_URL}/combos`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
        { url: `${BASE_URL}/resources`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
        { url: `${BASE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
        { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
        { url: `${BASE_URL}/refund-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
        { url: `${BASE_URL}/shipping-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    ];

    const ebookRoutes: MetadataRoute.Sitemap = ebooks
        .filter((e) => !e.isCombo)
        .map((ebook) => ({
            url: `${BASE_URL}/ebooks/${ebook.id}`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        }));

    const comboRoutes: MetadataRoute.Sitemap = combos.map((combo) => ({
        url: `${BASE_URL}/combos/${combo.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
    }));

    return [...staticRoutes, ...ebookRoutes, ...comboRoutes];
}
