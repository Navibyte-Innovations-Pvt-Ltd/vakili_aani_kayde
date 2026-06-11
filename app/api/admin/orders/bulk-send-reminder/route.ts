import { NextRequest, NextResponse } from "next/server";
import { prisma_db } from "@/lib/prisma";
import { sendPaymentReminder } from "@/lib/whatsapp";
import { logOrderEvent } from "@/lib/order-logger";
import { getOrCreatePaymentLink } from "@/lib/get-or-create-payment-link";

export async function POST(req: NextRequest) {
    try {
        const { orderIds } = await req.json();

        if (!Array.isArray(orderIds) || orderIds.length === 0) {
            return new NextResponse("orderIds must be a non-empty array", { status: 400 });
        }

        // Fetch all orders
        const orders = await prisma_db.order.findMany({
            where: {
                id: { in: orderIds },
                OR: [
                    { status: "PENDING" },
                    { status: "FAILED" }
                ]
            },
            include: {
                items: {
                    include: {
                        ebook: true
                    }
                }
            }
        });

        if (orders.length === 0) {
            return new NextResponse("No pending/failed orders found", { status: 404 });
        }

        // Skip orders where user explicitly dismissed the payment modal
        const fetchedIds = orders.map((o) => o.id);
        const dismissedLogs = await prisma_db.orderLog.findMany({
            where: { orderId: { in: fetchedIds }, event: "MODAL_DISMISSED" },
            select: { orderId: true },
        });
        const dismissedSet = new Set(dismissedLogs.map((r) => r.orderId));

        // Send reminders to each customer
        let successCount = 0;
        let skippedCount = 0;
        const errors: Array<{ orderId: string; error: string }> = [];

        for (const order of orders) {
            if (dismissedSet.has(order.id)) {
                skippedCount++;
                continue;
            }

            try {
                if (!order.customerPhone) {
                    errors.push({
                        orderId: order.id,
                        error: "Customer phone not available"
                    });
                    continue;
                }

                const bookTitle = order.items.map(i => i.ebook.title).join(", ");
                const paymentLink = await getOrCreatePaymentLink(order);

                await sendPaymentReminder(
                    order.customerPhone,
                    order.customerName || "Customer",
                    bookTitle,
                    paymentLink,
                );

                await logOrderEvent("PAYMENT_REMINDER_SENT", "server", order.id, {
                    phone: order.customerPhone,
                    source: "admin-bulk",
                });

                successCount++;
            } catch (error) {
                console.error(`[BULK_REMINDER] Error sending to ${order.id}:`, error);
                errors.push({
                    orderId: order.id,
                    error: error instanceof Error ? error.message : "Unknown error"
                });
            }
        }

        return NextResponse.json({
            success: true,
            successCount,
            skippedCount,
            totalOrders: orders.length,
            errors: errors.length > 0 ? errors : undefined
        });
    } catch (error) {
        console.error("[BULK_REMINDER_API] Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
