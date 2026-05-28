import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma_db } from "@/lib/prisma";

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = await params;

    const logs = await prisma_db.orderLog.findMany({
        where: { orderId: id },
        orderBy: { createdAt: "asc" },
        take: 50,
    });

    return NextResponse.json(
        logs.map((l) => ({
            id: l.id,
            event: l.event,
            source: l.source,
            metadata: l.metadata,
            createdAt: l.createdAt.toISOString(),
        }))
    );
}
