import type { ResultOf } from "@graphql-typed-document-node/core";
import { getApolloErrorMessage, useQuery } from "@/shared/lib/apollo";
import { graphql } from "@/shared/lib/graphql";
import { PAYMENT, type StatusFilter } from "./constants";

export const CHARGES_QUERY = graphql(`
  query Charges(
    $search: String
    $filter: SearchableChargeFilterInput
    $size: Int
    $from: Int
  ) {
    charges(search: $search, filter: $filter, size: $size, from: $from) {
      items {
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
      total
    }
  }
`);

export type Charge = ResultOf<typeof CHARGES_QUERY>["charges"]["items"][number];

interface UsePaymentsQueryParams {
  search?: string;
  status: StatusFilter;
  size: number;
}

export function usePaymentsQuery({ search, status, size }: UsePaymentsQueryParams) {
  const query = useQuery(CHARGES_QUERY, {
    variables: {
      search: search || undefined,
      filter: status !== PAYMENT.STATUS.ALL ? { status: { eq: status } } : undefined,
      size,
      from: 0,
    },
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  const current = query.data ?? query.previousData;
  const items = current?.charges.items ?? [];

  return {
    charges: items,
    total: current?.charges.total ?? 0,
    loading: query.loading,
    error: query.error,
    errorMessage: query.error ? getApolloErrorMessage(query.error) : null,
    refetch: query.refetch,
    hasData: items.length > 0,
  };
}
