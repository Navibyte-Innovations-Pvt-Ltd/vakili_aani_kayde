"use client";

import Link from "next/link";
import { Scale, Library, BookMarked } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { type Language } from "@/lib/languages";
import { useNavLanguage } from "@/components/nav-language-context";

type NavKey = "home" | "ebooks" | "combos" | "mybooks";

const NAV_ITEMS: { href: string; icon: typeof Scale; key: NavKey; special?: boolean }[] = [
  { href: "/", icon: Scale, key: "home" },
  { href: "/ebooks", icon: Library, key: "ebooks" },
  { href: "/my-books", icon: BookMarked, key: "mybooks" },
];

const NAV_LABELS: Record<Language, Record<NavKey, string>> = {
  MARATHI: { home: "मुख्यपृष्ठ", ebooks: "ई-बुक्स", combos: "कॉम्बो", mybooks: "पुस्तके" },
  HINDI: { home: "होम", ebooks: "ई-बुक्स", combos: "कॉम्बो", mybooks: "मेरी किताबें" },
  ENGLISH: { home: "Home", ebooks: "Ebooks", combos: "Combos", mybooks: "My Books" },
  TAMIL: { home: "முகப்பு", ebooks: "மின்னூல்கள்", combos: "காம்போ", mybooks: "புத்தகங்கள்" },
  TELUGU: { home: "హోమ్", ebooks: "ఈ-బుక్‌లు", combos: "కాంబో", mybooks: "పుస్తకాలు" },
  GUJARATI: { home: "હોમ", ebooks: "ઈ-બુક્સ", combos: "કોમ્બો", mybooks: "પુસ્તકો" },
  BENGALI: { home: "হোম", ebooks: "ই-বুক", combos: "কম্বো", mybooks: "বই" },
};

export function BottomNav() {
  const pathname = usePathname();
  const labels = NAV_LABELS[useNavLanguage()];

  // Hide on ebook detail pages (/ebooks/[id])
  if (/^\/ebooks\/[^/]+$/.test(pathname)) return null;

  return (
    <nav className="pb-safe fixed right-0 bottom-0 left-0 z-50 md:hidden">
      {/* Solid paper backing with maroon top hairline */}
      <div className="absolute inset-0 bg-brand-cream/95 backdrop-blur-xl" />
      <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-brand-teal/0 via-brand-gold to-brand-teal/0" />

      <div className="relative flex h-16 items-stretch justify-around px-2">
        {NAV_ITEMS.map(({ href, icon: Icon, key, special }) => {
          const label = labels[key];
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="relative flex flex-1 flex-col items-center justify-center gap-1 py-1 transition-all active:scale-90"
            >
              {/* Active top indicator bar */}
              <span
                className={cn(
                  "absolute top-0 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-brand-teal transition-all duration-300",
                  active ? "w-8 opacity-100" : "w-0 opacity-0",
                )}
              />

              {/* Bare icon — outline style, no pill */}
              <div className="relative">
                <Icon
                  strokeWidth={active ? 2.4 : 1.8}
                  className={cn(
                    "h-5.5 w-5.5 transition-all duration-200",
                    active
                      ? "text-brand-teal"
                      : special
                        ? "text-brand-gold"
                        : "text-brand-ink/40",
                  )}
                />
                {special && !active && (
                  <span className="absolute -top-1 -right-1.5 h-1.5 w-1.5 rounded-full bg-brand-gold ring-2 ring-brand-cream" />
                )}
              </div>

              {/* Label */}
              <span
                className={cn(
                  "text-[10px] leading-none transition-colors",
                  active
                    ? "font-black text-brand-teal"
                    : special
                      ? "font-bold text-brand-gold"
                      : "font-medium text-brand-ink/40",
                )}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
