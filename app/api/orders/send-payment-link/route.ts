import { NextRequest, NextResponse } from "next/server";
import { prisma_db } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/rate-limit";
import { logOrderEvent } from "@/lib/order-logger";
import { sendPaymentReminder } from "@/lib/whatsapp";
import { getOrCreatePaymentLink } from "@/lib/get-or-create-payment-link";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { orderId } = body;

        if (!orderId) {
            return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
        }

        // Fetch order with items for book title
        const order = await prisma_db.order.findUnique({
            where: { id: orderId },
            include: { items: { include: { ebook: true } } },
        });

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        // Only process PENDING orders
        if (order.status !== "PENDING") {
            return NextResponse.json({ error: "Order is not pending" }, { status: 400 });
        }

        if (!order.customerPhone) {
            return NextResponse.json({ error: "No phone number on order" }, { status: 400 });
        }

        // Rate limit: 2 per phone per hour
        const rateLimitCheck = await checkRateLimit(order.customerPhone, "send-payment-link");
        if (!rateLimitCheck.isAllowed) {
            await logOrderEvent("PAYMENT_LINK_RATE_LIMITED", "payment-link", orderId, {
                phone: order.customerPhone,
                retryAfter: rateLimitCheck.retryAfter?.toISOString(),
            });
            return NextResponse.json({ error: "Rate limited" }, { status: 429 });
        }

        const bookTitle = order.items[0]?.ebook?.title || "Ebook";
        const customerName = order.customerName || "Customer";

        const paymentLinkUrl = await getOrCreatePaymentLink(order);

        await logOrderEvent("PAYMENT_LINK_CREATED", "payment-link", orderId, {
            paymentLinkUrl,
            phone: order.customerPhone,
        });

        // Send WhatsApp via existing pending_followup_v2 template
        try {
            await sendPaymentReminder(
                order.customerPhone,
                customerName,
                bookTitle,
                paymentLinkUrl,
            );
            await logOrderEvent("PAYMENT_LINK_WHATSAPP_SENT", "payment-link", orderId, {
                phone: order.customerPhone,
            });
        } catch (e) {
            const errorMsg = e instanceof Error ? e.message : String(e);
            console.error("[PAYMENT_LINK] WhatsApp send failed:", e);
            await logOrderEvent("PAYMENT_LINK_WHATSAPP_FAILED", "payment-link", orderId, {
                phone: order.customerPhone,
                error: errorMsg,
            });
        }

        return NextResponse.json({ success: true, paymentLinkUrl });
    } catch (error) {
        console.error("[SEND_PAYMENT_LINK]", error);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}
