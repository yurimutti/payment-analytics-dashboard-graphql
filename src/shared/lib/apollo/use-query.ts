import {
  type ApolloError,
  type ApolloQueryResult,
  type QueryHookOptions as BaseQueryHookOptions,
  type OperationVariables,
  type QueryResult,
  type Unmasked,
  useQuery as useBaseQuery,
} from "@apollo/client";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";

interface LoadMore<TData, TVariables extends OperationVariables> {
  loadMore: (
    mergeFunc: (prev: TData, next: TData) => TData,
    extraVariables: Partial<TVariables>,
  ) => Promise<ApolloQueryResult<TData>>;
}

export type UseQueryResult<TData, TVariables extends OperationVariables> = QueryResult<
  TData,
  TVariables
> &
  LoadMore<TData, TVariables>;

export type QueryHookOptions<TData, TVariables extends OperationVariables> = Partial<
  Omit<BaseQueryHookOptions<TData, TVariables>, "variables"> & {
    handleError?: (error: ApolloError) => void;
    variables?: TVariables;
  }
>;

export function useQuery<TData, TVariables extends OperationVariables>(
  document: TypedDocumentNode<TData, TVariables>,
  { skip, variables, fetchPolicy, handleError, ...opts }: QueryHookOptions<TData, TVariables> = {},
): UseQueryResult<TData, TVariables> {
  const queryData = useBaseQuery(document, {
    ...opts,
    errorPolicy: "all",
    fetchPolicy: fetchPolicy ?? "cache-and-network",
    onError: handleError,
    skip,
    variables: variables as TVariables,
  });

  const loadMore = (
    mergeFunc: (previousResults: TData, fetchMoreResult: TData) => TData,
    extraVariables: Partial<TVariables>,
  ) =>
    queryData.fetchMore({
      query: document,
      updateQuery: (previousResults, { fetchMoreResult }) =>
        (fetchMoreResult
          ? mergeFunc(previousResults as TData, fetchMoreResult as TData)
          : previousResults) as Unmasked<TData>,
      variables: { ...variables, ...extraVariables } as TVariables,
    });

  return { ...queryData, loadMore };
}
