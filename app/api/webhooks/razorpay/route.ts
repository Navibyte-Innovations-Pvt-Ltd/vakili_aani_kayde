import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma_db } from "@/lib/prisma";
import { fulfillOrder } from "@/lib/order-fulfillment";
import { logOrderEvent } from "@/lib/order-logger";

type RazorpayPaymentEntity = {
    id?: string;
    order_id?: string;
    payment_link_id?: string;
    email?: string;
    contact?: string;
    error_code?: string;
    error_description?: string;
    error_reason?: string;
    notes?: {
        db_order_id?: string;
        [key: string]: unknown;
    };
};

type RazorpayPaymentLinkEntity = {
    id?: string;
    reference_id?: string;
    status?: string;
    payments?: Array<{ payment_id?: string }>;
    notes?: {
        db_order_id?: string;
        [key: string]: unknown;
    };
};

type RazorpayWebhookPayload = {
    event?: string;
    payload?: {
        payment?: { entity?: RazorpayPaymentEntity };
        payment_link?: { entity?: RazorpayPaymentLinkEntity };
    };
};

function hasValidSignature(rawBody: string, signature: string | null, secret: string): boolean {
    if (!signature || !secret) return false;

    const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
    const expectedBuffer = Buffer.from(expected);
    const signatureBuffer = Buffer.from(signature);

    return expectedBuffer.length === signatureBuffer.length &&
        crypto.timingSafeEqual(expectedBuffer, signatureBuffer);
}

async function findOrderForWebhook(
    payment?: RazorpayPaymentEntity,
    paymentLink?: RazorpayPaymentLinkEntity,
) {
    const dbOrderId = payment?.notes?.db_order_id ?? paymentLink?.notes?.db_order_id ?? paymentLink?.reference_id;

    if (dbOrderId) {
        const order = await prisma_db.order.findUnique({ where: { id: dbOrderId } });
        if (order) return order;
    }

    if (payment?.order_id) {
        const order = await prisma_db.order.findUnique({ where: { razorpayOrderId: payment.order_id } });
        if (order) return order;
    }

    const paymentLinkId = payment?.payment_link_id ?? paymentLink?.id;
    if (paymentLinkId) {
        const order = await prisma_db.order.findFirst({ where: { razorpayPaymentLinkId: paymentLinkId } });
        if (order) return order;
    }

    if (payment?.id) {
        return prisma_db.order.findFirst({ where: { razorpayPaymentId: payment.id } });
    }

    return null;
}

export async function POST(req: NextRequest) {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || "";

    if (!hasValidSignature(rawBody, signature, webhookSecret)) {
        console.error("[RAZORPAY_WEBHOOK] Invalid signature");
        return new NextResponse("Invalid signature", { status: 401 });
    }

    let body: RazorpayWebhookPayload;
    try {
        body = JSON.parse(rawBody) as RazorpayWebhookPayload;
    } catch (error) {
        console.error("[RAZORPAY_WEBHOOK] Invalid JSON payload", error);
        return new NextResponse("Invalid JSON", { status: 400 });
    }

    const event = body.event || "unknown";
    const payment = body.payload?.payment?.entity;
    const paymentLink = body.payload?.payment_link?.entity;

    try {
        const order = await findOrderForWebhook(payment, paymentLink);
        const paymentId = payment?.id ?? paymentLink?.payments?.[0]?.payment_id;
        const eventName = event === "payment_link.paid" ? "PAYMENT_LINK_WEBHOOK_RECEIVED" : "WEBHOOK_RECEIVED";

        await logOrderEvent(eventName, "webhook", order?.id, {
            event,
            razorpayOrderId: payment?.order_id,
            razorpayPaymentId: paymentId,
            razorpayPaymentLinkId: payment?.payment_link_id ?? paymentLink?.id,
        });

        if (!order) {
            await logOrderEvent("WEBHOOK_ORDER_NOT_FOUND", "webhook", null, {
                event,
                razorpayOrderId: payment?.order_id,
                razorpayPaymentId: paymentId,
                razorpayPaymentLinkId: payment?.payment_link_id ?? paymentLink?.id,
            });
            return NextResponse.json({ ok: true, handled: false, reason: "order_not_found" });
        }

        if (event === "payment.captured" || event === "order.paid" || event === "payment_link.paid") {
            if (!paymentId) {
                console.warn("[RAZORPAY_WEBHOOK] Missing payment id for paid event", { event, orderId: order.id });
                return NextResponse.json({ ok: true, handled: false, reason: "missing_payment_id" });
            }

            const result = await fulfillOrder(order.id, paymentId, "webhook");
            return NextResponse.json({ ok: true, handled: true, orderId: result.orderId, isNewPayment: result.isNewPayment });
        }

        // Payment attempt declined by bank/card/UPI. Mark FAILED — but never overwrite a
        // PAID/already-FAILED order. A later payment.captured (Razorpay allows retry on the
        // same order_id) re-flips FAILED→PAID via fulfillOrder's `status != PAID` guard.
        if (event === "payment.failed") {
            const reason = payment?.error_description || payment?.error_reason || payment?.error_code || "Payment failed";
            const updated = await prisma_db.order.updateMany({
                where: { id: order.id, status: { notIn: ["PAID", "FAILED"] } },
                data: { status: "FAILED", failureReason: String(reason) },
            });
            await logOrderEvent("PAYMENT_FAILED_WEBHOOK", "webhook", order.id, {
                razorpayPaymentId: paymentId,
                error_code: payment?.error_code,
                error_description: payment?.error_description,
                error_reason: payment?.error_reason,
                statusChanged: updated.count > 0,
            });
            return NextResponse.json({ ok: true, handled: true, orderId: order.id, status: "FAILED", changed: updated.count > 0 });
        }

        // Payment link cancelled or expired — mark CANCELLED unless already PAID/FAILED.
        if (event === "payment_link.cancelled" || event === "payment_link.expired") {
            const updated = await prisma_db.order.updateMany({
                where: { id: order.id, status: { notIn: ["PAID", "FAILED"] } },
                data: { status: "CANCELLED", failureReason: event },
            });
            await logOrderEvent("ORDER_CANCELLED", "webhook", order.id, {
                event,
                razorpayPaymentLinkId: payment?.payment_link_id ?? paymentLink?.id,
                statusChanged: updated.count > 0,
            });
            return NextResponse.json({ ok: true, handled: true, orderId: order.id, status: "CANCELLED", changed: updated.count > 0 });
        }

        return NextResponse.json({ ok: true, handled: false, reason: "event_ignored" });
    } catch (error) {
        console.error("[RAZORPAY_WEBHOOK] Handler error", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
