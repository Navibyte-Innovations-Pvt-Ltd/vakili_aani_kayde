export function getBaseUrl() {
    if (typeof window !== "undefined") {
        return process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
    }

    // Canonical production domain — highest priority for user-facing links
    if (process.env.NEXT_PUBLIC_SITE_URL) {
        return process.env.NEXT_PUBLIC_SITE_URL;
    }

    // Server-side: check explicit env first
    const envUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_APP_URL;

    if (envUrl) {
        // Local dev: Turbopack binds to 127.0.0.1 not localhost
        if (envUrl.includes("localhost")) {
            return envUrl.replace("https://", "http://").replace("localhost", "127.0.0.1");
        }
        return envUrl;
    }

    // Vercel auto-injects VERCEL_URL (no protocol, no trailing slash)
    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
    }

    // Production canonical domain — never leak localhost in user-facing links
    // (emails, WhatsApp) when env vars are missing.
    if (process.env.NODE_ENV === "production") {
        return "https://www.vakilianikayde.in";
    }

    // Local fallback
    return "http://127.0.0.1:2222";
}
