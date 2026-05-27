import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { toast } from "@/shared/ui/toaster";

const httpLink = new HttpLink({
  uri: import.meta.env.DEV
    ? "/api/graphql"
    : import.meta.env.VITE_GRAPHQL_ENDPOINT,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  graphQLErrors?.forEach(({ message, locations, path }) => {
    toast.error(message);
    if (import.meta.env.DEV) {
      console.error("[GraphQL error]", message, { locations, path });
    }
  });
  if (networkError) {
    toast.error("Network error — please check your connection.");
    if (import.meta.env.DEV) {
      console.error("[Network error]", networkError);
    }
  }
});

export const apolloClient = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

if (import.meta.env.DEV) {
  (window as Window & { __APOLLO_CLIENT__?: ApolloClient<object> }).__APOLLO_CLIENT__ = apolloClient;
}
