import type { PropsWithChildren } from "react";
import { ApolloProvider } from "@/shared/lib/apollo";
import { router, RouterProvider } from "@/shared/lib/router";

export function AllProviders({ children }: PropsWithChildren) {
  return (
    <ApolloProvider>
       <RouterProvider router={router} />
      {children}
    </ApolloProvider>
  );
}
