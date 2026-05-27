import { gql } from "@/shared/lib/graphql";

/**
 * Analytics KPI query
 *
 * Verify field names against the Apollo Studio Sandbox before replacing mock data:
 * https://studio.apollographql.com/sandbox/explorer
 *
 * Usage (replace useEffect mock in analytics-page.tsx):
 *   const { data, loading, error } = useQuery(ANALYTICS_KPI_QUERY, {
 *     variables: { days: range, currency: "EUR" },
 *     fetchPolicy: "cache-and-network",
 *   });
 *   // data?.chargesDateRangeKpi → AnalyticsData shape
 */
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
