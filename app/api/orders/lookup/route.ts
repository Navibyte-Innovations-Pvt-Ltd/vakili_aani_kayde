import { NextRequest, NextResponse } from "next/server";
import { prisma_db } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: NextRequest) {
    try {
        const { query, accessToken } = await req.json();

        if (!query) {
            return new NextResponse("Query is required", { status: 400 });
        }

        const cleanedQuery = query.trim();
        const isPhoneQuery = /^\d{10,15}$/.test(cleanedQuery);

        // Find PAID orders matching email or phone
        const rawOrders = await prisma_db.order.findMany({
            where: {
                status: "PAID",
                OR: [
                    { customerEmail: { equals: cleanedQuery, mode: 'insensitive' } },
                    { customerPhone: { equals: cleanedQuery } },
                ],
            },
            include: {
                items: {
                    include: {
                        ebook: {
                            select: {
                                id: true,
                                title: true,
                                pages: true,
                                isCombo: true,
                                language: true,
                                shortCode: true, // Use permanent short code
                            }
                        }
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        if (rawOrders.length === 0) {
            return NextResponse.json({ orders: [] });
        }

        // Phone lookups require a valid Browser Access Token (device-bound).
        // Token = HMAC-SHA256(AUTH_SECRET, orderId) — generated at purchase time.
        // Email lookups are exempt (used internally, rate-limited separately).
        if (isPhoneQuery) {
            const secret = process.env.AUTH_SECRET;
            if (!secret) {
                console.error("[LOOKUP] AUTH_SECRET not set");
                return new NextResponse("Server misconfiguration", { status: 500 });
            }
            const isValid = accessToken && rawOrders.some((order) => {
                const expected = crypto.createHmac("sha256", secret).update(order.id).digest("hex");
                return expected === accessToken;
            });
            if (!isValid) {
                return new NextResponse("Unauthorized", { status: 401 });
            }
        }

        // Map orders — use permanent ebook short codes (no DB writes, no CloudFront signing)
        const processedOrders = rawOrders.map((order) => {
            const items = order.items.map((item) => {
                const ebook = item.ebook;
                // Use the permanent /d/SHORTCODE URL — resolves to fresh CloudFront URL on click
                // Use shortCode if present; fall back to ebook id (resolved by /d route)
                const code = ebook.shortCode || ebook.id;
                // Return a relative path; client builds absolute URL from window.location.origin
                // so production links never leak the server's dev/fallback host.
                const url = `/d/${code}`;

                return {
                    title: ebook.title,
                    ebookId: ebook.id,
                    pages: ebook.pages,
                    isCombo: ebook.isCombo,
                    language: ebook.language,
                    url,
                };
            });

            return {
                id: order.id,
                date: order.createdAt,
                amount: order.amount,
                items,
            };
        });

        return NextResponse.json({ orders: processedOrders });

    } catch (error) {
        console.error("[ORDER_LOOKUP_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
