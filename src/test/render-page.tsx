import type { MockedResponse } from "@apollo/client/testing";
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { type RenderOptions, render } from "@testing-library/react";
import { type ReactElement, useMemo } from "react";
import { ApolloMockedProvider } from "./apollo-mocked-provider";

interface RenderPageOptions extends Omit<RenderOptions, "wrapper"> {
  mocks?: readonly MockedResponse[];
}

function PageWrapper({ mocks, ui }: { mocks?: readonly MockedResponse[]; ui: ReactElement }) {
  const router = useMemo(() => {
    const rootRoute = createRootRoute({
      component: () => <ApolloMockedProvider mocks={mocks}>{ui}</ApolloMockedProvider>,
    });
    return createRouter({
      routeTree: rootRoute,
      history: createMemoryHistory({ initialEntries: ["/"] }),
    });
  }, [mocks, ui]);

  return <RouterProvider router={router} />;
}

export function renderPage(ui: ReactElement, { mocks, ...options }: RenderPageOptions = {}) {
  return render(<PageWrapper mocks={mocks} ui={ui} />, options);
}
