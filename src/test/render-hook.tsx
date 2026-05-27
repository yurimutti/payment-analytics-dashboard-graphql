import type { MockedResponse } from "@apollo/client/testing";
import { type RenderHookOptions, renderHook } from "@testing-library/react";
import { Wrapper } from "./wrapper";

interface CustomRenderHookOptions<Props> extends Omit<RenderHookOptions<Props>, "wrapper"> {
  mocks?: readonly MockedResponse[];
}

function renderHookWithProviders<TProps, TResult>(
  callback: (props: TProps) => TResult,
  { mocks, ...options }: CustomRenderHookOptions<TProps> = {},
) {
  return renderHook(callback, {
    wrapper: ({ children }) => <Wrapper mocks={mocks}>{children}</Wrapper>,
    ...options,
  });
}

export { act, waitFor } from "@testing-library/react";
export { renderHookWithProviders as renderHook };
