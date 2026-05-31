import Link from "next/link";
import {
  LANGUAGES,
  LANGUAGE_NATIVE,
  LANGUAGE_ROUTE,
  languageHref,
  type Language,
} from "@/lib/languages";

/**
 * Language landing-page tabs. `current` is the active language, or "ALL" for
 * the default /ebooks page. MARATHI has no dedicated route — it lives under
 * the "सर्व" (All) tab at /ebooks.
 */
export function EbookLanguageTabs({ current }: { current: Language | "ALL" }) {
  const tabClass = "rounded-full px-4 py-1.5 text-xs font-bold text-gray-500 transition-colors hover:bg-brand-teal/8 hover:text-brand-teal";
  const activeClass = "rounded-full bg-brand-teal px-4 py-1.5 text-xs font-black text-white";

  return (
    <div className="border-b border-gray-100 bg-white px-4">
      <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto py-2">
        {current === "ALL" ? (
          <span className={activeClass}>सर्व</span>
        ) : (
          <Link href="/ebooks" className={tabClass}>सर्व</Link>
        )}
        {LANGUAGES.filter((lang) => LANGUAGE_ROUTE[lang] !== "").map((lang) =>
          current === lang ? (
            <span key={lang} className={activeClass}>{LANGUAGE_NATIVE[lang]}</span>
          ) : (
            <Link key={lang} href={languageHref(lang)} className={tabClass}>
              {LANGUAGE_NATIVE[lang]}
            </Link>
          )
        )}
      </div>
    </div>
  );
}
