import { getEbooksByLanguage } from "@/lib/data-access";
import { EbookCatalog } from "@/components/marketing/ebook-catalog";
import { PixelCatalogView } from "../_components/pixel-catalog-view";
import { BookOpen } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "हिंदी कानूनी पुस्तकें | वकिली आणि कायदे",
  description: "हिंदी में सरल भाषा में कानूनी मार्गदर्शक ई-बुक्स.",
};

export default async function HindiEbooksPage() {
  const ebooks = await getEbooksByLanguage("HINDI");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "हिंदी कानूनी पुस्तकें | वकिली आणि कायदे",
    "description": "हिंदी में सरल भाषा में कानूनी मार्गदर्शक ई-बुक्स.",
    "url": "https://www.vakilianikayde.in/ebooks/hindi",
    "inLanguage": "hi",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": ebooks.map((ebook, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://www.vakilianikayde.in/ebooks/${ebook.id}`,
        "name": ebook.title,
      })),
    },
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PixelCatalogView totalCount={ebooks.length} category="hindi" />

      {/* Language tabs */}
      <div className="border-b border-gray-100 bg-white px-4">
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto py-2">
          <Link href="/ebooks" className="rounded-full px-4 py-1.5 text-xs font-bold text-gray-500 transition-colors hover:bg-brand-teal/8 hover:text-brand-teal">
            सर्व
          </Link>
          <span className="rounded-full bg-brand-teal px-4 py-1.5 text-xs font-black text-white">
            हिंदी
          </span>
          <Link href="/ebooks/english" className="rounded-full px-4 py-1.5 text-xs font-bold text-gray-500 transition-colors hover:bg-brand-teal/8 hover:text-brand-teal">
            English
          </Link>
        </div>
      </div>

      {/* Catalog */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        {ebooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-gold/15 bg-white shadow-sm">
              <BookOpen className="h-8 w-8 text-brand-gold/60" />
            </div>
            <p className="font-black text-brand-teal">जल्द ही उपलब्ध होगी</p>
            <p className="mt-1 text-sm text-gray-400">नई पुस्तकें जोड़ी जा रही हैं.</p>
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
