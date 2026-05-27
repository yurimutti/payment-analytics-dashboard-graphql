import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

// ─── HTTP transport ───────────────────────────────────────────────────────────
// Dev:  calls /api/graphql (Vite proxy) → proxy injects Authorization server-side
// Prod: calls VITE_GRAPHQL_ENDPOINT directly → needs a real server-side proxy
//       (Vercel rewrite, Cloudflare Worker, etc.) that injects the API key.

const httpLink = new HttpLink({
  uri: import.meta.env.DEV
    ? "/api/graphql"
    : import.meta.env.VITE_GRAPHQL_ENDPOINT,
});

// ─── Global error handler ──────────────────────────────────────────────────────

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
