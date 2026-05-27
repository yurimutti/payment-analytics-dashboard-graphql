import { useState } from "react";
import { useQuery } from "@/shared/lib/graphql";
import { AnalyticsSectionCards } from "./analytics-section-cards";
import { AnalyticsChartInteractive } from "./analytics-chart-interactive";
import { RecentTransactions } from "./recent-transactions";
import { ANALYTICS_KPI_QUERY } from "./analytics.graphql";
import type { AnalyticsKpiResponse } from "./analytics.graphql";
import type { DateRangeOption } from "./analytics-types";

export function AnalyticsPage() {
  const [range, setRange] = useState<DateRangeOption>(30);

  const { data, loading, error } = useQuery<AnalyticsKpiResponse>(ANALYTICS_KPI_QUERY, {
    variables: { days: range, currency: "EUR" },
    fetchPolicy: "cache-and-network",
  });

  const analytics = data?.chargesDateRangeKpi ?? null;

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
