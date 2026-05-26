import { useState, useEffect } from "react";
import { AnalyticsSectionCards } from "./analytics-section-cards";
import { AnalyticsChartInteractive } from "./analytics-chart-interactive";
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
    <div className="flex flex-col gap-6 p-6">
      <p className="text-xs text-ink-subtle">
        {rangeStart} — {rangeEnd}
      </p>

      <AnalyticsSectionCards data={analytics} isLoading={isLoading} />

      <AnalyticsChartInteractive
        data={analytics?.data ?? []}
        range={range}
        onRangeChange={setRange}
        isLoading={isLoading}
      />
    </div>
  );
}
