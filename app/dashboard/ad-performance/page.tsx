import Link from "next/link";
import { format } from "date-fns";
import { getAdPerformance } from "@/lib/data-access";
import { getNowIST } from "@/lib/date-utils";
import { AdPerformanceClient } from "./ad-performance-client";

export const dynamic = "force-dynamic";

const RANGES = [
  { days: 7, label: "7 days" },
  { days: 30, label: "30 days" },
  { days: 90, label: "90 days" },
];

export default async function AdPerformancePage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  const { range } = await searchParams;
  const rangeDays = [7, 30, 90].includes(Number(range)) ? Number(range) : 30;
  const data = await getAdPerformance(rangeDays);
  const todayStr = format(getNowIST(), "yyyy-MM-dd");

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900">Ad Performance</h1>
          <p className="text-sm text-gray-400">Daily spend · blended ROAS · IST</p>
        </div>
        <div className="flex gap-1 rounded-lg border border-gray-200 bg-white p-1">
          {RANGES.map((r) => (
            <Link
              key={r.days}
              href={`/dashboard/ad-performance?range=${r.days}`}
              className={`rounded-md px-3 py-1.5 text-xs font-bold transition-colors ${
                rangeDays === r.days ? "bg-brand-teal text-white" : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              {r.label}
            </Link>
          ))}
        </div>
      </div>

      <AdPerformanceClient data={data} todayStr={todayStr} />
    </div>
  );
}
