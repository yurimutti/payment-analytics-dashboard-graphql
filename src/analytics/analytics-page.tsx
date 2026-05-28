import { useState } from "react";
import { ErrorState } from "@/shared/ui/error-state";
import { InlineWarning } from "@/shared/ui/inline-warning";
import { AnalyticsChartInteractive } from "./analytics-chart-interactive";
import { AnalyticsSectionCards } from "./analytics-section-cards";
import type { DateRangeOption } from "./analytics-types";
import { DEFAULT_RANGE_DAYS } from "./constants";
import { RecentTransactions } from "./recent-transactions";
import { useAnalyticsKpi } from "./use-analytics-kpi-query";

export function AnalyticsPage() {
  const [range, setRange] = useState<DateRangeOption>(DEFAULT_RANGE_DAYS);

  const { analytics, loading, error, errorMessage, refetch, hasData } = useAnalyticsKpi({
    range,
  });

  if (error && !hasData) {
    return (
      <div className="flex-1 px-4 pt-6 pb-10">
        <ErrorState
          title="Could not load analytics"
          description={errorMessage}
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 px-4 pt-6 pb-10">
      {error && hasData && (
        <InlineWarning>
          Some analytics data may be incomplete. Try refreshing the page.
        </InlineWarning>
      )}

      <div className="@container/main space-y-6">
        <AnalyticsSectionCards data={analytics} isLoading={loading} />

        <AnalyticsChartInteractive
          data={analytics?.data ?? []}
          range={range}
          onRangeChange={setRange}
          isLoading={loading}
        />

        <RecentTransactions />
      </div>
    </div>
  );
}
