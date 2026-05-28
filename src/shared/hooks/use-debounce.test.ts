import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import useDebounce from "./use-debounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("fires the wrapped fn once after the delay", () => {
    const fn = vi.fn();
    const { result } = renderHook(() => useDebounce<string>(fn, 200));

    act(() => result.current("hello"));
    expect(fn).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(fn).toHaveBeenCalledExactlyOnceWith("hello");
  });

  it("coalesces multiple calls into the last one", () => {
    const fn = vi.fn();
    const { result } = renderHook(() => useDebounce<string>(fn, 200));

    act(() => {
      result.current("a");
      result.current("b");
      result.current("c");
    });

    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(fn).toHaveBeenCalledExactlyOnceWith("c");
  });

  it("uses default delay of 200ms when not provided", () => {
    const fn = vi.fn();
    const { result } = renderHook(() => useDebounce<string>(fn));

    act(() => result.current("x"));
    act(() => {
      vi.advanceTimersByTime(199);
    });
    expect(fn).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(fn).toHaveBeenCalledExactlyOnceWith("x");
  });
});
