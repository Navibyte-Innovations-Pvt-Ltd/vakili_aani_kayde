export function getBaseUrl() {
    if (typeof window !== "undefined") {
        return window.location.origin;
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

    // Local fallback
    return "http://127.0.0.1:2222";
}
