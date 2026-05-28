import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { sendAisensyTemplate } from "@/lib/whatsapp";

const TEMPLATES = [
    {
        id: "payment_sccess_pdf_v2",
        label: "Payment Success + PDF",
        description: "Sent after purchase — delivers PDF as document",
        hasMedia: true,
        params: [],
    },
    {
        id: "pending_folloup_mr_v1",
        label: "Pending Payment Follow-up",
        description: "Reminder for unpaid orders",
        hasMedia: false,
        params: ["{{1}} Customer name", "{{2}} Book title", "{{3}} Payment link"],
    },
];

export { TEMPLATES };

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json() as {
        templateId: string;
        phone: string;
        params?: string[];
        mediaUrl?: string;
        mediaFilename?: string;
    };

    const { templateId, phone, params = [], mediaUrl, mediaFilename } = body;

    if (!templateId || !phone) {
        return new NextResponse("Missing templateId or phone", { status: 400 });
    }

    const template = TEMPLATES.find((t) => t.id === templateId);
    if (!template) {
        return new NextResponse("Unknown template", { status: 400 });
    }

    try {
        await sendAisensyTemplate({
            phone,
            campaignName: templateId,
            templateParams: params,
            mediaUrl: mediaUrl || undefined,
            mediaFilename: mediaFilename || "Test.pdf",
            customerName: "Test User",
        });

        return NextResponse.json({ ok: true, message: `Sent ${templateId} to ${phone}` });
    } catch (err) {
        return new NextResponse(
            `Failed: ${err instanceof Error ? err.message : "Unknown error"}`,
            { status: 500 }
        );
    }
}
