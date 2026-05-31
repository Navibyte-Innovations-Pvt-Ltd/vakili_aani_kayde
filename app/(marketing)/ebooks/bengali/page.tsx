import { getEbooksByLanguage } from "@/lib/data-access";
import { EbookCatalog } from "@/components/marketing/ebook-catalog";
import { EbookLanguageTabs } from "@/components/marketing/ebook-language-tabs";

import { BookOpen } from "lucide-react";
import { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "বাংলা আইনি বই | वकिली आणि कायदे",
  description: "সহজ বাংলায় আইনি গাইড ই-বুক। সম্পত্তি আইন, ভোক্তা অধিকার, সাইবার জালিয়াতি এবং আরও অনেক কিছু।",
};

export default async function BengaliEbooksPage() {
  const ebooks = await getEbooksByLanguage("BENGALI");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "বাংলা আইনি বই | वकिली आणि कायदे",
    "description": "সহজ বাংলায় আইনি গাইড ই-বুক।",
    "url": "https://www.vakilianikayde.in/ebooks/bengali",
    "inLanguage": "bn",
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

      {/* Language tabs */}
      <EbookLanguageTabs current="BENGALI" />

      {/* Catalog */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        {ebooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-gold/15 bg-white shadow-sm">
              <BookOpen className="h-8 w-8 text-brand-gold/60" />
            </div>
            <p className="font-black text-brand-teal">শীঘ্রই আসছে</p>
            <p className="mt-1 text-sm text-gray-400">নতুন বই যোগ করা হচ্ছে।</p>
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
