
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma_db } from "@/lib/prisma";
import { sendOrderWhatsapp } from "@/lib/send-order-whatsapp";

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const { orderIds } = await req.json();

        if (!Array.isArray(orderIds) || orderIds.length === 0) {
            return new NextResponse("orderIds must be a non-empty array", { status: 400 });
        }

        const orders = await prisma_db.order.findMany({
            where: { id: { in: orderIds }, status: "PAID" },
            select: {
                id: true,
                customerPhone: true,
                customerName: true,
                items: {
                    select: {
                        ebook: {
                            select: {
                                id: true,
                                title: true,
                                fileUrl: true,
                                pages: true,
                                isCombo: true,
                                includedEbooks: {
                                    select: {
                                        ebook: {
                                            select: { id: true, title: true, fileUrl: true, pages: true },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (orders.length === 0) {
            return new NextResponse("No PAID orders found in selection", { status: 404 });
        }

        let successCount = 0;
        let skippedCount = 0;
        const errors: Array<{ orderId: string; error: string }> = [];

        for (const order of orders) {
            if (!order.customerPhone) {
                skippedCount++;
                continue;
            }

            try {
                const sent = await sendOrderWhatsapp({
                    id: order.id,
                    customerPhone: order.customerPhone,
                    customerName: order.customerName,
                    items: order.items.map((item) => ({
                        ebook: {
                            id: item.ebook.id,
                            title: item.ebook.title,
                            fileUrl: item.ebook.fileUrl,
                            pages: item.ebook.pages,
                            isCombo: item.ebook.isCombo,
                            includedEbooks: item.ebook.includedEbooks.map((ci) => ci.ebook),
                        },
                    })),
                });

                if (sent) {
                    successCount++;
                } else {
                    skippedCount++;
                }

                await new Promise(resolve => setTimeout(resolve, 500));
            } catch (error) {
                console.error(`[BULK_PDF] Failed for order ${order.id}:`, error);
                errors.push({
                    orderId: order.id,
                    error: error instanceof Error ? error.message : "Unknown error",
                });
            }
        }

        return NextResponse.json({
            success: true,
            successCount,
            skippedCount,
            totalOrders: orders.length,
            errors: errors.length > 0 ? errors : undefined,
        });

    } catch (error) {
        console.error("[BULK_PDF_API] Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
