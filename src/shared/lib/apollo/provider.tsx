import { ApolloProvider as BaseApolloProvider } from "@apollo/client";
import { apolloClient } from "./client";
import type { PropsWithChildren } from "react";

export function ApolloProvider({ children }: PropsWithChildren) {
  return (
    <BaseApolloProvider client={apolloClient}>
      {children}
    </BaseApolloProvider>
  );
}
