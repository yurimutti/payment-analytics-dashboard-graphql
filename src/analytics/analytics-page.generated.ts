/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import * as Types from '@/shared/lib/graphql/gql/graphql';

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


export type AnalyticsKpiQuery = { chargesDateRangeKPI: { currency: Types.Currencies, total: { succeededAmount: unknown, succeededCount: unknown, capturedAmount: unknown, capturedCount: unknown, canceledAmount: unknown, canceledCount: unknown, refundedAmount: unknown, refundedCount: unknown, failedAmount: unknown, failedCount: unknown }, data: Array<{ timestamp: unknown, succeededAmount: unknown, succeededCount: unknown, capturedAmount: unknown, capturedCount: unknown, failedAmount: unknown, failedCount: unknown, canceledAmount: unknown, canceledCount: unknown, refundedAmount: unknown, refundedCount: unknown }> } };
