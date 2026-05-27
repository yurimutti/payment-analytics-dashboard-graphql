import { useQuery, getApolloErrorMessage } from "@/shared/lib/apollo";
import { graphql } from "@/shared/lib/graphql";
import type { ResultOf } from "@graphql-typed-document-node/core";

const CHARGE_QUERY = graphql(`
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
      customer { name email phone }
      paymentMethod {
        method
        card { brand last4 expiration }
      }
      metadata { key value }
    }
  }
`);

export type ChargeDetail = NonNullable<ResultOf<typeof CHARGE_QUERY>["charge"]>;

export function usePaymentDetailQuery(id: string) {
  const query = useQuery(CHARGE_QUERY, {
    variables: { id },
    errorPolicy: "all",
    fetchPolicy: "cache-and-network",
  });

  const payment = query.data?.charge ?? null;
  const hasNetworkError = Boolean(query.error?.networkError);
  const notFound = !query.loading && payment === null && !hasNetworkError;

  return {
    payment,
    loading: query.loading,
    error: hasNetworkError ? query.error : null,
    errorMessage: hasNetworkError && query.error ? getApolloErrorMessage(query.error) : null,
    refetch: query.refetch,
    notFound,
  };
}
