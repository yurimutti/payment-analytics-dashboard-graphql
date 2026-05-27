import type { MockedResponse } from "@apollo/client/testing";
import type { PropsWithChildren } from "react";
import { ApolloMockedProvider } from "./apollo-mocked-provider";

interface WrapperProps {
  mocks?: readonly MockedResponse[];
}

export function Wrapper({ mocks, children }: PropsWithChildren<WrapperProps>) {
  return <ApolloMockedProvider mocks={mocks}>{children}</ApolloMockedProvider>;
}
