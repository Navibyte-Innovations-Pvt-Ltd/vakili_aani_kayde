import "server-only";
import { cookies } from "next/headers";
import { LANGUAGE_COOKIE, coerceLanguage, type Language } from "@/lib/languages";

/**
 * Resolve the visitor's sticky language from the pref_lang cookie, server-side.
 * Use in server components (homepage sections, listing pages) to localize chrome.
 * Client components should use `useNavLanguage()` instead.
 */
export async function getServerLanguage(): Promise<Language> {
  return coerceLanguage((await cookies()).get(LANGUAGE_COOKIE)?.value);
}
