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
  createdFrom?: number;
  createdTo?: number;
}

export function usePaymentsQuery({
  search,
  status,
  from,
  size,
  createdFrom,
  createdTo,
}: UsePaymentsQueryParams) {
  const createdAt =
    createdFrom !== undefined || createdTo !== undefined
      ? {
          ...(createdFrom !== undefined ? { gte: createdFrom } : {}),
          ...(createdTo !== undefined ? { lte: createdTo } : {}),
        }
      : undefined;

  const hasStatus = status !== PAYMENT.STATUS.ALL;
  const filter =
    hasStatus || createdAt
      ? {
          ...(hasStatus ? { status: { eq: status } } : {}),
          ...(createdAt ? { createdAt } : {}),
        }
      : undefined;

  const query = useChargesQuery({
    variables: {
      search: search || undefined,
      filter,
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
