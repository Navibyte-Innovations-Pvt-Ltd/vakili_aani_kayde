"use client";

import { Globe, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LANGUAGES, LANGUAGE_NATIVE } from "@/lib/languages";
import { useNavLanguage, useSetLanguage } from "@/components/nav-language-context";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function LanguageSwitcher({ className }: { className?: string }) {
  const current = useNavLanguage();
  const setLanguage = useSetLanguage();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex items-center gap-1.5 rounded-lg border border-brand-teal/15 px-2.5 py-1.5 text-xs font-bold text-brand-teal transition-colors hover:bg-brand-teal/5",
          className,
        )}
        aria-label="Change language"
      >
        <Globe className="h-3.5 w-3.5" />
        {LANGUAGE_NATIVE[current]}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => { setLanguage(lang); router.refresh(); }}
            className={cn(
              "flex items-center justify-between gap-2 text-sm font-semibold",
              current === lang && "text-brand-teal",
            )}
          >
            {LANGUAGE_NATIVE[lang]}
            {current === lang && <Check className="h-3.5 w-3.5 text-brand-gold" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
