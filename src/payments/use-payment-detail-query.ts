import { getApolloErrorMessage } from "@/shared/lib/apollo";
import { graphql } from "@/shared/lib/graphql";
import { type ChargeQuery, useChargeQuery } from "./use-payment-detail-query.generated";

export const CHARGE_QUERY = graphql(`
  query Charge($id: ID!) {
    charge(id: $id) {
      ...PaymentFields
      sequenceId
      descriptor
      description
      statusCode
      statusMessage
      metadata { key value }
    }
  }
`);

export type ChargeDetail = NonNullable<ChargeQuery["charge"]>;

export function usePaymentDetailQuery(id: string) {
  const query = useChargeQuery({
    variables: { id },
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
