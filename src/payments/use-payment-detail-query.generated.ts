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
 *  Card brand.
 * - `visa` - Visa credit or debit card.
 * - `mastercard` - Mastercard credit or debit card.
 * - `diners` - Diners Club credit card.
 * - `unknown` - Card brand could not be determined.
 * - `amex` - American Express credit card.
 * - `jcb` - Japan Credit Bureau card.
 * - `unionpay` - UnionPay card from China.
 * - `discover` - Discover card.
 */
export type CardBrand =
  | 'amex'
  | 'diners'
  | 'discover'
  | 'jcb'
  | 'mastercard'
  | 'unionpay'
  | 'unknown'
  | 'visa';

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

export type ChargeQueryVariables = Exact<{
  id: string | number;
}>;


export type ChargeQuery = { charge: { id: string, amount: number | null, currency: string, status: Types.ChargeStatus, createdAt: number | null, updatedAt: number | null, orderId: string | null, sequenceId: string | null, descriptor: string | null, description: string | null, livemode: boolean | null, statusCode: string | null, statusMessage: string | null, customer: { name: string | null, email: string | null, phone: string | null } | null, paymentMethod: { method: Types.PaymentMethods | null, card: { brand: Types.CardBrand | null, last4: string | null, expiration: number | null } | null } | null, metadata: Array<{ key: string, value: string | null }> | null } | null };


export const ChargeDocument = gql`
    query Charge($id: ID!) {
  charge(id: $id) {
    id
    amount
    currency
    status
    createdAt
    updatedAt
    orderId
    sequenceId
    descriptor
    description
    livemode
    statusCode
    statusMessage
    customer {
      name
      email
      phone
    }
    paymentMethod {
      method
      card {
        brand
        last4
        expiration
      }
    }
    metadata {
      key
      value
    }
  }
}
    `;

/**
 * __useChargeQuery__
 *
 * To run a query within a React component, call `useChargeQuery` and pass it any options that fit your needs.
 * When your component renders, `useChargeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChargeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useChargeQuery(baseOptions: ApolloReactHooks.QueryHookOptions<ChargeQuery, ChargeQueryVariables> & ({ variables: ChargeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ChargeQuery, ChargeQueryVariables>(ChargeDocument, options);
      }
export function useChargeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ChargeQuery, ChargeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ChargeQuery, ChargeQueryVariables>(ChargeDocument, options);
        }
// @ts-ignore
export function useChargeSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<ChargeQuery, ChargeQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<ChargeQuery, ChargeQueryVariables>;
export function useChargeSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<ChargeQuery, ChargeQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<ChargeQuery | undefined, ChargeQueryVariables>;
export function useChargeSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<ChargeQuery, ChargeQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<ChargeQuery, ChargeQueryVariables>(ChargeDocument, options);
        }
export type ChargeQueryHookResult = ReturnType<typeof useChargeQuery>;
export type ChargeLazyQueryHookResult = ReturnType<typeof useChargeLazyQuery>;
export type ChargeSuspenseQueryHookResult = ReturnType<typeof useChargeSuspenseQuery>;
export type ChargeQueryResult = Apollo.QueryResult<ChargeQuery, ChargeQueryVariables>;