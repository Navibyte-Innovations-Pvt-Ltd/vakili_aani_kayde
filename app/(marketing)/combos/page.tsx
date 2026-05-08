import { getComboEbooks } from "@/lib/data-access";
import { EbookCatalog } from "@/components/marketing/ebook-catalog";
import { Metadata } from "next";
import { Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "कॉम्बो पॅक्स | वकिली आणि कायदे",
  description: "एकाच किमतीत अनेक कायदेशीर मार्गदर्शक ई-बुक्स. विशेष सवलतीत कॉम्बो पॅक्स मिळवा.",
};

export default async function CombosPage() {
  const ebooks = await getComboEbooks();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "कायदेशीर कॉम्बो पॅक्स | वकिली आणि कायदे",
    "description": "एकाच किमतीत अनेक कायदेशीर मार्गदर्शक ई-बुक्स.",
    "url": "https://www.vakilianikayde.in/combos",
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

      {/* Offer banner */}
      <div className="border-b border-brand-gold/15 bg-white px-4 py-3">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-gold text-brand-teal">
            <Zap className="h-4 w-4" />
          </div>
          <p className="text-sm font-bold text-brand-teal">
            मर्यादित वेळ ऑफर — सर्व कॉम्बो पॅक्सवर विशेष सवलत!
            <span className="ml-2 text-xs font-normal text-gray-400">एकापेक्षा जास्त पुस्तके एकाच PDF मध्ये</span>
          </p>
        </div>
      </div>

      {/* Catalog */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        <EbookCatalog initialEbooks={ebooks} />
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
