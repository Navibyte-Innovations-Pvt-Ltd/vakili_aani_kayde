/**
 * Normalize a string into a URL-safe slug: lowercase, ASCII, hyphen-separated.
 * Non-ASCII (e.g. Devanagari) characters are dropped, so Marathi titles yield
 * only their Latin/numeric parts — admins are expected to provide/refine the slug.
 */
export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "") // strip diacritics
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // non-alphanumeric → hyphen
    .replace(/^-+|-+$/g, "") // trim leading/trailing hyphens
    .replace(/-{2,}/g, "-") // collapse repeats
    .slice(0, 80);
}

/** True if the value is already a clean slug. */
export function isValidSlug(value: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}
