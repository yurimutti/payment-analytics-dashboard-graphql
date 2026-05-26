import { useState, useEffect, useMemo } from "react";
import { MOCK_CHARGES } from "./payments-mock";
import { PaymentRow } from "./payment-row";
import { PaymentFilters, type FilterState } from "./payment-filters";
import { Skeleton } from "@/components/ui/skeleton";
import type { Charge } from "./payment-types";

const PAGE_SIZE = 10;

function applyFilters(charges: Charge[], filters: FilterState): Charge[] {
  return charges.filter((c) => {
    if (filters.status && c.status !== filters.status) return false;

    if (filters.search) {
      const q = filters.search.toLowerCase();
      const fields = [
        c.id,
        c.orderId ?? "",
        c.customer?.name ?? "",
        c.customer?.email ?? "",
        c.sequenceId ?? "",
      ];
      if (!fields.some((f) => f.toLowerCase().includes(q))) return false;
    }

    return true;
  });
}

function LoadingRows() {
  return (
    <>
      {Array.from({ length: PAGE_SIZE }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 border-b border-hairline px-6 py-3">
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-3 w-36" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-3 w-16 hidden sm:block" />
          <Skeleton className="h-5 w-20 rounded-full" />
          <div className="text-right space-y-1.5">
            <Skeleton className="h-3 w-16 ml-auto" />
            <Skeleton className="h-3 w-24 ml-auto" />
          </div>
        </div>
      ))}
    </>
  );
}

function EmptyState({ hasFilters }: { hasFilters: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16">
      <p className="text-sm font-medium text-ink">No payments found</p>
      <p className="text-xs text-ink-subtle">
        {hasFilters
          ? "Try adjusting your filters or clearing the search."
          : "Payments will appear here once transactions are made."}
      </p>
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <p className="text-sm font-medium text-ink">Failed to load payments</p>
      <p className="text-xs text-ink-subtle">Check your connection and try again.</p>
      <button
        onClick={onRetry}
        className="mt-1 rounded-md border border-hairline bg-surface-1 px-3 py-1.5 text-xs text-ink hover:bg-surface-2 transition-colors"
      >
        Retry
      </button>
    </div>
  );
}

export function PaymentsPage() {
  const [filters, setFilters]     = useState<FilterState>({ search: "", status: "" });
  const [page, setPage]           = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError]   = useState(false);

  // Simulate async fetch — replace with useQuery when integrating Apollo
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [filters]);

  // Reset page when filters change
  useEffect(() => { setPage(1); }, [filters]);

  const filtered = useMemo(
    () => applyFilters(MOCK_CHARGES, filters),
    [filters],
  );

  const visible = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < filtered.length;
  const hasFilters = Boolean(filters.search || filters.status);

  function handleRetry() {
    setHasError(false);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  }

  return (
    <div className="flex flex-col">
      <PaymentFilters
        filters={filters}
        onChange={setFilters}
        total={filtered.length}
        shown={isLoading ? 0 : visible.length}
      />

      {/* Table header */}
      <div className="hidden border-b border-hairline px-6 py-2 sm:flex items-center gap-4">
        <p className="flex-1 text-xs font-medium text-ink-tertiary uppercase tracking-wide">Payment</p>
        <p className="text-xs font-medium text-ink-tertiary uppercase tracking-wide w-20">Method</p>
        <p className="text-xs font-medium text-ink-tertiary uppercase tracking-wide w-28">Status</p>
        <p className="text-xs font-medium text-ink-tertiary uppercase tracking-wide w-24 text-right">Amount</p>
        <div className="w-4" />
      </div>

      {/* Content */}
      {isLoading ? (
        <LoadingRows />
      ) : hasError ? (
        <ErrorState onRetry={handleRetry} />
      ) : filtered.length === 0 ? (
        <EmptyState hasFilters={hasFilters} />
      ) : (
        <>
          {visible.map((charge) => (
            <PaymentRow key={charge.id} charge={charge} />
          ))}

          {/* Load more / footer */}
          <div className="flex items-center justify-between border-t border-hairline px-6 py-3">
            <p className="text-xs text-ink-tertiary">
              Showing {visible.length} of {filtered.length}
            </p>
            {hasMore && (
              <button
                onClick={() => setPage((p) => p + 1)}
                className="rounded-md border border-hairline bg-surface-1 px-3 py-1.5 text-xs text-ink hover:bg-surface-2 transition-colors"
              >
                Load more
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
