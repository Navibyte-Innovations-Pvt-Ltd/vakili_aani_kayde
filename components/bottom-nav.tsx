"use client";

import Link from "next/link";
import { Scale, Library, Layers, BookMarked } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", icon: Scale, label: "मुख्यपृष्ठ" },
  { href: "/ebooks", icon: Library, label: "ई-बुक्स" },
  { href: "/combos", icon: Layers, label: "कॉम्बो", special: true },
  { href: "/my-books", icon: BookMarked, label: "पुस्तके" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="pb-safe fixed right-0 bottom-0 left-0 z-50 md:hidden">
      {/* Solid paper backing with maroon top hairline */}
      <div className="absolute inset-0 bg-brand-cream/95 backdrop-blur-xl" />
      <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-brand-teal/0 via-brand-gold to-brand-teal/0" />

      <div className="relative flex h-16 items-stretch justify-around px-2">
        {NAV_ITEMS.map(({ href, icon: Icon, label, special }) => {
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
