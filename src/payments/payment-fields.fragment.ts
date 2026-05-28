import { graphql } from "@/shared/lib/graphql";

export const PAYMENT_FIELDS_FRAGMENT = graphql(`
  fragment PaymentFields on Charge {
    id
    amount
    currency
    status
    createdAt
    updatedAt
    orderId
    livemode
    customer { name email phone }
    paymentMethod {
      method
      card { brand last4 expiration }
    }
  }
`);
