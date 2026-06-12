import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma_db } from "@/lib/prisma";
import { sendOrderWhatsapp } from "@/lib/send-order-whatsapp";

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = await params;
    const body = await req.json().catch(() => ({})) as { testPhone?: string };
    const testPhone: string | undefined = body.testPhone?.trim() || undefined;

    const order = await prisma_db.order.findUnique({
        where: { id },
        select: {
            id: true,
            status: true,
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

    if (!order) return new NextResponse("Order not found", { status: 404 });
    if (order.status !== "PAID") return new NextResponse("Order not paid", { status: 400 });
    if (!testPhone && !order.customerPhone) return new NextResponse("No phone number", { status: 400 });

    const orderForWhatsapp = {
        id: order.id,
        customerPhone: testPhone ?? order.customerPhone,
        customerName: testPhone ? "Test" : order.customerName,
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
    };

    await sendOrderWhatsapp(orderForWhatsapp);
    return NextResponse.json({ ok: true });
}
