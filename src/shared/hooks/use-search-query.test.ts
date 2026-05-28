import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import useSearchQuery from "./use-search-query";

function makeEvent(value: string): React.ChangeEvent<HTMLInputElement> {
  return { target: { value } } as React.ChangeEvent<HTMLInputElement>;
}

describe("useSearchQuery", () => {
  it("starts with initial value when provided", () => {
    const { result } = renderHook(() => useSearchQuery(vi.fn(), "seed"));
    expect(result.current[0]).toBe("seed");
  });

  it("change() updates state and calls onFetch with the new value", () => {
    const onFetch = vi.fn();
    const { result } = renderHook(() => useSearchQuery(onFetch));

    act(() => result.current[1](makeEvent("typed")));

    expect(result.current[0]).toBe("typed");
    expect(onFetch).toHaveBeenCalledExactlyOnceWith("typed");
  });

  it("reset() restores the initial value and calls onFetch with it", () => {
    const onFetch = vi.fn();
    const { result } = renderHook(() => useSearchQuery(onFetch, "seed"));

    act(() => result.current[1](makeEvent("dirty")));
    expect(result.current[0]).toBe("dirty");

    act(() => result.current[2]());

    expect(result.current[0]).toBe("seed");
    expect(onFetch).toHaveBeenLastCalledWith("seed");
  });

  it("reset() falls back to empty string when no initial provided", () => {
    const onFetch = vi.fn();
    const { result } = renderHook(() => useSearchQuery(onFetch));

    act(() => result.current[1](makeEvent("x")));
    act(() => result.current[2]());

    expect(result.current[0]).toBe("");
    expect(onFetch).toHaveBeenLastCalledWith("");
  });
});
