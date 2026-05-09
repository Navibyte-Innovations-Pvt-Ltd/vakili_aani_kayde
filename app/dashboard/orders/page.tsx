import { prisma_db } from "@/lib/prisma";
import { OrdersClient } from "./orders-client";
import { StatsCards } from "./stats-cards";
import { RefreshButton } from "./refresh-button";
import { RevenueChart } from "./revenue-chart";
import { getISTDateRange, getNowIST, fromIST } from "@/lib/date-utils";
import { startOfDay, startOfMonth, endOfMonth, subMonths, subDays } from "date-fns";

export const dynamic = 'force-dynamic';

type DateFilter = 'today' | 'week' | 'month' | '2months' | '3months' | 'all';

function getComparisonQuery(filter: DateFilter, nowIST: Date) {
    switch (filter) {
        case 'today': {
            const yStart = subDays(startOfDay(nowIST), 1);
            return { gte: fromIST(yStart), lte: fromIST(startOfDay(nowIST)) };
        }
        case 'week':
            return { gte: fromIST(subDays(nowIST, 14)), lte: fromIST(subDays(nowIST, 7)) };
        case 'month': {
            const prev = subMonths(nowIST, 1);
            return { gte: fromIST(startOfMonth(prev)), lte: fromIST(endOfMonth(prev)) };
        }
        case '2months':
            return { gte: fromIST(subDays(nowIST, 120)), lte: fromIST(subDays(nowIST, 60)) };
        case '3months':
            return { gte: fromIST(subDays(nowIST, 180)), lte: fromIST(subDays(nowIST, 90)) };
        default:
            return undefined;
    }
}

export default async function OrdersPage({ searchParams }: { searchParams?: Promise<{ date?: string }> }) {
    const dateFilter = ((await searchParams)?.date as DateFilter) || 'today';
    const dateQuery = getISTDateRange(dateFilter);
    const nowIST = getNowIST();
    const comparisonQuery = getComparisonQuery(dateFilter, nowIST);

    const [orders, currentStats, previousStats, statusCounts, failedStats] = await Promise.all([
        prisma_db.order.findMany({
            where: { createdAt: dateQuery },
            select: {
                id: true,
                customerName: true,
                customerEmail: true,
                customerPhone: true,
                amount: true,
                status: true,
                failureReason: true,
                razorpayOrderId: true,
                createdAt: true,
                updatedAt: true,
                items: {
                    select: {
                        id: true,
                        price: true,
                        ebook: { select: { id: true, title: true, coverImage: true } }
                    }
                }
            },
            orderBy: { createdAt: "desc" },
            take: dateFilter === 'all' ? 1000 : 200,
        }),
        prisma_db.order.aggregate({
            where: { createdAt: dateQuery, status: "PAID" },
            _sum: { amount: true },
            _count: { id: true },
        }),
        comparisonQuery
            ? prisma_db.order.aggregate({
                where: { createdAt: comparisonQuery, status: "PAID" },
                _sum: { amount: true },
                _count: { id: true },
            })
            : Promise.resolve({ _sum: { amount: null as null }, _count: { id: 0 } }),
        prisma_db.order.groupBy({
            by: ['status'],
            where: { createdAt: dateQuery },
            _count: { id: true },
        }),
        prisma_db.order.aggregate({
            where: { createdAt: dateQuery, status: { in: ["FAILED", "PENDING"] } },
            _sum: { amount: true },
            _count: { id: true },
        }),
    ]);

    const totalRevenue = Number(currentStats._sum.amount || 0);
    const paidOrders = currentStats._count.id || 0;
    const previousRevenue = Number(previousStats._sum.amount || 0);
    const previousOrders = previousStats._count.id || 0;
    const failedRevenue = Number(failedStats._sum?.amount || 0);
    const failedOrders = (failedStats._count as { id?: number })?.id || 0;

    const statusMap: Record<string, number> = {};
    for (const s of statusCounts) statusMap[s.status] = s._count.id;
    const totalAttempted = Object.values(statusMap).reduce((a, b) => a + b, 0);
    const conversionRate = totalAttempted > 0 ? ((statusMap['PAID'] || 0) / totalAttempted) * 100 : 0;

    // Serialize Prisma Decimal/Date to plain JS values for RSC boundary
    const serializedOrders = orders.map(o => ({
        ...o,
        amount: Number(o.amount),
        createdAt: o.createdAt.toISOString(),
        updatedAt: o.updatedAt.toISOString(),
        items: o.items.map(item => ({
            ...item,
            price: Number(item.price),
        })),
    }));

    return (
        <div className="animate-in fade-in mx-auto max-w-7xl space-y-4 duration-500">
            {/* Header */}
            <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-2 md:pb-6">
                <div>
                    <h1 className="text-xl font-bold tracking-tight text-[#0A2342] md:text-3xl">Orders</h1>
                    <p className="mt-1 hidden text-xs text-muted-foreground md:block md:text-sm">
                        Manage and track your recent sales activity.
                    </p>
                </div>
                <RefreshButton />
            </div>

            {/* Stats Cards — synced to selected date filter */}
            <StatsCards
                totalRevenue={totalRevenue}
                paidOrders={paidOrders}
                previousRevenue={previousRevenue}
                previousOrders={previousOrders}
                conversionRate={conversionRate}
                failedRevenue={failedRevenue}
                failedOrders={failedOrders}
                dateFilter={dateFilter}
            />

            {/* Revenue Chart */}
            <RevenueChart orders={serializedOrders} dateFilter={dateFilter} />

            {/* Orders Table */}
            <OrdersClient orders={serializedOrders} loadedAt={new Date().toISOString()} />
        </div>
    );
}
