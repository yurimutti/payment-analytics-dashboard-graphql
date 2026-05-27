export type ChargeStatus =
  | "SUCCEEDED"
  | "PENDING"
  | "PENDING_PROCESSING"
  | "FAILED"
  | "CANCELED"
  | "REFUNDED"
  | "PARTIALLY_REFUNDED"
  | "AUTHORIZED"
  | "EXPIRED"
  | "PAID_OUT";

export interface PaymentMethod {
  method: string | null;
  card?: {
    brand: string | null;
    last4: string | null;
    expiration: number | null;
  } | null;
}

export interface Customer {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
}

export interface Charge {
  id: string;
  amount: number | null;
  currency: string;
  status: ChargeStatus;
  createdAt: number | null;
  updatedAt: number | null;
  orderId?: string | null;
  sequenceId?: string | null;
  descriptor?: string | null;
  description?: string | null;
  livemode: boolean | null;
  customer?: Customer | null;
  paymentMethod?: PaymentMethod | null;
  statusCode?: string | null;
  statusMessage?: string | null;
  metadata?: Array<{ key: string; value: string | null }> | null;
}
