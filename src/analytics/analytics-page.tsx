import { useState, useEffect } from "react";
import { format, subDays } from "date-fns";
import Decimal from "decimal.js";
import type { AnalyticsData, DateRangeOption } from "./analytics-types";
import { getMockAnalytics } from "./analytics-mock";
import { AnalyticsKpiCard } from "./analytics-kpi-card";
import { AnalyticsChart } from "./analytics-chart";
import { AnalyticsDateRange } from "./analytics-date-range";

function deriveKpis(data: AnalyticsData) {
  const { total } = data;
  const successAmount = total.succeededAmount + total.capturedAmount;
  const successCount  = total.succeededCount  + total.capturedCount;
  const totalAttempts = successCount + total.failedCount + total.canceledCount + total.refundedCount;
  const successRate   = totalAttempts > 0 ? Math.round((successCount / totalAttempts) * 100) : 0;
  const avgAmount     = successCount  > 0
    ? new Decimal(successAmount).div(successCount).toDecimalPlaces(2).toNumber()
    : 0;

  return { successAmount, successCount, successRate, avgAmount };
}

function formatEur(cents: number): string {
  return new Intl.NumberFormat("en-EU", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(new Decimal(cents).div(100).toNumber());
}

export function AnalyticsPage() {
  const [range, setRange] = useState<DateRangeOption>(30);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setAnalytics(null);

    // Simulate async API call — replace useEffect body with useQuery when integrating
    const timer = setTimeout(() => {
      setAnalytics(getMockAnalytics(range));
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [range]);

  const kpis = analytics ? deriveKpis(analytics) : null;
  const now = new Date();
  const rangeStart = format(subDays(now, range), "MMM d, yyyy");
  const rangeEnd   = format(now, "MMM d, yyyy");

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs text-ink-subtle">
            {rangeStart} — {rangeEnd}
          </p>
        </div>
        <AnalyticsDateRange value={range} onChange={setRange} />
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <AnalyticsKpiCard
          label="Total Volume"
          value={kpis ? formatEur(kpis.successAmount) : "—"}
          sub={kpis ? `${kpis.successCount.toLocaleString()} payments` : undefined}
          accent="success"
          isLoading={isLoading}
        />
        <AnalyticsKpiCard
          label="Success Rate"
          value={kpis ? `${kpis.successRate}%` : "—"}
          sub="of all attempts"
          isLoading={isLoading}
        />
        <AnalyticsKpiCard
          label="Failed"
          value={analytics ? analytics.total.failedCount.toString() : "—"}
          sub="no charge issued"
          accent="danger"
          isLoading={isLoading}
        />
        <AnalyticsKpiCard
          label="Avg Transaction"
          value={kpis ? formatEur(kpis.avgAmount * 100) : "—"}
          sub="per successful payment"
          isLoading={isLoading}
        />
      </div>

      {/* Secondary stats */}
      <div className="grid grid-cols-3 gap-3">
        <AnalyticsKpiCard
          label="Refunded"
          value={analytics ? analytics.total.refundedCount.toString() : "—"}
          sub={analytics ? formatEur(analytics.total.refundedAmount) : undefined}

          accent="warning"
          isLoading={isLoading}
        />
        <AnalyticsKpiCard
          label="Captured"
          value={analytics ? analytics.total.capturedCount.toString() : "—"}
          sub={analytics ? formatEur(analytics.total.capturedAmount) : undefined}
          isLoading={isLoading}
        />
        <AnalyticsKpiCard
          label="Canceled"
          value={analytics ? analytics.total.canceledCount.toString() : "—"}
          sub={analytics ? formatEur(analytics.total.canceledAmount) : undefined}
          isLoading={isLoading}
        />
      </div>

      {/* Area chart */}
      <AnalyticsChart
        data={analytics?.data ?? []}
        isLoading={isLoading}
      />
    </div>
  );
}
