import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import usePaginator, { createPaginationState, type PageInfo } from "./use-paginator";

describe("createPaginationState", () => {
  it("defaults to first page when no cursor is present", () => {
    expect(createPaginationState(10, {})).toEqual({ first: 10 });
  });

  it("uses after + first when after cursor is present", () => {
    expect(createPaginationState(10, { after: "20" })).toEqual({ after: "20", first: 10 });
  });

  it("uses before + last when before cursor is present", () => {
    expect(createPaginationState(10, { before: "30" })).toEqual({ before: "30", last: 10 });
  });

  it("prefers after over before when both are passed", () => {
    expect(createPaginationState(10, { after: "20", before: "30" })).toEqual({
      after: "20",
      first: 10,
    });
  });
});

describe("usePaginator", () => {
  const baseInfo: PageInfo = {
    endCursor: "10",
    startCursor: "0",
    hasNextPage: true,
    hasPreviousPage: false,
  };

  it("returns nextSearch object when there is a next page", () => {
    const { result } = renderHook(() =>
      usePaginator({
        pageInfo: baseInfo,
        paginationState: { first: 10 },
        queryString: {},
      }),
    );
    expect(result.current.nextSearch).toEqual({ after: "10", before: undefined });
    expect(result.current.prevSearch).toBeUndefined();
    expect(result.current.paginatorType).toBe("link");
  });

  it("returns prevSearch when navigating backwards from `after` state", () => {
    const { result } = renderHook(() =>
      usePaginator({
        pageInfo: { ...baseInfo, hasPreviousPage: false },
        paginationState: { after: "10", first: 10 },
        queryString: { after: "10" },
      }),
    );
    // even if server pageInfo says no previous page, having `after` in state means we can go back
    expect(result.current.hasPreviousPage).toBe(true);
    expect(result.current.prevSearch).toEqual({ after: undefined, before: "0" });
  });

  it("returns undefined searches when there's no page to go to", () => {
    const { result } = renderHook(() =>
      usePaginator({
        pageInfo: {
          endCursor: null,
          startCursor: null,
          hasNextPage: false,
          hasPreviousPage: false,
        },
        paginationState: { first: 10 },
        queryString: {},
      }),
    );
    expect(result.current.nextSearch).toBeUndefined();
    expect(result.current.prevSearch).toBeUndefined();
  });

  it("preserves other queryString params in nextSearch", () => {
    const { result } = renderHook(() =>
      usePaginator({
        pageInfo: baseInfo,
        paginationState: { first: 10 },
        queryString: { search: "tes", status: "FAILED" } as Record<string, string>,
      }),
    );
    expect(result.current.nextSearch).toEqual({
      search: "tes",
      status: "FAILED",
      after: "10",
      before: undefined,
    });
  });
});
