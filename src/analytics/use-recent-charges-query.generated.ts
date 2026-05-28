/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import * as Types from '@/shared/lib/graphql/gql/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@/shared/lib/apollo';
const defaultOptions = {} as const;
/**
 *  The status of the payment.
 * - `SUCCEEDED` - The payment has been successfully processed and funds have been captured.
 * - `PENDING` - The payment is being processed and awaiting completion.
 * - `PENDING_PROCESSING` - Submitted to the processor, awaiting acknowledgement.
 * - `FAILED` - The payment attempt was unsuccessful.
 * - `CANCELED` - The payment was canceled before completion.
 * - `REFUNDED` - The full payment amount has been refunded.
 * - `PARTIALLY_REFUNDED` - Only a portion of the payment amount has been refunded.
 * - `AUTHORIZED` - The payment has been authorized but funds have not been captured yet.
 * - `EXPIRED` - The payment has expired without being completed.
 * - `PAID_OUT` - Funds settled to the merchant's bank account.
 */
export type ChargeStatus =
  | 'AUTHORIZED'
  | 'CANCELED'
  | 'EXPIRED'
  | 'FAILED'
  | 'PAID_OUT'
  | 'PARTIALLY_REFUNDED'
  | 'PENDING'
  | 'PENDING_PROCESSING'
  | 'REFUNDED'
  | 'SUCCEEDED';

/**
 *  Payment methods supported by MONEI.
 * - `alipay` - Alipay digital wallet.
 * - `card` - Credit/debit card.
 * - `cardPresent` - Card-present (in-person) payment captured at a physical terminal.
 * - `bizum` - Bizum, Spanish mobile payment scheme.
 * - `paypal` - PayPal wallet.
 * - `googlePay` - Google Pay digital wallet.
 * - `applePay` - Apple Pay digital wallet.
 * - `clickToPay` - Click to Pay (card-network-hosted wallet).
 * - `mbway` - MB WAY, Portuguese mobile payment.
 * - `multibanco` - Multibanco, Portuguese voucher-based bank payment.
 * - `iDeal` - iDEAL, Dutch bank-transfer scheme.
 * - `bancontact` - Bancontact, Belgian debit-card scheme.
 * - `sofort` - SOFORT (Klarna), German online bank transfer.
 * - `trustly` - Trustly, European bank transfer.
 * - `sepa` - SEPA Direct Debit.
 * - `klarna` - Klarna buy-now-pay-later.
 * - `giropay` - giropay, German online bank transfer.
 * - `srtp` - SEPA Request-to-Pay.
 * - `eps` - EPS, Austrian online bank transfer.
 * - `blik` - BLIK, Polish mobile payment.
 */
export type PaymentMethods =
  | 'alipay'
  | 'applePay'
  | 'bancontact'
  | 'bizum'
  | 'blik'
  | 'card'
  | 'cardPresent'
  | 'clickToPay'
  | 'eps'
  | 'giropay'
  | 'googlePay'
  | 'iDeal'
  | 'klarna'
  | 'mbway'
  | 'multibanco'
  | 'paypal'
  | 'sepa'
  | 'sofort'
  | 'srtp'
  | 'trustly';

export type RecentChargesQueryVariables = Exact<{
  size?: number | null | undefined;
}>;


export type RecentChargesQuery = { charges: { total: number, items: Array<{ id: string, amount: number | null, currency: string, status: Types.ChargeStatus, createdAt: number | null, orderId: string | null, customer: { name: string | null, email: string | null } | null, paymentMethod: { method: Types.PaymentMethods | null } | null }> } };


export const RecentChargesDocument = gql`
    query RecentCharges($size: Int) {
  charges(size: $size) {
    items {
      id
      amount
      currency
      status
      createdAt
      orderId
      customer {
        name
        email
      }
      paymentMethod {
        method
      }
    }
    total
  }
}
    `;

/**
 * __useRecentChargesQuery__
 *
 * To run a query within a React component, call `useRecentChargesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecentChargesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecentChargesQuery({
 *   variables: {
 *      size: // value for 'size'
 *   },
 * });
 */
export function useRecentChargesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RecentChargesQuery, RecentChargesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<RecentChargesQuery, RecentChargesQueryVariables>(RecentChargesDocument, options);
      }
export function useRecentChargesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RecentChargesQuery, RecentChargesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<RecentChargesQuery, RecentChargesQueryVariables>(RecentChargesDocument, options);
        }
// @ts-ignore
export function useRecentChargesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<RecentChargesQuery, RecentChargesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<RecentChargesQuery, RecentChargesQueryVariables>;
export function useRecentChargesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<RecentChargesQuery, RecentChargesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<RecentChargesQuery | undefined, RecentChargesQueryVariables>;
export function useRecentChargesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<RecentChargesQuery, RecentChargesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<RecentChargesQuery, RecentChargesQueryVariables>(RecentChargesDocument, options);
        }
export type RecentChargesQueryHookResult = ReturnType<typeof useRecentChargesQuery>;
export type RecentChargesLazyQueryHookResult = ReturnType<typeof useRecentChargesLazyQuery>;
export type RecentChargesSuspenseQueryHookResult = ReturnType<typeof useRecentChargesSuspenseQuery>;
export type RecentChargesQueryResult = Apollo.QueryResult<RecentChargesQuery, RecentChargesQueryVariables>;