"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { LANGUAGE_COOKIE, LANGUAGE_ROUTE, type Language } from "@/lib/languages";

type Ctx = {
  language: Language;
  setOverride: (o: { path: string; lang: Language }) => void;
  setLanguage: (lang: Language) => void;
};

const NavLanguageContext = createContext<Ctx>({
  language: "MARATHI",
  setOverride: () => {},
  setLanguage: () => {},
});

/** Language from a `/ebooks/<slug>` listing path, or null if the path has none. */
function langFromPath(pathname: string): Language | null {
  const match = pathname.match(/^\/ebooks\/([^/]+)\/?$/);
  if (!match) return null;
  const slug = match[1];
  const found = (Object.entries(LANGUAGE_ROUTE) as [Language, string][]).find(
    ([, s]) => s !== "" && s === slug,
  );
  return found ? found[0] : null;
}

function persist(lang: Language) {
  // 1-year sticky preference; readable by the server layout for no-flash SSR.
  document.cookie = `${LANGUAGE_COOKIE}=${lang}; path=/; max-age=31536000; samesite=lax`;
}

/**
 * Holds the active site language. Precedence:
 *   manual pick  →  current page's language (book/listing)  →  persisted cookie  →  MARATHI
 * Any page-derived or manual language is persisted, so it sticks across the
 * session and to generic pages (home, my-books) — e.g. a Gujarati-ad visitor
 * who lands on a Gujarati book keeps Gujarati chrome everywhere afterwards.
 *
 * `initialLanguage` comes from the cookie read server-side (see marketing layout).
 */
export function NavLanguageProvider({
  children,
  initialLanguage = "MARATHI",
}: {
  children: ReactNode;
  initialLanguage?: Language;
}) {
  const pathname = usePathname();
  const [manual, setManual] = useState<Language | null>(null);
  const [override, setOverride] = useState<{ path: string; lang: Language } | null>(null);

  const pageLang = override && override.path === pathname ? override.lang : langFromPath(pathname);
  const language = manual ?? pageLang ?? initialLanguage;

  // Persist whichever signal the page surfaced, so later generic pages inherit it.
  useEffect(() => {
    const chosen = manual ?? pageLang;
    if (chosen) persist(chosen);
  }, [manual, pageLang]);

  const setLanguage = (lang: Language) => {
    setManual(lang);
    persist(lang);
  };

  return (
    <NavLanguageContext.Provider value={{ language, setOverride, setLanguage }}>
      {children}
    </NavLanguageContext.Provider>
  );
}

export function useNavLanguage(): Language {
  return useContext(NavLanguageContext).language;
}

/** Imperatively set + persist the language (for a manual switcher). */
export function useSetLanguage(): (lang: Language) => void {
  return useContext(NavLanguageContext).setLanguage;
}

/**
 * Drop this on a page (e.g. the ebook detail page) to make the site language
 * adopt that page's language. Renders nothing.
 */
export function SetNavLanguage({ language }: { language: Language }) {
  const pathname = usePathname();
  const { setOverride } = useContext(NavLanguageContext);
  useEffect(() => {
    setOverride({ path: pathname, lang: language });
  }, [pathname, language, setOverride]);
  return null;
}
