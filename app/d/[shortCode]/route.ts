import { NextRequest, NextResponse } from "next/server";
import { resolveShortLink } from "@/lib/short-link";
import { prisma_db } from "@/lib/prisma";
import { getPresignedUrl } from "@/lib/s3";
import { notFound } from "next/navigation";

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ shortCode: string }> }
) {
    try {
        const params = await context.params;
        const { shortCode } = params;
        const forceDownload = req.nextUrl.searchParams.get("dl") === "1";

        // 1. Check if this is a permanent ebook short code (or fallback: ebook id)
        const ebook = await prisma_db.ebook.findFirst({
            where: { OR: [{ shortCode }, { id: shortCode }] },
            select: { fileUrl: true, title: true },
        });

        if (ebook && ebook.fileUrl && ebook.fileUrl !== "COMBO_COLLECTION") {
            if (forceDownload) {
                // S3 presigned URL with Content-Disposition: attachment forces a
                // download instead of opening the PDF inline in the browser.
                // (CloudFront signed URLs can't carry a response disposition.)
                const asciiName = ebook.title.replace(/[^\w \-]/g, "").trim() || "download";
                const utf8Name = encodeURIComponent(`${ebook.title}.pdf`);
                const disposition = `attachment; filename="${asciiName}.pdf"; filename*=UTF-8''${utf8Name}`;
                const downloadUrl = await getPresignedUrl(ebook.fileUrl, 3600, disposition, "application/pdf");
                return NextResponse.redirect(downloadUrl, { status: 302 });
            }
            // Generate S3 presigned URL (1h expiry) and redirect
            const signedUrl = await getPresignedUrl(ebook.fileUrl, 3600);
            return NextResponse.redirect(signedUrl, { status: 302 });
        }

        // 2. Fall back to legacy ShortLink table
        const longUrl = await resolveShortLink(shortCode);
        if (!longUrl) {
            return notFound();
        }

        return NextResponse.redirect(longUrl, { status: 302 });
    } catch (error) {
        console.error("[SHORT_LINK_REDIRECT]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
