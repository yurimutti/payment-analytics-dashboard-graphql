import { useQuery, getApolloErrorMessage } from "@/shared/lib/apollo";
import { graphql } from "@/shared/lib/graphql";
import type { ChargeStatus } from "./payment-types";

const CHARGES_QUERY = graphql(`
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

interface UsePaymentsQueryParams {
  search?: string;
  status: ChargeStatus | "ALL";
  size: number;
}

export function usePaymentsQuery({ search, status, size }: UsePaymentsQueryParams) {
  const query = useQuery(CHARGES_QUERY, {
    variables: {
      search: search || undefined,
      filter: status !== "ALL" ? { status: { eq: status } } : undefined,
      size,
      from: 0,
    },
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  const items = query.data?.charges.items ?? [];

  return {
    charges: items,
    total: query.data?.charges.total ?? 0,
    loading: query.loading,
    error: query.error,
    errorMessage: query.error ? getApolloErrorMessage(query.error) : null,
    refetch: query.refetch,
    hasData: items.length > 0,
  };
}
