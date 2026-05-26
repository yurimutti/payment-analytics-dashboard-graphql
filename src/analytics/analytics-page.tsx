import { useState, useEffect } from "react";
import { AnalyticsSectionCards } from "./analytics-section-cards";
import { AnalyticsChartInteractive } from "./analytics-chart-interactive";
import { RecentTransactions } from "./recent-transactions";
import { getMockAnalytics } from "./analytics-mock";
import { daysAgo } from "@/shared/lib/date";
import type { AnalyticsData, DateRangeOption } from "./analytics-types";

export function AnalyticsPage() {
  const [range, setRange]         = useState<DateRangeOption>(30);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setAnalytics(null);
    // Simulate async API call — replace with useQuery(CHARGES_DATE_RANGE_KPI_QUERY) when integrating
    const timer = setTimeout(() => {
      setAnalytics(getMockAnalytics(range));
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [range]);

  const rangeStart = daysAgo(range).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const rangeEnd = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex-1 space-y-6 px-6 pt-8">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground text-sm">
          {rangeStart} — {rangeEnd}
        </p>
      </div>

      <div className="@container/main space-y-6">
        {/* KPI cards */}
        <AnalyticsSectionCards data={analytics} isLoading={isLoading} />

        {/* Chart */}
        <AnalyticsChartInteractive
          data={analytics?.data ?? []}
          range={range}
          onRangeChange={setRange}
          isLoading={isLoading}
        />

        {/* Recent transactions */}
        <RecentTransactions isLoading={isLoading} />
      </div>
    </div>
  );
}
