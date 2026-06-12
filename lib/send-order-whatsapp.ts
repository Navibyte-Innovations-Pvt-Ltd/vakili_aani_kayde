import { sendAisensyTemplate } from "@/lib/whatsapp";
import { getPresignedUrl } from "@/lib/s3";

type OrderForWhatsapp = {
    id: string;
    customerPhone: string | null;
    customerName: string | null;
    items: {
        ebook: {
            id: string;
            title: string;
            fileUrl: string | null;
            pages: number | null;
            isCombo: boolean;
            includedEbooks: { id: string; title: string; fileUrl: string | null; pages: number | null }[];
        };
    }[];
};

/**
 * Sends PDF directly to customer via AiSensy after successful purchase.
 * Template: payment_sccess_pdf_v2 (APPROVED) — document header, fixed body.
 */
export async function sendOrderWhatsapp(order: OrderForWhatsapp): Promise<boolean> {
    if (!order.customerPhone) return false;

    const ebook = order.items[0]?.ebook;
    if (!ebook?.fileUrl || ebook.fileUrl === "COMBO_COLLECTION") {
        console.warn("[WHATSAPP] No fileUrl for order", order.id);
        return false;
    }

    const pdfUrl = await getPresignedUrl(ebook.fileUrl, 86400);

    await sendAisensyTemplate({
        phone: order.customerPhone,
        campaignName: "payment_sccess_pdf_v2",
        templateParams: [],
        mediaUrl: pdfUrl,
        mediaFilename: `${ebook.title}.pdf`,
        customerName: order.customerName || "Customer",
    });

    return true;
}
