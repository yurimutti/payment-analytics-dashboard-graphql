import { ApolloProvider as BaseApolloProvider } from "@apollo/client";
import type { PropsWithChildren } from "react";
import { apolloClient } from "./client";

export function ApolloProvider({ children }: PropsWithChildren) {
  return <BaseApolloProvider client={apolloClient}>{children}</BaseApolloProvider>;
}
