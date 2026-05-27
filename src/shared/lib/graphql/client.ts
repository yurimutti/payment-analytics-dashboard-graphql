import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({
  uri: import.meta.env.DEV
    ? "/api/graphql"
    : import.meta.env.VITE_GRAPHQL_ENDPOINT,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (import.meta.env.DEV) {
    graphQLErrors?.forEach(({ message, locations, path }) =>
      console.error("[GraphQL error]", message, { locations, path })
    );
    if (networkError) {
      console.error("[Network error]", networkError);
    }
  }
});

export const apolloClient = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
  connectToDevTools: import.meta.env.DEV,
});
