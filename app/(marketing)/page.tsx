import { Suspense } from "react";
import { HeroSection } from "@/components/marketing/hero-section";
import { EbooksContainer } from "@/components/marketing/ebooks-container";
import { EbooksLoading } from "@/components/marketing/ebooks-loading";
import { FeaturesSection } from "@/components/marketing/features-section";

import { CombosContainer } from "@/components/marketing/combos-container";

import { BuyingGuideSection } from "@/components/marketing/buying-guide-section";


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <HeroSection />

      <Suspense fallback={<EbooksLoading />}>
        <EbooksContainer />
      </Suspense>

      <Suspense fallback={<EbooksLoading />}>
        <CombosContainer />
      </Suspense>

      <FeaturesSection />

      <BuyingGuideSection />
      {/* LeadMagnet hidden as it is email-based
      <div className="container mx-auto px-4 py-16">
        <LeadMagnet />
      </div>
      */}
    </div>
  );
}
