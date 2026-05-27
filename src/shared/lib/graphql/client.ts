import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

// ─── HTTP transport ───────────────────────────────────────────────────────────
// Points to the Vite dev-server proxy (/api/graphql).
// The proxy injects the Authorization header server-side — the API key never
// reaches the browser bundle.

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
});

// ─── Global error handler ──────────────────────────────────────────────────────
// Logs in development. Extend to report to Sentry / another service.

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

export const apolloClient = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
  connectToDevTools: import.meta.env.DEV,
});
