import { useState, useMemo } from "react";
import { useQuery } from "@/shared/lib/apollo";
import { graphql } from "@/shared/lib/graphql";
import { AnalyticsSectionCards } from "./analytics-section-cards";
import { AnalyticsChartInteractive } from "./analytics-chart-interactive";
import { RecentTransactions } from "./recent-transactions";
import { daysAgo } from "@/shared/lib/date";
import type { DateRangeOption } from "./analytics-types";

const ANALYTICS_KPI_QUERY = graphql(`
  query AnalyticsKpi($start: Int, $end: Int, $currency: Currencies, $interval: Interval) {
    chargesDateRangeKPI(start: $start, end: $end, currency: $currency, interval: $interval) {
      currency
      total {
        succeededAmount
        succeededCount
        capturedAmount
        capturedCount
        canceledAmount
        canceledCount
        refundedAmount
        refundedCount
        failedAmount
        failedCount
      }
      data {
        timestamp
        succeededAmount
        succeededCount
        capturedAmount
        capturedCount
        failedAmount
        failedCount
        canceledAmount
        canceledCount
        refundedAmount
        refundedCount
      }
    }
  }
`);

export function AnalyticsPage() {
  const [range, setRange] = useState<DateRangeOption>(30);

  const { start, end } = useMemo(() => ({
    start: Math.floor(daysAgo(range).getTime() / 1000),
    end:   Math.floor(Date.now() / 1000),
  }), [range]);

  const { data, loading, error } = useQuery(ANALYTICS_KPI_QUERY, {
    variables: { start, end, currency: "EUR", interval: "day" },
    fetchPolicy: "cache-and-network",
  });

  const analytics = data?.chargesDateRangeKPI ?? null;

  return (
    <div className="flex-1 space-y-6 px-4 pt-6 pb-10">
      <div className="@container/main space-y-6">
        <AnalyticsSectionCards data={analytics} isLoading={loading} isError={!!error && !data} />

        <AnalyticsChartInteractive
          data={analytics?.data ?? []}
          range={range}
          onRangeChange={setRange}
          isLoading={loading}
        />

        <RecentTransactions isLoading={loading} />
      </div>
    </div>
  );
}
