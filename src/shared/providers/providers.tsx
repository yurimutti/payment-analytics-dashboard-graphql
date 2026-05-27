import type { PropsWithChildren } from "react";
import { ApolloProvider } from "@/shared/lib/apollo";
import { RouterProvider, router } from "@/shared/lib/router";

export function AllProviders({ children }: PropsWithChildren) {
  return (
    <ApolloProvider>
      <RouterProvider router={router} />
      {children}
    </ApolloProvider>
  );
}
