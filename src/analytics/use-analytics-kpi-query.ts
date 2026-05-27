import { useMemo } from "react";
import { useQuery, getApolloErrorMessage } from "@/shared/lib/apollo";
import { graphql } from "@/shared/lib/graphql";
import { daysAgo } from "@/shared/lib/date";
import type { DateRangeOption } from "./analytics-types";

type ChartInterval = "day" | "week" | "month";
type Currency = "EUR";

const DEFAULT_CURRENCY: Currency = "EUR";

function intervalFor(range: DateRangeOption): ChartInterval {
  if (range >= 365) return "month";
  if (range >= 90)  return "week";
  return "day";
}

const ANALYTICS_KPI_QUERY = graphql(`
  query AnalyticsKpi($start: Int, $end: Int, $currency: Currencies, $interval: Interval) {
    chargesDateRangeKPI(start: $start, end: $end, currency: $currency, interval: $interval) {
      currency
      total {
        succeededAmount
        succeededCount
        capturedAmount
        capturedCount
        directAmount
        directCount
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
        directAmount
        directCount
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

export function useAnalyticsKpiQuery({ range }: { range: DateRangeOption }) {
  const variables = useMemo(() => ({
    start:    Math.floor(daysAgo(range).getTime() / 1000),
    end:      Math.floor(Date.now() / 1000),
    currency: DEFAULT_CURRENCY,
    interval: intervalFor(range),
  }), [range]);

  const query = useQuery(ANALYTICS_KPI_QUERY, {
    variables,
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  const analytics = query.data?.chargesDateRangeKPI ?? null;

  return {
    analytics,
    loading: query.loading,
    error: query.error,
    errorMessage: query.error ? getApolloErrorMessage(query.error) : null,
    refetch: query.refetch,
    hasData: analytics !== null,
  };
}
