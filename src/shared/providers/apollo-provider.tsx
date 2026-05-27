import type { ReactNode } from "react";
import { ApolloProvider as BaseApolloProvider } from "@apollo/client";
import { apolloClient } from "@/shared/lib/graphql/client";

interface ApolloProviderProps {
  children: ReactNode;
}

/**
 * Wraps the app with Apollo Client context.
 * Place near the root, outside the router so all routes share the same client.
 */
export function ApolloProvider({ children }: ApolloProviderProps) {
  return (
    <BaseApolloProvider client={apolloClient}>
      {children}
    </BaseApolloProvider>
  );
}
