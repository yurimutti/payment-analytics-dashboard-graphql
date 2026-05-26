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
  method: string;
  card?: {
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
  };
}

export interface Customer {
  name?: string;
  email?: string;
  phone?: string;
}

export interface Charge {
  id: string;
  amount: number;         // cents
  currency: string;
  status: ChargeStatus;
  createdAt: number;      // Unix timestamp (seconds)
  updatedAt: number;
  orderId?: string;
  sequenceId?: string;
  descriptor?: string;
  description?: string;
  livemode: boolean;
  customer?: Customer;
  paymentMethod?: PaymentMethod;
  statusCode?: string;
  statusMessage?: string;
  metadata?: Array<{ key: string; value: string }>;
}
