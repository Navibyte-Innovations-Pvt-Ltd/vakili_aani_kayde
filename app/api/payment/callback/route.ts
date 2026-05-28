import { NextRequest, NextResponse } from "next/server";
import { prisma_db } from "@/lib/prisma";
import crypto from "crypto";
import { fulfillOrder } from "@/lib/order-fulfillment";
import { logOrderEvent } from "@/lib/order-logger";

export async function POST(req: NextRequest) {
    // Track order context so the catch block can pass it to the fallback URL
    let fallbackOrderId: string | null = null;
    let fallbackPhone: string | null = null;
    let fallbackEmail: string | null = null;
    let fallbackAmount: string | null = null;
    let fallbackEbookId: string | null = null;

    try {
        // Razorpay sends data as form-urlencoded
        const formData = await req.formData();

        const razorpay_payment_id = formData.get("razorpay_payment_id") as string;
        const razorpay_order_id = formData.get("razorpay_order_id") as string;
        const razorpay_signature = formData.get("razorpay_signature") as string;

        if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
            const error_code = formData.get("error[code]");
            const error_description = formData.get("error[description]");
            const error_reason = formData.get("error[reason]");

            if (error_code) {
                // Look up DB order so the event is linked to the correct orderId
                const failedOrder = razorpay_order_id
                    ? await prisma_db.order.findUnique({ where: { razorpayOrderId: razorpay_order_id }, select: { id: true } }).catch(() => null)
                    : null;

                console.error("[CALLBACK] Payment failed:", { error_code, error_description, error_reason, order_id: razorpay_order_id });
                await logOrderEvent("CALLBACK_ERROR", "callback", failedOrder?.id ?? null, {
                    razorpayOrderId: razorpay_order_id,
                    error_code,
                    error_description,
                    error_reason,
                });
                return NextResponse.redirect(new URL(`/?payment_error=${encodeURIComponent(error_description as string || "Failed")}`, req.url));
            }

            // Empty callback — user likely abandoned mid-redirect (back button, network drop)
            // Look up order so abandonment is linked to the correct orderId
            const abandonedOrder = razorpay_order_id
                ? await prisma_db.order.findUnique({ where: { razorpayOrderId: razorpay_order_id }, select: { id: true } }).catch(() => null)
                : null;

            console.warn("[CALLBACK] Empty callback received — no payment or error fields. Likely user abandoned.", {
                keys: [...formData.keys()],
            });
            await logOrderEvent("CALLBACK_EMPTY", "callback", abandonedOrder?.id ?? null, {
                formKeys: [...formData.keys()],
                razorpayOrderId: razorpay_order_id,
            });
            return NextResponse.redirect(new URL("/", req.url));
        }

        const secret = process.env.RAZORPAY_KEY_SECRET || "";
        const generated_signature = crypto
            .createHmac("sha256", secret)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        if (generated_signature !== razorpay_signature) {
            await logOrderEvent("CALLBACK_SIG_INVALID", "callback", null, { razorpayOrderId: razorpay_order_id });
            return new NextResponse("Invalid signature", { status: 400 });
        }

        // Fetch Order
        const existingOrder = await prisma_db.order.findUnique({
            where: { razorpayOrderId: razorpay_order_id }
        });

        if (!existingOrder) {
            console.error("Order not found during callback:", razorpay_order_id);
            return new NextResponse("Order not found", { status: 404 });
        }

        // Capture context for fallback URL before any async that might throw
        fallbackOrderId = existingOrder.id;
        fallbackPhone = existingOrder.customerPhone ?? null;
        fallbackEmail = existingOrder.customerEmail ?? null;
        fallbackAmount = existingOrder.amount.toString();

        await logOrderEvent("CALLBACK_RECEIVED", "callback", existingOrder.id, {
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,
        });

        // Fulfill Order (This is idempotent)
        const result = await fulfillOrder(existingOrder.id, razorpay_payment_id, "callback");
        fallbackEbookId = result.ebookId ?? null;

        const successUrl = new URL("/my-books", req.url);
        successUrl.searchParams.set("orderId", existingOrder.id);
        successUrl.searchParams.set("payment_success", "true");
        successUrl.searchParams.set("amount", existingOrder.amount.toString());
        successUrl.searchParams.set("currency", "INR");

        if (existingOrder.customerPhone) {
            successUrl.searchParams.set("phone", existingOrder.customerPhone);
        }
        if (existingOrder.customerEmail) {
            successUrl.searchParams.set("email", existingOrder.customerEmail);
        }

        // Get ebook info from result
        if (result.ebookTitle) {
            successUrl.searchParams.set("title", result.ebookTitle);
        }
        if (result.ebookId) {
            successUrl.searchParams.set("ebook_id", result.ebookId);
        }

        if (result.browser_access_token) {
            successUrl.searchParams.set("access_token", result.browser_access_token);
        }

        return NextResponse.redirect(successUrl, { status: 303 });

    } catch (error) {
        console.error("[PAYMENT_CALLBACK_ERROR]", error);
        // Never show a blank 500 to a paying customer.
        // Pass all available context so the pending-poll page can fire the pixel
        // once the webhook fulfills the order.
        const fallbackUrl = new URL("/my-books", req.url);
        fallbackUrl.searchParams.set("payment_pending", "true");
        if (fallbackOrderId) fallbackUrl.searchParams.set("orderId", fallbackOrderId);
        if (fallbackPhone) fallbackUrl.searchParams.set("phone", fallbackPhone);
        if (fallbackEmail) fallbackUrl.searchParams.set("email", fallbackEmail);
        if (fallbackAmount) fallbackUrl.searchParams.set("amount", fallbackAmount);
        if (fallbackEbookId) fallbackUrl.searchParams.set("ebook_id", fallbackEbookId);
        return NextResponse.redirect(fallbackUrl, { status: 303 });
    }
}
