/**
 * Single source of truth for the ebook content languages.
 *
 * Adding a language = add it to LANGUAGES below, then fill in every
 * `Record<Language, …>` map in this file. TypeScript then forces the rest of
 * the codebase (forms, badges, page/checkout label blobs) to provide a value
 * for the new language — incomplete maps fail `bun run validate`.
 *
 * NOTE: the Prisma `Language` enum (prisma/schema.prisma) must be kept in sync.
 */

/** Cookie that stores the visitor's sticky language preference. */
export const LANGUAGE_COOKIE = "pref_lang";

export const LANGUAGES = [
  "MARATHI",
  "HINDI",
  "ENGLISH",
  "TAMIL",
  "TELUGU",
  "GUJARATI",
  "BENGALI",
] as const;

export type Language = (typeof LANGUAGES)[number];

/** Native script name — used in catalog tabs and product page. */
export const LANGUAGE_NATIVE: Record<Language, string> = {
  MARATHI: "मराठी",
  HINDI: "हिंदी",
  ENGLISH: "English",
  TAMIL: "தமிழ்",
  TELUGU: "తెలుగు",
  GUJARATI: "ગુજરાતી",
  BENGALI: "বাংলা",
};

/** "<native> (English)" — used in admin add/edit dropdowns. */
export const LANGUAGE_DROPDOWN: Record<Language, string> = {
  MARATHI: "मराठी (Marathi)",
  HINDI: "हिंदी (Hindi)",
  ENGLISH: "English",
  TAMIL: "தமிழ் (Tamil)",
  TELUGU: "తెలుగు (Telugu)",
  GUJARATI: "ગુજરાતી (Gujarati)",
  BENGALI: "বাংলা (Bengali)",
};

/** Short badge label for the dashboard ebooks list. */
export const LANGUAGE_SHORT: Record<Language, string> = {
  MARATHI: "मराठी",
  HINDI: "हिंदी",
  ENGLISH: "EN",
  TAMIL: "தமிழ்",
  TELUGU: "తెలుగు",
  GUJARATI: "ગુજ.",
  BENGALI: "বাংলা",
};

/** Tailwind classes for the dashboard language badge. */
export const LANGUAGE_BADGE: Record<Language, string> = {
  MARATHI: "bg-orange-50 text-orange-700 border-orange-200",
  HINDI: "bg-blue-50 text-blue-700 border-blue-200",
  ENGLISH: "bg-green-50 text-green-700 border-green-200",
  TAMIL: "bg-purple-50 text-purple-700 border-purple-200",
  TELUGU: "bg-pink-50 text-pink-700 border-pink-200",
  GUJARATI: "bg-cyan-50 text-cyan-700 border-cyan-200",
  BENGALI: "bg-indigo-50 text-indigo-700 border-indigo-200",
};

/** ISO 639-1 code for schema.org `inLanguage`. */
export const LANGUAGE_ISO: Record<Language, string> = {
  MARATHI: "mr",
  HINDI: "hi",
  ENGLISH: "en",
  TAMIL: "ta",
  TELUGU: "te",
  GUJARATI: "gu",
  BENGALI: "bn",
};

/**
 * URL slug under /ebooks for each language's listing page.
 * MARATHI is the default `/ebooks` page (empty slug).
 */
export const LANGUAGE_ROUTE: Record<Language, string> = {
  MARATHI: "",
  HINDI: "hindi",
  ENGLISH: "english",
  TAMIL: "tamil",
  TELUGU: "telugu",
  GUJARATI: "gujarati",
  BENGALI: "bengali",
};

/** href for a language's listing page. */
export function languageHref(language: Language): string {
  const slug = LANGUAGE_ROUTE[language];
  return slug ? `/ebooks/${slug}` : "/ebooks";
}

const LANGUAGE_SET = new Set<string>(LANGUAGES);

/** Narrow an arbitrary string to a valid Language, defaulting to MARATHI. */
export function coerceLanguage(value: unknown): Language {
  return typeof value === "string" && LANGUAGE_SET.has(value)
    ? (value as Language)
    : "MARATHI";
}

/** True if the value is a valid Language enum member. */
export function isLanguage(value: unknown): value is Language {
  return typeof value === "string" && LANGUAGE_SET.has(value);
}
