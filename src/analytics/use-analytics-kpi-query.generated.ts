/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import * as Types from '@/shared/lib/graphql/gql/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@/shared/lib/apollo';
const defaultOptions = {} as const;
/**  Three-letter ISO 4217 currency code (uppercase). Must be a supported currency. */
export type Currencies =
  | 'CHF'
  | 'DKK'
  | 'EUR'
  | 'GBP'
  | 'JOD'
  | 'JPY'
  | 'PLN'
  | 'SEK'
  | 'USD';

/**
 *  Subscription interval. The `minute` and `hour` intervals are only available in test mode.
 * - `minute` - Minutely.
 * - `hour` - Hourly.
 * - `day` - Daily.
 * - `week` - Weekly.
 * - `month` - Monthly.
 * - `quarter` - Quarterly.
 * - `year` - Yearly.
 */
export type Interval =
  | 'day'
  | 'hour'
  | 'minute'
  | 'month'
  | 'quarter'
  | 'week'
  | 'year';

export type AnalyticsKpiQueryVariables = Exact<{
  start?: number | null | undefined;
  end?: number | null | undefined;
  currency?: Types.Currencies | null | undefined;
  interval?: Types.Interval | null | undefined;
}>;


export type AnalyticsKpiQuery = { chargesDateRangeKPI: { currency: Types.Currencies, total: { succeededAmount: number, succeededCount: number, capturedAmount: number, capturedCount: number, directAmount: number, directCount: number, canceledAmount: number, canceledCount: number, refundedAmount: number, refundedCount: number, failedAmount: number, failedCount: number }, data: Array<{ timestamp: number, succeededAmount: number, succeededCount: number, capturedAmount: number, capturedCount: number, directAmount: number, directCount: number, failedAmount: number, failedCount: number, canceledAmount: number, canceledCount: number, refundedAmount: number, refundedCount: number }> } };


export const AnalyticsKpiDocument = gql`
    query AnalyticsKpi($start: Int, $end: Int, $currency: Currencies, $interval: Interval) {
  chargesDateRangeKPI(
    start: $start
    end: $end
    currency: $currency
    interval: $interval
  ) {
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
    `;

/**
 * __useAnalyticsKpiQuery__
 *
 * To run a query within a React component, call `useAnalyticsKpiQuery` and pass it any options that fit your needs.
 * When your component renders, `useAnalyticsKpiQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAnalyticsKpiQuery({
 *   variables: {
 *      start: // value for 'start'
 *      end: // value for 'end'
 *      currency: // value for 'currency'
 *      interval: // value for 'interval'
 *   },
 * });
 */
export function useAnalyticsKpiQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AnalyticsKpiQuery, AnalyticsKpiQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AnalyticsKpiQuery, AnalyticsKpiQueryVariables>(AnalyticsKpiDocument, options);
      }
export function useAnalyticsKpiLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AnalyticsKpiQuery, AnalyticsKpiQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AnalyticsKpiQuery, AnalyticsKpiQueryVariables>(AnalyticsKpiDocument, options);
        }
// @ts-ignore
export function useAnalyticsKpiSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AnalyticsKpiQuery, AnalyticsKpiQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AnalyticsKpiQuery, AnalyticsKpiQueryVariables>;
export function useAnalyticsKpiSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AnalyticsKpiQuery, AnalyticsKpiQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AnalyticsKpiQuery | undefined, AnalyticsKpiQueryVariables>;
export function useAnalyticsKpiSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AnalyticsKpiQuery, AnalyticsKpiQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AnalyticsKpiQuery, AnalyticsKpiQueryVariables>(AnalyticsKpiDocument, options);
        }
export type AnalyticsKpiQueryHookResult = ReturnType<typeof useAnalyticsKpiQuery>;
export type AnalyticsKpiLazyQueryHookResult = ReturnType<typeof useAnalyticsKpiLazyQuery>;
export type AnalyticsKpiSuspenseQueryHookResult = ReturnType<typeof useAnalyticsKpiSuspenseQuery>;
export type AnalyticsKpiQueryResult = Apollo.QueryResult<AnalyticsKpiQuery, AnalyticsKpiQueryVariables>;