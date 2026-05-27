/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import * as Types from '@/shared/lib/graphql/gql/graphql';

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

export type RecentChargesQueryVariables = Exact<{ [key: string]: never; }>;


export type RecentChargesQuery = { charges: { total: number, items: Array<{ id: string, amount: number | null, currency: string, status: Types.ChargeStatus, createdAt: unknown, orderId: string | null, customer: { name: string | null, email: string | null } | null, paymentMethod: { method: Types.PaymentMethods | null } | null }> } };
