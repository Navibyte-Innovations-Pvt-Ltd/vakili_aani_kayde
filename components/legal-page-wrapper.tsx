import Link from "next/link";
import { ChevronRight, Scale } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface LegalPageWrapperProps {
  title: string;
  titleEn: string;
  icon: LucideIcon;
  badge: string;
  badgeEn: string;
  bannerText: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

export function LegalPageWrapper({
  title,
  titleEn,
  icon: Icon,
  badge,
  badgeEn,
  bannerText,
  lastUpdated = "May 2026",
  children,
}: LegalPageWrapperProps) {
  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Page hero — maroon, left-aligned editorial masthead */}
      <div className="relative overflow-hidden bg-brand-teal px-4 py-12 md:py-16">
        {/* Soft brass glow */}
        <div className="pointer-events-none absolute -top-16 -right-10 h-64 w-64 rounded-full bg-brand-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-brand-gold/5 blur-3xl" />

        <div className="relative mx-auto max-w-4xl">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-1.5 text-[11px] font-medium text-white/40">
            <Link href="/" className="transition-colors hover:text-brand-gold">मुख्यपृष्ठ</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white/60">{title}</span>
          </nav>

          {/* Kicker eyebrow */}
          <div className="mb-4 flex items-center gap-2.5">
            <span className="h-px w-7 bg-brand-gold" />
            <span className="text-[10px] font-bold tracking-[0.25em] text-brand-gold uppercase">
              कायदेशीर दस्तऐवज · Legal
            </span>
          </div>

          {/* Title block — large framed icon beside serif title */}
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md border-2 border-brand-gold/50 bg-brand-gold/10">
              <Icon className="h-8 w-8 text-brand-gold" />
            </div>
            <div>
              <h1 className="font-heading text-3xl leading-tight font-black text-white md:text-4xl lg:text-5xl">
                {title}
              </h1>
              <p className="mt-1.5 text-sm font-medium tracking-wide text-brand-gold/80">{titleEn}</p>
            </div>
          </div>

          <p className="mt-5 text-[11px] tracking-wide text-white/30">अखेरचे अद्यतन · Last updated: {lastUpdated}</p>
        </div>
      </div>

      {/* Brass double-rule divider */}
      <div className="h-1 w-full bg-brand-gold" />
      <div className="h-px w-full bg-brand-teal/20" />

      {/* Info banner — paper card overlapping the hero edge */}
      <div className="px-4">
        <div className="mx-auto -mt-px max-w-4xl">
          <div className="flex items-start gap-3.5 border-x border-b border-brand-gold/25 bg-white px-5 py-4 shadow-sm">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand-gold/12">
              <Scale className="h-4.5 w-4.5 text-brand-gold" />
            </div>
            <div>
              <p className="text-[11px] font-black tracking-wider text-brand-teal uppercase">{badge}</p>
              <p className="mt-1 text-sm leading-relaxed text-brand-ink/70">{bannerText}</p>
              <p className="mt-1 text-[11px] text-brand-ink/40">{badgeEn}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">
        <div className="legal-content space-y-7 leading-relaxed text-brand-ink/80">
          {children}
        </div>
      </div>

      {/* Bottom CTA strip — maroon band, serif heading */}
      <div className="bg-brand-teal px-4 py-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-4">
            <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-md border border-brand-gold/40 bg-brand-gold/10 sm:flex">
              <Scale className="h-5 w-5 text-brand-gold" />
            </div>
            <div>
              <p className="font-heading text-lg font-bold text-white">काही प्रश्न आहेत?</p>
              <p className="text-sm text-white/55">आमच्याशी संपर्क करा — आम्ही मदत करू.</p>
            </div>
          </div>
          <Link
            href="/contact"
            className="rounded-md bg-brand-gold px-6 py-2.5 text-sm font-bold text-brand-teal shadow-sm ring-1 ring-brand-gold/40 transition-all hover:bg-white hover:ring-white active:scale-95"
          >
            संपर्क करा (Contact Us)
          </Link>
        </div>
      </div>
    </div>
  );
}

/* Shared section heading style — use inside legal pages */
export function LegalSection({
  number,
  title,
  children,
}: {
  number?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="group relative overflow-hidden rounded-md border border-brand-gold/20 bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Left maroon accent rail */}
      <span className="absolute inset-y-0 left-0 w-1 bg-brand-teal/15 transition-colors group-hover:bg-brand-gold" />
      <div className="flex items-center gap-3 border-b border-brand-gold/15 bg-brand-cream/60 px-5 py-3.5 pl-6">
        {number && (
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-brand-teal font-heading text-xs font-black text-brand-gold">
            {number}
          </span>
        )}
        <h2 className="font-heading text-base font-bold text-brand-teal md:text-lg">{title}</h2>
      </div>
      <div className="px-5 py-4 pl-6 text-sm leading-relaxed text-brand-ink/70 md:text-base [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_strong]:font-semibold [&_strong]:text-brand-teal">
        {children}
      </div>
    </section>
  );
}

export function LegalInfoCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-md border-l-4 border-brand-gold bg-brand-gold/8 px-5 py-4 text-sm leading-relaxed text-brand-ink/80 [&_strong]:font-bold [&_strong]:text-brand-teal">
      {children}
    </div>
  );
}
