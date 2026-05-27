import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

// ─── HTTP transport ───────────────────────────────────────────────────────────

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
});

// ─── Auth — API key in Authorization header ────────────────────────────────────
// Key is read from the environment, never hardcoded.

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: import.meta.env.VITE_API_KEY,
  },
}));

// ─── Global error handler ──────────────────────────────────────────────────────
// Logs in development. Extend this to report to Sentry / another service.

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

// ─── Client ───────────────────────────────────────────────────────────────────
// Link chain: errorLink → authLink → httpLink (order matters)

export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  connectToDevTools: import.meta.env.DEV,
});
