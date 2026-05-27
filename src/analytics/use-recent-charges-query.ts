import type { ResultOf } from "@graphql-typed-document-node/core";
import { RECENT_TRANSACTIONS_SIZE } from "@/payments/constants";
import { getApolloErrorMessage, useQuery } from "@/shared/lib/apollo";
import { graphql } from "@/shared/lib/graphql";

const RECENT_CHARGES_QUERY = graphql(`
  query RecentCharges($size: Int) {
    charges(size: $size) {
      items {
        id
        amount
        currency
        status
        createdAt
        orderId
        customer { name email }
        paymentMethod { method }
      }
      total
    }
  }
`);

export type RecentCharge = ResultOf<typeof RECENT_CHARGES_QUERY>["charges"]["items"][number];

export function useRecentChargesQuery() {
  const query = useQuery(RECENT_CHARGES_QUERY, {
    variables: { size: RECENT_TRANSACTIONS_SIZE },
    errorPolicy: "all",
    fetchPolicy: "cache-and-network",
  });

  const items = query.data?.charges.items ?? [];

  return {
    charges: items,
    loading: query.loading,
    error: query.error,
    errorMessage: query.error ? getApolloErrorMessage(query.error) : null,
    refetch: query.refetch,
    hasData: items.length > 0,
  };
}
