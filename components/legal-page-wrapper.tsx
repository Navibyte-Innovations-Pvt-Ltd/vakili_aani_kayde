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
    <div className="min-h-screen bg-white">
      {/* Page hero — dark navy */}
      <div className="bg-brand-teal px-4 py-10 md:py-14">
        <div className="mx-auto max-w-4xl">
          {/* Breadcrumb */}
          <nav className="mb-5 flex items-center gap-1.5 text-[11px] font-medium text-white/40">
            <Link href="/" className="transition-colors hover:text-white/70">मुख्यपृष्ठ</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white/60">{title}</span>
          </nav>

          {/* Title block */}
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-brand-gold/30 bg-brand-gold/15">
              <Icon className="h-6 w-6 text-brand-gold" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white md:text-3xl lg:text-4xl">
                {title}
              </h1>
              <p className="mt-1 text-sm font-medium text-white/50">{titleEn}</p>
              <p className="mt-2 text-[11px] text-white/30">Last updated: {lastUpdated}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gold accent strip */}
      <div className="h-1 w-full bg-linear-to-r from-brand-gold/60 via-brand-gold to-brand-gold/60" />

      {/* Info banner */}
      <div className="border-b border-brand-gold/15 bg-amber-50 px-4 py-4">
        <div className="mx-auto flex max-w-4xl items-start gap-3">
          <Scale className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" />
          <div>
            <p className="text-xs font-black tracking-wider text-brand-teal uppercase">{badge}</p>
            <p className="mt-0.5 text-sm text-slate-600">{bannerText}</p>
            <p className="mt-0.5 text-[11px] text-slate-400">{badgeEn}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-10 md:py-14">
        <div className="legal-content space-y-8 leading-relaxed text-gray-700">
          {children}
        </div>
      </div>

      {/* Bottom CTA strip */}
      <div className="border-t border-gray-100 bg-brand-cream px-4 py-8">
        <div className="mx-auto max-w-4xl flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="font-bold text-brand-teal">काही प्रश्न आहेत?</p>
            <p className="text-sm text-slate-500">आमच्याशी संपर्क करा — आम्ही मदत करू.</p>
          </div>
          <Link
            href="/contact"
            className="rounded-lg bg-brand-gold px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-brand-gold/90"
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
    <section className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50/80 px-5 py-3">
        {number && (
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-gold/15 text-xs font-black text-brand-gold">
            {number}
          </span>
        )}
        <h2 className="text-base font-bold text-brand-teal md:text-lg">{title}</h2>
      </div>
      <div className="px-5 py-4 text-sm leading-relaxed text-gray-600 md:text-base [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_strong]:font-semibold [&_strong]:text-gray-800">
        {children}
      </div>
    </section>
  );
}

export function LegalInfoCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-brand-gold/20 bg-amber-50 px-5 py-4 text-sm leading-relaxed text-amber-900 [&_strong]:font-bold [&_strong]:text-amber-950">
      {children}
    </div>
  );
}
