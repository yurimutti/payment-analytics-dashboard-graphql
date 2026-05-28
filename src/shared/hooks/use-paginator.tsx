import { createContext, useContext, useMemo } from "react";
import type { Pagination } from "@/shared/types/pagination";

export interface PageInfo {
  endCursor: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
}

export interface PaginationState {
  after?: string;
  before?: string;
  first?: number;
  last?: number;
}

export function createPaginationState(
  paginateBy: number,
  queryString: Pagination,
): PaginationState {
  return queryString && (queryString.before || queryString.after)
    ? queryString.after
      ? { after: queryString.after, first: paginateBy }
      : { before: queryString.before, last: paginateBy }
    : { first: paginateBy };
}

interface UsePaginatorArgs<Q> {
  pageInfo: PageInfo | undefined;
  paginationState: PaginationState;
  queryString: Q;
}

function usePaginator<Q extends Pagination>({
  queryString,
  paginationState,
  pageInfo,
}: UsePaginatorArgs<Q>) {
  const newPageInfo = useMemo<PageInfo | undefined>(
    () =>
      pageInfo
        ? {
            ...pageInfo,
            hasNextPage: !!paginationState.before || pageInfo.hasNextPage,
            hasPreviousPage: !!paginationState.after || pageInfo.hasPreviousPage,
          }
        : undefined,
    [paginationState, pageInfo],
  );

  const nextSearch = useMemo(() => {
    if (!newPageInfo?.hasNextPage || !pageInfo?.endCursor) return undefined;
    return { ...queryString, after: pageInfo.endCursor, before: undefined };
  }, [pageInfo?.endCursor, newPageInfo?.hasNextPage, queryString]);

  const prevSearch = useMemo(() => {
    if (!newPageInfo?.hasPreviousPage || !pageInfo?.startCursor) return undefined;
    return { ...queryString, after: undefined, before: pageInfo.startCursor };
  }, [pageInfo?.startCursor, newPageInfo?.hasPreviousPage, queryString]);

  return { nextSearch, prevSearch, paginatorType: "link" as const, ...newPageInfo };
}

export default usePaginator;

type PaginatorContextValuesCommon = Partial<PageInfo>;

export type PaginatorContextValues = PaginatorContextValuesCommon &
  (
    | {
        paginatorType: "link";
        nextSearch?: Record<string, unknown>;
        prevSearch?: Record<string, unknown>;
        loadNextPage?: never;
        loadPreviousPage?: never;
      }
    | {
        paginatorType: "click";
        nextSearch?: never;
        prevSearch?: never;
        loadNextPage: () => void;
        loadPreviousPage: () => void;
      }
  );

export const PaginatorContext = createContext<PaginatorContextValues | null>(null);

export const usePaginatorContext = () => {
  const context = useContext(PaginatorContext);
  if (context === null) {
    throw new Error("usePaginatorContext must be used within a PaginatorContext.Provider");
  }
  return context;
};
