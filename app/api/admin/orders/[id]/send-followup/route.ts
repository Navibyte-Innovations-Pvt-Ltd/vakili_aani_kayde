import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma_db } from "@/lib/prisma";
import { sendPaymentReminder } from "@/lib/whatsapp";
import { logOrderEvent } from "@/lib/order-logger";

export async function POST(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = await params;

    const order = await prisma_db.order.findUnique({
        where: { id },
        include: { items: { include: { ebook: { select: { id: true, title: true } } } } },
    });

    if (!order) return new NextResponse("Order not found", { status: 404 });
    if (order.status === "PAID") return new NextResponse("Order already paid", { status: 400 });
    if (!order.customerPhone) return new NextResponse("No phone number", { status: 400 });

    const bookTitle = order.items.map((i) => i.ebook.title).join(", ");
    const firstEbookId = order.items[0]?.ebookId;
    const resumeLink = firstEbookId
        ? `https://www.vakilianikayde.in/ebooks/${firstEbookId}`
        : "https://www.vakilianikayde.in/ebooks";

    await sendPaymentReminder(
        order.customerPhone,
        order.customerName || "Customer",
        bookTitle,
        resumeLink,
    );

    await logOrderEvent("PAYMENT_REMINDER_SENT", "server", order.id, {
        phone: order.customerPhone,
        source: "admin-manual",
    });

    return NextResponse.json({ ok: true });
}
