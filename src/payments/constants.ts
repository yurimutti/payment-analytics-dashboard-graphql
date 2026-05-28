import type { ChargeStatus } from "@/shared/lib/graphql/gql/graphql";

export const PAGE_SIZE = 10;
export const SEARCH_DEBOUNCE_MS = 400;
export const DEFAULT_PAGE = 1;

export const PAYMENT = {
  STATUS: {
    ALL: "ALL",
  },
} as const;

export type StatusFilter = ChargeStatus | typeof PAYMENT.STATUS.ALL;
