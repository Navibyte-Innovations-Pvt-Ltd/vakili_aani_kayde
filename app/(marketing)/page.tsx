import { Suspense } from "react";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/marketing/hero-section";
import { AdvisorSection } from "@/components/marketing/advisor-section";
import { EbooksContainer } from "@/components/marketing/ebooks-container";
import { EbooksLoading } from "@/components/marketing/ebooks-loading";
import { FeaturesSection } from "@/components/marketing/features-section";

import { CombosContainer } from "@/components/marketing/combos-container";

import { BuyingGuideSection } from "@/components/marketing/buying-guide-section";

// Lazy load heavy client components
const TestimonialsSection = dynamic(
  () =>
    import("@/components/marketing/testimonials-section").then(
      (mod) => mod.TestimonialsSection
    ),
  {
    loading: () => <div className="h-100 bg-gray-50/50" />, // Simple placeholder
    ssr: true, // Keep SSR for SEO, but split the JS bundle
  }
);

const CommunitySection = dynamic(
  () =>
    import("@/components/marketing/community-section").then(
      (mod) => mod.CommunitySection
    ),
  {
    loading: () => <div className="h-75 bg-teal-900/10" />,
    ssr: true,
  }
);

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

      <BuyingGuideSection />

      <AdvisorSection />

      <FeaturesSection />
      <TestimonialsSection />
      <CommunitySection />
      {/* LeadMagnet hidden as it is email-based
      <div className="container mx-auto px-4 py-16">
        <LeadMagnet />
      </div>
      */}
    </div>
  );
}
