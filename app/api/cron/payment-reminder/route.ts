import { NextResponse } from "next/server";
import { prisma_db } from "@/lib/prisma";
import { sendPaymentReminder } from "@/lib/whatsapp";
import { logOrderEvent } from "@/lib/order-logger";
import { getOrCreatePaymentLink } from "@/lib/get-or-create-payment-link";

export const dynamic = "force-dynamic";

/**
 * Automated payment reminder for abandoned checkouts.
 * Runs every 30 min (configured in vercel.json).
 *
 * Targets PENDING orders where:
 * - Created 30min–24h ago (30min buffer avoids interrupting active sessions)
 * - Has a phone number
 * - No reminder was already sent (checked via OrderLog)
 */
export async function GET(req: Request) {
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const now = new Date();
    const thirtyMinAgo = new Date(now.getTime() - 30 * 60 * 1000);
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // Find abandoned PENDING orders with phone numbers
    const pendingOrders = await prisma_db.order.findMany({
        where: {
            status: "PENDING",
            customerPhone: { not: null },
            createdAt: {
                gt: twentyFourHoursAgo,
                lt: thirtyMinAgo,
            },
        },
        include: {
            items: { include: { ebook: { select: { id: true, title: true } } } },
        },
        take: 10,
        orderBy: { createdAt: "asc" },
    });

    if (pendingOrders.length === 0) {
        return NextResponse.json({ processed: 0, message: "No abandoned orders found" });
    }

    // Check which orders already received a reminder OR were explicitly dismissed by user
    const orderIds = pendingOrders.map((o) => o.id);
    const logEntries = await prisma_db.orderLog.findMany({
        where: {
            orderId: { in: orderIds },
            event: { in: ["PAYMENT_REMINDER_SENT", "MODAL_DISMISSED"] },
        },
        select: { orderId: true, event: true },
    });
    const remindedSet = new Set(logEntries.filter((r) => r.event === "PAYMENT_REMINDER_SENT").map((r) => r.orderId));
    const dismissedSet = new Set(logEntries.filter((r) => r.event === "MODAL_DISMISSED").map((r) => r.orderId));

    const results: { orderId: string; success: boolean; error?: string; skipped?: boolean }[] = [];

    for (const order of pendingOrders) {
        // Skip if already reminded or user explicitly dismissed the payment modal
        if (remindedSet.has(order.id) || dismissedSet.has(order.id)) {
            results.push({ orderId: order.id, success: true, skipped: true });
            continue;
        }

        try {
            const bookTitle = order.items.map((i) => i.ebook.title).join(", ");
            const paymentLink = await getOrCreatePaymentLink(order);

            await sendPaymentReminder(
                order.customerPhone as string,
                order.customerName || "Customer",
                bookTitle,
                paymentLink,
            );

            await logOrderEvent("PAYMENT_REMINDER_SENT", "server", order.id, {
                phone: order.customerPhone,
                source: "cron-auto",
            });

            results.push({ orderId: order.id, success: true });
        } catch (e) {
            const errorMsg = e instanceof Error ? e.message : String(e);
            console.error(`[CRON] Payment reminder failed for order ${order.id}:`, e);

            await logOrderEvent("PAYMENT_REMINDER_FAILED", "server", order.id, {
                phone: order.customerPhone,
                error: errorMsg,
                source: "cron-auto",
            }).catch(() => {});

            results.push({ orderId: order.id, success: false, error: errorMsg });
        }
    }

    return NextResponse.json({
        processed: results.length,
        sent: results.filter((r) => r.success && !r.skipped).length,
        skipped: results.filter((r) => r.skipped).length,
        failed: results.filter((r) => !r.success).length,
        results,
    });
}
