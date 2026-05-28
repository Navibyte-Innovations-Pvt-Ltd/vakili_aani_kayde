import crypto from "crypto";

const PIXEL_ID = "1553042196387954";
const CAPI_URL = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events`;

function hashValue(value: string): string {
    return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

function normalizePhone(phone: string): string {
    // Strip all non-digits, ensure Indian number with country code
    const digits = phone.replace(/\D/g, "");
    if (digits.length === 10) return `91${digits}`;
    if (digits.length === 12 && digits.startsWith("91")) return digits;
    return digits;
}

export interface CAPIPurchaseParams {
    orderId: string;
    amount: number;
    contentIds: string[];
    customerPhone?: string | null;
    customerEmail?: string | null;
    clientIp?: string | null;
    clientUserAgent?: string | null;
    eventSourceUrl?: string | null;
}

/**
 * Send server-side Purchase event to Meta Conversions API.
 * Non-blocking — never throws, logs errors silently.
 * event_id matches the browser pixel eventID for deduplication.
 */
export async function sendMetaCAPIPurchase(params: CAPIPurchaseParams): Promise<void> {
    const token = process.env.META_CAPI_TOKEN;
    if (!token) return; // Silently skip if not configured

    const userData: Record<string, string | string[]> = {};
    if (params.customerPhone) {
        userData.ph = [hashValue(normalizePhone(params.customerPhone))];
    }
    if (params.customerEmail) {
        userData.em = [hashValue(params.customerEmail)];
    }
    if (params.clientIp) {
        userData.client_ip_address = params.clientIp;
    }
    if (params.clientUserAgent) {
        userData.client_user_agent = params.clientUserAgent;
    }

    const payload = {
        data: [
            {
                event_name: "Purchase",
                event_time: Math.floor(Date.now() / 1000),
                event_id: params.orderId, // deduplicates with browser pixel (same eventID)
                action_source: "website",
                event_source_url: params.eventSourceUrl || "https://www.vakilianikayde.in/my-books",
                user_data: userData,
                custom_data: {
                    value: params.amount,
                    currency: "INR",
                    content_ids: params.contentIds,
                    content_type: "product",
                    num_items: params.contentIds.length,
                },
            },
        ],
    };

    try {
        const res = await fetch(`${CAPI_URL}?access_token=${token}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        if (!res.ok) {
            const err = await res.text().catch(() => "unknown");
            console.error("[META_CAPI] Failed:", res.status, err);
        } else {
            console.info("[META_CAPI] Purchase event sent for order:", params.orderId);
        }
    } catch (err) {
        // Never let CAPI failure break order fulfillment
        console.error("[META_CAPI] Network error:", err instanceof Error ? err.message : err);
    }
}
