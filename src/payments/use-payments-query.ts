import type { ResultOf } from "@graphql-typed-document-node/core";
import { getApolloErrorMessage } from "@/shared/lib/apollo";
import { graphql } from "@/shared/lib/graphql";
import { PAYMENT, type StatusFilter } from "./constants";
import { useChargesQuery } from "./use-payments-query.generated";

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
  from: number;
  size: number;
}

export function usePaymentsQuery({ search, status, from, size }: UsePaymentsQueryParams) {
  const query = useChargesQuery({
    variables: {
      search: search || undefined,
      filter: status !== PAYMENT.STATUS.ALL ? { status: { eq: status } } : undefined,
      size,
      from,
    },
    notifyOnNetworkStatusChange: true,
  });

  const current = query.data ?? query.previousData;
  const items = current?.charges.items ?? [];
  const total = current?.charges.total ?? 0;

  return {
    charges: items,
    total,
    loading: query.loading,
    error: query.error,
    errorMessage: query.error ? getApolloErrorMessage(query.error) : null,
    refetch: query.refetch,
    hasData: items.length > 0,
  };
}
