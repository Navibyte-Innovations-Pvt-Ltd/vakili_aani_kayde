"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { LANGUAGE_ROUTE, type Language } from "@/lib/languages";

type Ctx = {
  language: Language;
  setOverride: (o: { path: string; lang: Language }) => void;
};

const NavLanguageContext = createContext<Ctx>({
  language: "MARATHI",
  setOverride: () => {},
});

/** Derive language from a `/ebooks/<slug>` listing path; MARATHI otherwise. */
function langFromPath(pathname: string): Language {
  const match = pathname.match(/^\/ebooks\/([^/]+)\/?$/);
  if (match) {
    const slug = match[1];
    const found = (Object.entries(LANGUAGE_ROUTE) as [Language, string][]).find(
      ([, s]) => s !== "" && s === slug,
    );
    if (found) return found[0];
  }
  return "MARATHI";
}

export function NavLanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  // Override is keyed to the path that set it, so a stale value is ignored once
  // the route changes — no reset effect, no race with SetNavLanguage.
  const [override, setOverride] = useState<{ path: string; lang: Language } | null>(null);
  const language = override && override.path === pathname ? override.lang : langFromPath(pathname);

  return (
    <NavLanguageContext.Provider value={{ language, setOverride }}>
      {children}
    </NavLanguageContext.Provider>
  );
}

export function useNavLanguage(): Language {
  return useContext(NavLanguageContext).language;
}

/**
 * Drop this on a page (e.g. the ebook detail page) to make the bottom nav adopt
 * that page's language. Renders nothing.
 */
export function SetNavLanguage({ language }: { language: Language }) {
  const pathname = usePathname();
  const { setOverride } = useContext(NavLanguageContext);
  useEffect(() => {
    setOverride({ path: pathname, lang: language });
  }, [pathname, language, setOverride]);
  return null;
}
