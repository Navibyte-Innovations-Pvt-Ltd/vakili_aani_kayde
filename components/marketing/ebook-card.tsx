"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight, BookOpen, Loader2 } from "lucide-react";
import { SALE_CONFIG, getInflatedOriginalPrice } from "@/lib/sale-config";
import { DiscountBadge } from "@/components/marketing/sale-timer";
import { useNavLanguage } from "@/components/nav-language-context";
import { type Language } from "@/lib/languages";

const BUY_LABEL: Record<Language, string> = {
  MARATHI: "खरेदी करा",
  HINDI: "खरीदें",
  ENGLISH: "Buy Now",
  TAMIL: "வாங்கவும்",
  TELUGU: "కొనుగోలు",
  GUJARATI: "ખरीदो",
  BENGALI: "কিনুন",
};

interface EbookCardProps {
  ebook: {
    id: string;
    slug?: string | null;
    displayId?: number;
    title: string;
    description: string;
    price: string | number;
    coverImage: string | null;
    isCombo?: boolean;
    pages?: number | null;
  };
  searchQuery?: string;
  className?: string;
}

function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").trim();
}

function HighlightText({ text, query }: { text: string; query?: string }) {
  if (!query) return <>{text}</>;
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="rounded-sm bg-brand-gold/35 px-0.5 font-bold text-brand-teal not-italic">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

export function EbookCard({ ebook, searchQuery, className }: EbookCardProps) {
  const isSaleActive = SALE_CONFIG.isActive;
  const finalPrice = Number(ebook.price);
  const crossedPrice = getInflatedOriginalPrice(finalPrice);
  const [isLoading, setIsLoading] = useState(false);
  const description = stripHtml(ebook.description);
  const buyLabel = BUY_LABEL[useNavLanguage()];

  return (
    <Link
      href={`/ebooks/${ebook.slug ?? ebook.id}`}
      onClick={() => setIsLoading(true)}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-teal/30 hover:shadow-[0_8px_32px_rgba(26,76,90,0.14)] ${className}`}
    >
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center rounded-2xl bg-white/70 backdrop-blur-sm">
          <Loader2 className="h-7 w-7 animate-spin text-brand-teal" />
        </div>
      )}

      {/* Image Block */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3/4" }}>
        {ebook.coverImage ? (
          <Image
            src={ebook.coverImage}
            alt={ebook.title}
            fill
            unoptimized
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 22vw"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-linear-to-br from-brand-teal/10 to-brand-gold/10">
            <BookOpen className="mb-2 h-10 w-10 text-brand-teal/30" />
            <span className="text-xs font-medium text-brand-teal/40">No Cover</span>
          </div>
        )}

        {/* Bottom gradient for readability */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/50 to-transparent" />

        {/* Top-right: sale badge */}
        <div className="absolute top-2.5 right-2.5 z-10 flex flex-col items-end gap-1">
          <DiscountBadge />
          {ebook.isCombo && (
            <span className="rounded-md bg-brand-teal px-2 py-0.5 text-[10px] font-black text-brand-gold uppercase tracking-wide ring-1 ring-brand-gold/40">
              Combo
            </span>
          )}
        </div>

        {/* Bottom-left: pages */}
        {ebook.pages && ebook.pages > 0 && (
          <div className="absolute bottom-2.5 left-2.5 z-10 flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
            <BookOpen className="h-2.5 w-2.5" />
            {ebook.pages} pgs
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-3.5 pt-3 pb-3.5">
        {/* Title */}
        <h3 className="font-heading mb-1.5 line-clamp-2 text-[14px] font-bold leading-snug text-brand-teal transition-colors group-hover:text-brand-gold">
          <HighlightText text={ebook.title} query={searchQuery} />
        </h3>

        {/* Description — 1 line only */}
        {description && (
          <p className="mb-3 line-clamp-1 text-[11px] text-gray-400">
            <HighlightText text={description} query={searchQuery} />
          </p>
        )}

        {/* Price row */}
        <div className="mt-auto flex flex-col gap-2">
          <div className="flex items-baseline gap-1.5">
            <span className={`text-[15px] font-extrabold leading-none ${isSaleActive ? "text-red-500" : "text-brand-teal"}`}>
              ₹{finalPrice}
            </span>
            <span className="text-[10px] font-medium text-gray-300 line-through">₹{crossedPrice}</span>
          </div>

          {/* CTA — full width */}
          <div className="flex w-full items-center justify-center gap-1 rounded-full bg-brand-teal px-2 py-2 text-[11px] font-bold text-white transition-colors group-hover:bg-brand-gold group-hover:text-brand-teal">
            {buyLabel}
            <ArrowRight className="h-3 w-3 shrink-0 transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
