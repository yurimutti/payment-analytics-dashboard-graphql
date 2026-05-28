import { useNavigate } from "@tanstack/react-router";
import { endOfDay, format as formatDate, parseISO, startOfDay } from "date-fns";
import { Search } from "lucide-react";
import { useMemo } from "react";
import type { DateRange } from "react-day-picker";
import { Route } from "@/routes/payments.index";
import { DEFAULT_PAGE_SIZE } from "@/shared/config";
import {
  createPaginationState,
  type PageInfo,
  PaginatorContext,
  useDebounce,
  usePaginationReset,
  usePaginator,
  useSearchQuery,
} from "@/shared/hooks";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { ErrorState } from "@/shared/ui/error-state";
import { InlineWarning } from "@/shared/ui/inline-warning";
import { Input } from "@/shared/ui/input";
import { Pager } from "@/shared/ui/pager";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Skeleton } from "@/shared/ui/skeleton";
import { PAYMENT, SEARCH_DEBOUNCE_MS, type StatusFilter } from "./constants";
import { DateRangePicker } from "./date-range-picker";
import { PaymentRow } from "./payment-row";
import { PaymentRowSkeleton } from "./payment-row.skeleton";
import { usePaymentsQuery } from "./use-payments-query";

const ALL_STATUSES: { value: StatusFilter; label: string }[] = [
  { value: PAYMENT.STATUS.ALL, label: "All statuses" },
  { value: "SUCCEEDED", label: "Succeeded" },
  { value: "PENDING", label: "Pending" },
  { value: "PENDING_PROCESSING", label: "Processing" },
  { value: "FAILED", label: "Failed" },
  { value: "CANCELED", label: "Canceled" },
  { value: "REFUNDED", label: "Refunded" },
  { value: "PARTIALLY_REFUNDED", label: "Partial refund" },
  { value: "AUTHORIZED", label: "Authorized" },
  { value: "EXPIRED", label: "Expired" },
  { value: "PAID_OUT", label: "Paid out" },
];

function EmptyState({ hasFilters, onClear }: { hasFilters: boolean; onClear: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-12">
      <Avatar className="h-10 w-10">
        <AvatarFallback className="text-sm bg-surface-3 text-ink-subtle">—</AvatarFallback>
      </Avatar>
      <p className="text-sm font-medium">No payments found</p>
      <p className="text-xs text-muted-foreground">
        {hasFilters
          ? "Try adjusting your filters or clearing the search."
          : "Payments will appear here once transactions are made."}
      </p>
      {hasFilters && (
        <Button variant="outline" size="sm" className="mt-2" onClick={onClear}>
          Clear filters
        </Button>
      )}
    </div>
  );
}

interface FilterBarProps {
  search: string;
  status: StatusFilter;
  dateRange: DateRange | undefined;
  hasFilters: boolean;
  onSearchChange: (v: string) => void;
  onStatusChange: (v: StatusFilter) => void;
  onDateRangeChange: (range: DateRange | undefined) => void;
  onDateRangeClear: () => void;
  onClear: () => void;
}

function FilterBar({
  search,
  status,
  dateRange,
  hasFilters,
  onSearchChange,
  onStatusChange,
  onDateRangeChange,
  onDateRangeClear,
  onClear,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Search ID, order, customer…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-8 pl-8 w-full sm:w-56 text-xs"
        />
      </div>

      <Select value={status} onValueChange={(v) => onStatusChange(v as StatusFilter)}>
        <SelectTrigger className="h-8 w-full sm:w-36 text-xs cursor-pointer">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {ALL_STATUSES.map((s) => (
            <SelectItem key={s.value} value={s.value} className="text-xs cursor-pointer">
              {s.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <DateRangePicker value={dateRange} onChange={onDateRangeChange} onClear={onDateRangeClear} />

      {hasFilters && (
        <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={onClear}>
          Clear
        </Button>
      )}
    </div>
  );
}

export function PaymentsPage() {
  const queryString = Route.useSearch();
  const navigate = useNavigate();

  const urlSearch = queryString.search ?? "";
  const urlStatus = queryString.status ?? PAYMENT.STATUS.ALL;
  const urlCreatedFrom = queryString.createdFrom;
  const urlCreatedTo = queryString.createdTo;

  const dateRange = useMemo<DateRange | undefined>(() => {
    if (!urlCreatedFrom && !urlCreatedTo) return undefined;
    return {
      from: urlCreatedFrom ? parseISO(urlCreatedFrom) : undefined,
      to: urlCreatedTo ? parseISO(urlCreatedTo) : undefined,
    };
  }, [urlCreatedFrom, urlCreatedTo]);

  const createdFromUnix = urlCreatedFrom
    ? Math.floor(startOfDay(parseISO(urlCreatedFrom)).getTime() / 1000)
    : undefined;
  const createdToUnix = urlCreatedTo
    ? Math.floor(endOfDay(parseISO(urlCreatedTo)).getTime() / 1000)
    : undefined;

  const paginationState = createPaginationState(DEFAULT_PAGE_SIZE, queryString);

  const from = paginationState.after
    ? Number.parseInt(paginationState.after, 10)
    : paginationState.before
      ? Math.max(0, Number.parseInt(paginationState.before, 10) - (paginationState.last ?? 0))
      : 0;
  const size = paginationState.first ?? paginationState.last ?? DEFAULT_PAGE_SIZE;
  const currentPage = Math.floor(from / size) + 1;

  const writeSearch = useDebounce<string>((value: string) => {
    navigate({
      to: "/payments",
      search: (s) => ({
        ...s,
        search: value || undefined,
        after: undefined,
        before: undefined,
      }),
      replace: true,
    });
  }, SEARCH_DEBOUNCE_MS);

  const [searchInput, change, resetSearch] = useSearchQuery(writeSearch, urlSearch);

  function writeStatus(value: StatusFilter) {
    navigate({
      to: "/payments",
      search: (s) => ({
        ...s,
        status: value !== PAYMENT.STATUS.ALL ? value : undefined,
        after: undefined,
        before: undefined,
      }),
      replace: true,
    });
  }

  function writeDateRange(range: DateRange | undefined) {
    navigate({
      to: "/payments",
      search: (s) => ({
        ...s,
        createdFrom: range?.from ? formatDate(range.from, "yyyy-MM-dd") : undefined,
        createdTo: range?.to ? formatDate(range.to, "yyyy-MM-dd") : undefined,
        after: undefined,
        before: undefined,
      }),
      replace: true,
    });
  }

  function clearDateRange() {
    navigate({
      to: "/payments",
      search: (s) => ({
        ...s,
        createdFrom: undefined,
        createdTo: undefined,
        after: undefined,
        before: undefined,
      }),
      replace: true,
    });
  }

  function clearFilters() {
    resetSearch();
    navigate({
      to: "/payments",
      search: () => ({}),
      replace: true,
    });
  }

  const { charges, total, loading, error, errorMessage, refetch, hasData } = usePaymentsQuery({
    search: urlSearch || undefined,
    status: urlStatus,
    from,
    size,
    createdFrom: createdFromUnix,
    createdTo: createdToUnix,
  });

  const pageInfo: PageInfo = {
    endCursor: String(from + charges.length),
    startCursor: String(from),
    hasNextPage: from + charges.length < total,
    hasPreviousPage: from > 0,
  };

  const paginator = usePaginator({
    pageInfo,
    paginationState,
    queryString: {
      after: queryString.after,
      before: queryString.before,
    },
  });

  usePaginationReset({
    resetKeys: [urlSearch, urlStatus, urlCreatedFrom, urlCreatedTo, size],
    onReset: () => {
      navigate({
        to: "/payments",
        search: (s) => ({ ...s, after: undefined, before: undefined }),
        replace: true,
      });
    },
  });

  const hasFilters =
    urlSearch !== "" ||
    urlStatus !== PAYMENT.STATUS.ALL ||
    urlCreatedFrom !== undefined ||
    urlCreatedTo !== undefined;

  const description = loading ? (
    <Skeleton className="mt-1 h-4 w-20" />
  ) : (
    `${total} payment${total !== 1 ? "s" : ""}`
  );

  return (
    <PaginatorContext.Provider value={paginator}>
      <div className="flex-1 space-y-6 px-4 pt-6 pb-10">
        {error && hasData && (
          <InlineWarning>
            Some payment data may be incomplete. Try refreshing the page.
          </InlineWarning>
        )}

        <Card className="cursor-default">
          <CardHeader className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 space-y-0 pb-4">
            <div>
              <CardTitle>All Transactions</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
            <FilterBar
              search={searchInput}
              status={urlStatus}
              dateRange={dateRange}
              hasFilters={hasFilters}
              onDateRangeChange={writeDateRange}
              onDateRangeClear={clearDateRange}
              onSearchChange={(v) =>
                change({ target: { value: v } } as React.ChangeEvent<HTMLInputElement>)
              }
              onStatusChange={writeStatus}
              onClear={clearFilters}
            />
          </CardHeader>

          <CardContent className="space-y-3">
            {loading && (
              <div className="space-y-3">
                {Array.from({ length: size }).map((_, i) => (
                  <PaymentRowSkeleton key={i} />
                ))}
              </div>
            )}

            {!loading && error && !hasData && (
              <ErrorState
                title="Could not load payments"
                description={errorMessage}
                onRetry={() => refetch()}
              />
            )}

            {!loading && !error && !hasData && (
              <EmptyState hasFilters={hasFilters} onClear={clearFilters} />
            )}

            {!loading && hasData && (
              <div className="space-y-3">
                {charges.map((charge) => (
                  <PaymentRow key={charge.id} charge={charge} />
                ))}
              </div>
            )}
          </CardContent>

          {!loading && hasData && (
            <CardFooter className="border-t pt-4">
              <Pager to="/payments" total={total} pageSize={size} currentPage={currentPage} />
            </CardFooter>
          )}
        </Card>
      </div>
    </PaginatorContext.Provider>
  );
}
