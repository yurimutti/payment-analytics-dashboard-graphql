import type { PropsWithChildren } from "react";
import { ApolloProvider } from "@/shared/lib/apollo";
import { RouterProvider, router } from "@/shared/lib/router";
import { ErrorBoundary } from "@/shared/ui/error-boundary";

export function AllProviders({ children }: PropsWithChildren) {
  return (
    <ApolloProvider>
      <ErrorBoundary>
        <RouterProvider router={router} />
        {children}
      </ErrorBoundary>
    </ApolloProvider>
  );
}
