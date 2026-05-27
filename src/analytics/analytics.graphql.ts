import { gql } from "@/shared/lib/graphql";
import type { AnalyticsData } from "./analytics-types";

export const ANALYTICS_KPI_QUERY = gql`
  query AnalyticsKpi($days: Int!, $currency: String) {
    chargesDateRangeKpi(days: $days, currency: $currency) {
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
        date
        amount
        count
      }
    }
  }
`;

// ─── Response types ───────────────────────────────────────────────────────────

export type AnalyticsKpiResponse = {
  chargesDateRangeKpi: AnalyticsData;
};
