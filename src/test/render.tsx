import type { MockedResponse } from "@apollo/client/testing";
import { type RenderOptions, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import type { ReactElement } from "react";
import { Wrapper } from "./wrapper";

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  mocks?: readonly MockedResponse[];
}

function customRender(ui: ReactElement, { mocks, ...options }: CustomRenderOptions = {}) {
  return render(ui, {
    wrapper: ({ children }) => <Wrapper mocks={mocks}>{children}</Wrapper>,
    ...options,
  });
}

export * from "@testing-library/react";
export { customRender as render, userEvent };
