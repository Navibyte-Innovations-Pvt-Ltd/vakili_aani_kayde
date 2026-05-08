"use client";

import Link from "next/link";
import { Home, BookOpen, Sparkles, Download } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/ebooks", icon: BookOpen, label: "E-Books" },
  { href: "/combos", icon: Sparkles, label: "Combos", special: true },
  { href: "/my-books", icon: Download, label: "My Books" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="pb-safe fixed right-0 bottom-0 left-0 z-50 md:hidden">
      {/* Blur backing */}
      <div className="absolute inset-0 bg-white/90 backdrop-blur-xl" />
      {/* Top border accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand-gold/30 to-transparent" />

      <div className="relative flex h-16 items-center justify-around px-2">
        {NAV_ITEMS.map(({ href, icon: Icon, label, special }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-1 flex-col items-center justify-center gap-1 py-1 transition-all active:scale-90"
            >
              {/* Icon pill */}
              <div
                className={cn(
                  "relative flex h-9 w-9 items-center justify-center rounded-2xl transition-all duration-200",
                  active
                    ? "bg-brand-teal shadow-[0_4px_12px_rgba(10,31,61,0.18)]"
                    : special
                      ? "bg-brand-gold/10"
                      : "bg-transparent",
                )}
              >
                <Icon
                  className={cn(
                    "h-[18px] w-[18px] transition-colors",
                    active
                      ? "text-white"
                      : special
                        ? "text-brand-gold"
                        : "text-gray-400",
                  )}
                />
                {special && !active && (
                  <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-orange-500" />
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
                      : "font-medium text-gray-400",
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
