import { gql } from "@/shared/lib/graphql";
import type { Charge } from "./payment-types";

// ─── Queries ──────────────────────────────────────────────────────────────────

export const CHARGES_QUERY = gql`
  query Charges(
    $search: String
    $status: String
    $limit: Int
    $offset: Int
  ) {
    charges(search: $search, status: $status, limit: $limit, offset: $offset) {
      id
      amount
      currency
      status
      createdAt
      updatedAt
      orderId
      livemode
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
          expMonth
          expYear
        }
      }
    }
  }
`;

export const CHARGE_QUERY = gql`
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
          expMonth
          expYear
        }
      }
      metadata {
        key
        value
      }
    }
  }
`;

// ─── Response types ───────────────────────────────────────────────────────────

export type ChargesResponse = { charges: Charge[] };
export type ChargeResponse  = { charge: Charge | null };
