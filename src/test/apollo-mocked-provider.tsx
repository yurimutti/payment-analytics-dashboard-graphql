import { MockedProvider, type MockedResponse } from "@apollo/client/testing";
import type { PropsWithChildren } from "react";
import { analyticsMocks, paymentsMocks } from "./mocks";

const defaultMocks: MockedResponse[] = [...paymentsMocks, ...analyticsMocks];

interface ApolloMockedProviderProps {
  mocks?: readonly MockedResponse[];
}

export function ApolloMockedProvider({
  mocks = [],
  children,
}: PropsWithChildren<ApolloMockedProviderProps>) {
  return (
    <MockedProvider mocks={[...defaultMocks, ...mocks]} addTypename={false}>
      {children}
    </MockedProvider>
  );
}
