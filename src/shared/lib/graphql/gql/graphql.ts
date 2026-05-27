/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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

/**  Standard AppSync filter on a `Boolean` field. Use `eq` for true/false; `ne` is rarely needed. */
export type SearchableBooleanFilterInput = {
  /**  Equal to. */
  eq?: boolean | null | undefined;
  /**  Not equal to. */
  ne?: boolean | null | undefined;
};

/**  Filter for `charges`. Each field is an OpenSearch-style filter; combine fields with `and` / `or` / `not`. */
export type SearchableChargeFilterInput = {
  /**  Filter by amount in the smallest currency unit. `range` = two values. */
  amount?: SearchableIntFilterInput | null | undefined;
  /**  AND combinator. */
  and?: Array<SearchableChargeFilterInput | null | undefined> | null | undefined;
  /**  Filter by acquirer authorization code. */
  authorizationCode?: SearchableStringFilterInput | null | undefined;
  /**  Filter by checkout/operation id. */
  checkoutId?: SearchableIdFilterInput | null | undefined;
  /**  Filter by creation unix timestamp (seconds). `range` = two values. */
  createdAt?: SearchableIntFilterInput | null | undefined;
  /**  Filter by ISO 4217 currency code. */
  currency?: SearchableStringFilterInput | null | undefined;
  /**  Filter by customer email. */
  customerEmail?: SearchableStringFilterInput | null | undefined;
  /**  Filter by customer name. */
  customerName?: SearchableStringFilterInput | null | undefined;
  /**  Filter by customer phone. */
  customerPhone?: SearchableStringFilterInput | null | undefined;
  /**  Filter by description. */
  description?: SearchableStringFilterInput | null | undefined;
  /**  Filter by statement descriptor. */
  descriptor?: SearchableStringFilterInput | null | undefined;
  /**  Filter by fraud detector score (`0`-`1000`). `range` = two values. */
  fraudDetectorScore?: SearchableIntFilterInput | null | undefined;
  /**  Filter by charge id. */
  id?: SearchableIdFilterInput | null | undefined;
  /**  NOT combinator. */
  not?: SearchableChargeFilterInput | null | undefined;
  /**  OR combinator. */
  or?: Array<SearchableChargeFilterInput | null | undefined> | null | undefined;
  /**  Filter by merchant order id. */
  orderId?: SearchableStringFilterInput | null | undefined;
  /**  Filter by card brand. */
  paymentMethodCardBrand?: SearchableStringFilterInput | null | undefined;
  /**  Filter by card fingerprint. Matches online and in-person card payments. */
  paymentMethodCardFingerprint?: SearchableStringFilterInput | null | undefined;
  /**  Filter by card last 4 digits. */
  paymentMethodCardLast4?: SearchableStringFilterInput | null | undefined;
  /**  Filter by whether 3DS authentication ran. */
  paymentMethodCardThreeDSecure?: SearchableBooleanFilterInput | null | undefined;
  /**  Filter by `ThreeDSecureFlow` value. */
  paymentMethodCardThreeDSecureFlow?: SearchableStringFilterInput | null | undefined;
  /**  Filter by 3DS protocol version (e.g. `2.2.0`). */
  paymentMethodCardThreeDSecureVersion?: SearchableStringFilterInput | null | undefined;
  /**  Filter by network token wallet (`googlePay`/`applePay`/`clickToPay`). */
  paymentMethodCardTokenizationMethod?: SearchableStringFilterInput | null | undefined;
  /**  Filter by card funding type (`debit`/`credit`). */
  paymentMethodCardType?: SearchableStringFilterInput | null | undefined;
  /**  Filter by `PaymentMethods` value. */
  paymentMethodMethod?: SearchableStringFilterInput | null | undefined;
  /**  Filter by Point of Sale id. */
  pointOfSaleId?: SearchableStringFilterInput | null | undefined;
  /**  Filter by provider-side transaction id. */
  providerInternalId?: SearchableStringFilterInput | null | undefined;
  /**  Filter by provider-side reference id. */
  providerReferenceId?: SearchableStringFilterInput | null | undefined;
  /**  Filter by cumulative refunded amount. `range` = two values. */
  refundedAmount?: SearchableIntFilterInput | null | undefined;
  /**  Filter by recurring sequence id. */
  sequenceId?: SearchableStringFilterInput | null | undefined;
  /**  Filter by checkout session country (geolocated from IP, ISO 3166-1 alpha-2). */
  sessionCountry?: SearchableStringFilterInput | null | undefined;
  /**  Filter by checkout session device fingerprint. */
  sessionFingerprint?: SearchableStringFilterInput | null | undefined;
  /**  Filter by checkout session IP. */
  sessionIp?: SearchableStringFilterInput | null | undefined;
  /**  Filter by shop country (ISO 3166-1 alpha-2). */
  shopCountry?: SearchableStringFilterInput | null | undefined;
  /**  Filter by shop name. */
  shopName?: SearchableStringFilterInput | null | undefined;
  /**  Filter by `ChargeStatus` value. */
  status?: SearchableStringFilterInput | null | undefined;
  /**  Filter by status code. */
  statusCode?: SearchableStringFilterInput | null | undefined;
  /**  Filter by status message. */
  statusMessage?: SearchableStringFilterInput | null | undefined;
  /**  Filter by store id. */
  storeId?: SearchableStringFilterInput | null | undefined;
  /**  Filter by subscription id. */
  subscriptionId?: SearchableStringFilterInput | null | undefined;
  /**  Filter by integration source recorded on dashboard actions (e.g. `dashboard`, `api`). */
  traceDetailsSource?: SearchableStringFilterInput | null | undefined;
  /**  Filter by last-update unix timestamp (seconds). `range` = two values. */
  updatedAt?: SearchableIntFilterInput | null | undefined;
};

/**
 *  Operator guidance:
 * - `eq` / `ne` — preferred for ID lookups (exact-value).
 * - `match` / `matchPhrase` / `matchPhrasePrefix` — only useful if the ID is tokenized (rare).
 * - `wildcard` / `regexp` — pattern match.
 * - `exists` — field present (`true`) or absent (`false`).
 */
export type SearchableIdFilterInput = {
  /**  Equal to. */
  eq?: string | number | null | undefined;
  /**  Field is present (`true`) or absent (`false`). */
  exists?: boolean | null | undefined;
  /**  Full-text match on tokenized terms. */
  match?: string | number | null | undefined;
  /**  Full-text phrase match. */
  matchPhrase?: string | number | null | undefined;
  /**  Phrase match where the last term is treated as a prefix. */
  matchPhrasePrefix?: string | number | null | undefined;
  /**  Not equal to. */
  ne?: string | number | null | undefined;
  /**  Regular expression pattern. */
  regexp?: string | number | null | undefined;
  /**  Wildcard pattern. */
  wildcard?: string | number | null | undefined;
};

/**
 *  Operator guidance:
 * - `eq` / `ne` — exact-value match. Use for amounts in minor units, sequence numbers, etc.
 * - `gt` / `gte` / `lt` / `lte` — open-ended bounds.
 * - `range: [from, to]` — inclusive `[from, to]` range. **Required pattern for timestamp fields** (`createdAt`, `updatedAt`, `scheduledAt`, etc., all unix-seconds). The dashboard and SDKs always use `range` for date filtering.
 */
export type SearchableIntFilterInput = {
  /**  Equal to. */
  eq?: number | null | undefined;
  /**  Greater than. */
  gt?: number | null | undefined;
  /**  Greater than or equal to. */
  gte?: number | null | undefined;
  /**  Less than. */
  lt?: number | null | undefined;
  /**  Less than or equal to. */
  lte?: number | null | undefined;
  /**  Not equal to. */
  ne?: number | null | undefined;
  /**  Inclusive `[from, to]` range. Provide exactly two values. Required pattern for timestamp filters. */
  range?: Array<number | null | undefined> | null | undefined;
};

/**  Multiple operators on the same input AND together. */
export type SearchableStringFilterInput = {
  /**  Equal to (exact match on the keyword field). */
  eq?: string | null | undefined;
  /**  Field is present (`true`) or absent (`false`). */
  exists?: boolean | null | undefined;
  /**  Full-text match on tokenized terms (any term). */
  match?: string | null | undefined;
  /**  Full-text match requiring all terms in order. */
  matchPhrase?: string | null | undefined;
  /**  Match where the last term is treated as a prefix. */
  matchPhrasePrefix?: string | null | undefined;
  /**  Not equal to. */
  ne?: string | null | undefined;
  /**  Regular expression pattern. */
  regexp?: string | null | undefined;
  /**  Wildcard pattern (`*` and `?`). */
  wildcard?: string | null | undefined;
};

export type AnalyticsKpiQueryVariables = Exact<{
  start?: number | null | undefined;
  end?: number | null | undefined;
  currency?: Currencies | null | undefined;
  interval?: Interval | null | undefined;
}>;


export type AnalyticsKpiQuery = { chargesDateRangeKPI: { currency: Currencies, total: { succeededAmount: number, succeededCount: number, capturedAmount: number, capturedCount: number, canceledAmount: number, canceledCount: number, refundedAmount: number, refundedCount: number, failedAmount: number, failedCount: number }, data: Array<{ timestamp: number, succeededAmount: number, succeededCount: number, capturedAmount: number, capturedCount: number, failedAmount: number, failedCount: number, canceledAmount: number, canceledCount: number, refundedAmount: number, refundedCount: number }> } };

export type RecentChargesQueryVariables = Exact<{ [key: string]: never; }>;


export type RecentChargesQuery = { charges: { total: number, items: Array<{ id: string, amount: number | null, currency: string, status: ChargeStatus, createdAt: number | null, orderId: string | null, customer: { name: string | null, email: string | null } | null, paymentMethod: { method: PaymentMethods | null } | null }> } };

export type ChargeQueryVariables = Exact<{
  id: string | number;
}>;


export type ChargeQuery = { charge: { id: string, amount: number | null, currency: string, status: ChargeStatus, createdAt: number | null, updatedAt: number | null, orderId: string | null, sequenceId: string | null, descriptor: string | null, description: string | null, livemode: boolean | null, statusCode: string | null, statusMessage: string | null, customer: { name: string | null, email: string | null, phone: string | null } | null, paymentMethod: { method: PaymentMethods | null, card: { brand: CardBrand | null, last4: string | null, expiration: number | null } | null } | null, metadata: Array<{ key: string, value: string | null }> | null } | null };

export type ChargesQueryVariables = Exact<{
  search?: string | null | undefined;
  filter?: SearchableChargeFilterInput | null | undefined;
  size?: number | null | undefined;
  from?: number | null | undefined;
}>;


export type ChargesQuery = { charges: { total: number, items: Array<{ id: string, amount: number | null, currency: string, status: ChargeStatus, createdAt: number | null, updatedAt: number | null, orderId: string | null, livemode: boolean | null, customer: { name: string | null, email: string | null, phone: string | null } | null, paymentMethod: { method: PaymentMethods | null, card: { brand: CardBrand | null, last4: string | null, expiration: number | null } | null } | null }> } };


export const AnalyticsKpiDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AnalyticsKpi"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"start"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"end"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"currency"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Currencies"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"interval"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Interval"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chargesDateRangeKPI"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"start"}}},{"kind":"Argument","name":{"kind":"Name","value":"end"},"value":{"kind":"Variable","name":{"kind":"Name","value":"end"}}},{"kind":"Argument","name":{"kind":"Name","value":"currency"},"value":{"kind":"Variable","name":{"kind":"Name","value":"currency"}}},{"kind":"Argument","name":{"kind":"Name","value":"interval"},"value":{"kind":"Variable","name":{"kind":"Name","value":"interval"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"total"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"succeededAmount"}},{"kind":"Field","name":{"kind":"Name","value":"succeededCount"}},{"kind":"Field","name":{"kind":"Name","value":"capturedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"capturedCount"}},{"kind":"Field","name":{"kind":"Name","value":"canceledAmount"}},{"kind":"Field","name":{"kind":"Name","value":"canceledCount"}},{"kind":"Field","name":{"kind":"Name","value":"refundedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"refundedCount"}},{"kind":"Field","name":{"kind":"Name","value":"failedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"failedCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"succeededAmount"}},{"kind":"Field","name":{"kind":"Name","value":"succeededCount"}},{"kind":"Field","name":{"kind":"Name","value":"capturedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"capturedCount"}},{"kind":"Field","name":{"kind":"Name","value":"failedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"failedCount"}},{"kind":"Field","name":{"kind":"Name","value":"canceledAmount"}},{"kind":"Field","name":{"kind":"Name","value":"canceledCount"}},{"kind":"Field","name":{"kind":"Name","value":"refundedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"refundedCount"}}]}}]}}]}}]} as unknown as DocumentNode<AnalyticsKpiQuery, AnalyticsKpiQueryVariables>;
export const RecentChargesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RecentCharges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"charges"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"method"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<RecentChargesQuery, RecentChargesQueryVariables>;
export const ChargeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Charge"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"charge"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"sequenceId"}},{"kind":"Field","name":{"kind":"Name","value":"descriptor"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"livemode"}},{"kind":"Field","name":{"kind":"Name","value":"statusCode"}},{"kind":"Field","name":{"kind":"Name","value":"statusMessage"}},{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"method"}},{"kind":"Field","name":{"kind":"Name","value":"card"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"brand"}},{"kind":"Field","name":{"kind":"Name","value":"last4"}},{"kind":"Field","name":{"kind":"Name","value":"expiration"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<ChargeQuery, ChargeQueryVariables>;
export const ChargesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Charges"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchableChargeFilterInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"size"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"from"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"charges"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"Variable","name":{"kind":"Name","value":"size"}}},{"kind":"Argument","name":{"kind":"Name","value":"from"},"value":{"kind":"Variable","name":{"kind":"Name","value":"from"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"livemode"}},{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"method"}},{"kind":"Field","name":{"kind":"Name","value":"card"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"brand"}},{"kind":"Field","name":{"kind":"Name","value":"last4"}},{"kind":"Field","name":{"kind":"Name","value":"expiration"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<ChargesQuery, ChargesQueryVariables>;