import type { ReactNode } from "react";
import { ApolloProvider as BaseApolloProvider } from "@apollo/client";
import { apolloClient } from "@/shared/lib/graphql/client";

interface ApolloProviderProps {
  children: ReactNode;
}
export function ApolloProvider({ children }: ApolloProviderProps) {
  return (
    <BaseApolloProvider client={apolloClient}>
      {children}
    </BaseApolloProvider>
  );
}
