import { getEbooks } from "@/lib/data-access";
import { EbookCatalog } from "@/components/marketing/ebook-catalog";
import { EbookLanguageTabs } from "@/components/marketing/ebook-language-tabs";

import { BookOpen } from "lucide-react";
import { Metadata } from "next";

export const revalidate = 0; // Always render fresh — new books should appear immediately

export const metadata: Metadata = {
  title: "ई-बुक्स | वकिली आणि कायदे",
  description: "मराठीत सोप्या भाषेत कायदेशीर मार्गदर्शक ई-बुक्स. मालमत्ता, ग्राहक हक्क, सायबर कायदा आणि बरेच काही.",
};

export default async function EbooksPage() {
  const ebooks = await getEbooks();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "ई-बुक्स | वकिली आणि कायदे",
    "description": "मराठीत सोप्या भाषेत कायदेशीर मार्गदर्शक ई-बुक्स.",
    "url": "https://www.vakilianikayde.in/ebooks",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": ebooks.map((ebook, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://www.vakilianikayde.in/ebooks/${ebook.slug ?? ebook.id}`,
        "name": ebook.title,
      })),
    },
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Language tabs */}
      <EbookLanguageTabs current="ALL" />

      {/* Catalog */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        {ebooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-gold/15 bg-white shadow-sm">
              <BookOpen className="h-8 w-8 text-brand-gold/60" />
            </div>
            <p className="font-black text-brand-teal">लवकरच उपलब्ध होणार</p>
            <p className="mt-1 text-sm text-gray-400">नवीन पुस्तके जोडली जात आहेत.</p>
          </div>
        ) : (
          <EbookCatalog initialEbooks={ebooks} />
        )}
      </div>

      {/* Bottom strip */}
      <div className="border-t border-gray-100 bg-white px-4 py-5 text-center">
        <p className="text-xs text-gray-400">
          वकिली आणि कायदे · vakilianikayde.in · Pune, Maharashtra
          <span className="mx-2 text-gray-200">|</span>
          Digital ebooks for educational purposes only — not legal advice.
        </p>
      </div>
    </div>
  );
}
