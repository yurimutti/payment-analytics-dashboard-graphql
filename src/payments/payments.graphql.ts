import { gql } from "@/shared/lib/graphql";

/**
 * Payments GraphQL queries
 *
 * Verify field names against the Apollo Studio Sandbox before replacing mock data:
 * https://studio.apollographql.com/sandbox/explorer
 */

// ─── Payments list ────────────────────────────────────────────────────────────
// Usage (replace useEffect mock in payments-page.tsx):
//   const { data, loading } = useQuery(CHARGES_QUERY, {
//     variables: { search, status: status !== "ALL" ? status : undefined, limit: PAGE_SIZE },
//     fetchPolicy: "cache-and-network",
//   });
//   // data?.charges → Charge[]

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

// ─── Payment detail ───────────────────────────────────────────────────────────
// Usage (replace useEffect mock in payment-detail-page.tsx):
//   const { data, loading } = useQuery(CHARGE_QUERY, {
//     variables: { id },
//     fetchPolicy: "cache-first",
//   });
//   // data?.charge → Charge (or null if not found)

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
