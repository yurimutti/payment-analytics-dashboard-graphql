import { Search } from "lucide-react";
import { useState } from "react";
import { useDebouncedValue } from "@/shared/hooks/use-debounced-value";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Skeleton } from "@/shared/ui/skeleton";
import {
  DEFAULT_PAGE,
  PAGE_SIZE,
  PAYMENT,
  SEARCH_DEBOUNCE_MS,
  type StatusFilter,
} from "./constants";
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
  hasFilters: boolean;
  onSearchChange: (v: string) => void;
  onStatusChange: (v: StatusFilter) => void;
  onClear: () => void;
}

function FilterBar({
  search,
  status,
  hasFilters,
  onSearchChange,
  onStatusChange,
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

      {hasFilters && (
        <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={onClear}>
          Clear
        </Button>
      )}
    </div>
  );
}

export function PaymentsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>(PAYMENT.STATUS.ALL);
  const [page, setPage] = useState(DEFAULT_PAGE);

  const debouncedSearch = useDebouncedValue(search, SEARCH_DEBOUNCE_MS);

  const { charges, total, loading, error, errorMessage, refetch, hasData } = usePaymentsQuery({
    search: debouncedSearch,
    status,
    size: PAGE_SIZE * page,
  });

  const hasMore = charges.length < total;
  const hasFilters = debouncedSearch !== "" || status !== PAYMENT.STATUS.ALL;

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(DEFAULT_PAGE);
  }

  function handleStatusChange(value: StatusFilter) {
    setStatus(value);
    setPage(DEFAULT_PAGE);
  }

  function clearFilters() {
    setSearch("");
    setStatus(PAYMENT.STATUS.ALL);
    setPage(DEFAULT_PAGE);
  }

  const description = loading ? (
    <Skeleton className="mt-1 h-4 w-20" />
  ) : (
    `${charges.length} payment${charges.length !== 1 ? "s" : ""}`
  );

  return (
    <div className="flex-1 space-y-6 px-4 pt-6 pb-10">
      {error && hasData && (
        <InlineWarning>Some payment data may be incomplete. Try refreshing the page.</InlineWarning>
      )}

      <Card className="cursor-default">
        <CardHeader className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 space-y-0 pb-4">
          <div>
            <CardTitle>All Transactions</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <FilterBar
            search={search}
            status={status}
            hasFilters={hasFilters}
            onSearchChange={handleSearchChange}
            onStatusChange={handleStatusChange}
            onClear={clearFilters}
          />
        </CardHeader>

        <CardContent className="space-y-3">
          {loading && (
            <div className="space-y-3">
              {Array.from({ length: PAGE_SIZE }).map((_, i) => (
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
          <CardFooter className="flex items-center justify-between border-t pt-4">
            <p className="text-xs text-muted-foreground">
              Showing {charges.length} payment{charges.length !== 1 ? "s" : ""}
            </p>
            {hasMore && (
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer"
                onClick={() => setPage((p) => p + 1)}
              >
                Load more
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
