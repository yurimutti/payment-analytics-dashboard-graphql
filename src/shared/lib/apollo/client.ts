import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({
  uri: import.meta.env.DEV ? "/api/graphql" : import.meta.env.VITE_GRAPHQL_ENDPOINT,
});

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (!import.meta.env.DEV) return;
  if (graphQLErrors?.length) {
    console.error(`[GraphQL ${operation.operationName}]`, graphQLErrors);
  }
  if (networkError) {
    console.error(`[Network ${operation.operationName}]`, networkError);
  }
});

export const apolloClient = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

if (import.meta.env.DEV) {
  (window as Window & { __APOLLO_CLIENT__?: ApolloClient<object> }).__APOLLO_CLIENT__ =
    apolloClient;
}
