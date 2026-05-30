import Razorpay from "razorpay";
import { prisma_db } from "@/lib/prisma";
import { getBaseUrl } from "@/lib/base-url";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

type OrderForPaymentLink = {
    id: string;
    amount: number;
    customerName: string | null;
    customerEmail: string | null;
    customerPhone: string | null;
    razorpayPaymentLinkId: string | null;
    items: { ebook: { title: string } }[];
};

export async function getOrCreatePaymentLink(order: OrderForPaymentLink): Promise<string> {
    const callbackUrl = `${getBaseUrl()}/api/payment/link-callback`;

    if (order.razorpayPaymentLinkId) {
        try {
            const existing = await razorpay.paymentLink.fetch(order.razorpayPaymentLinkId) as {
                id: string;
                status: string;
                short_url: string;
            };
            if (["created", "issued", "partially_paid"].includes(existing.status)) {
                return existing.short_url;
            }
        } catch {
            // fetch failed — fall through to create new
        }
    }

    return createPaymentLink(order, callbackUrl);
}

async function createPaymentLink(order: OrderForPaymentLink, callbackUrl: string): Promise<string> {
    const bookTitle = order.items[0]?.ebook?.title || "Ebook";

    const paymentLink = await razorpay.paymentLink.create({
        amount: Math.round(order.amount * 100),
        currency: "INR",
        description: `Payment for ${bookTitle}`,
        reference_id: order.id,
        customer: {
            name: order.customerName || undefined,
            email: order.customerEmail || undefined,
            contact: order.customerPhone || undefined,
        },
        notify: { sms: false, email: false },
        callback_url: callbackUrl,
        callback_method: "get",
        expire_by: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
        notes: {
            db_order_id: order.id,
            book_title: bookTitle,
        },
    }) as { id: string; short_url: string };

    await prisma_db.order.update({
        where: { id: order.id },
        data: { razorpayPaymentLinkId: paymentLink.id },
    });

    return paymentLink.short_url;
}
