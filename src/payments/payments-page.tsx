import { useState, useEffect, useMemo } from "react";
import { Search } from "lucide-react";
import { MOCK_CHARGES } from "./payments-mock";
import { PaymentRow } from "./payment-row";
import { Skeleton } from "@/shared/ui/skeleton";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import type { Charge, ChargeStatus } from "./payment-types";

const PAGE_SIZE = 10;

const ALL_STATUSES: { value: ChargeStatus | "ALL"; label: string }[] = [
  { value: "ALL",                label: "All statuses"   },
  { value: "SUCCEEDED",         label: "Succeeded"       },
  { value: "PENDING",           label: "Pending"         },
  { value: "PENDING_PROCESSING",label: "Processing"      },
  { value: "FAILED",            label: "Failed"          },
  { value: "CANCELED",          label: "Canceled"        },
  { value: "REFUNDED",          label: "Refunded"        },
  { value: "PARTIALLY_REFUNDED",label: "Partial refund"  },
  { value: "AUTHORIZED",        label: "Authorized"      },
  { value: "EXPIRED",           label: "Expired"         },
  { value: "PAID_OUT",          label: "Paid out"        },
];

function applyFilters(charges: Charge[], search: string, status: ChargeStatus | "ALL"): Charge[] {
  return charges.filter((c) => {
    if (status !== "ALL" && c.status !== status) return false;
    if (search) {
      const q = search.toLowerCase();
      const fields = [c.id, c.orderId ?? "", c.customer?.name ?? "", c.customer?.email ?? ""];
      if (!fields.some((f) => f.toLowerCase().includes(q))) return false;
    }
    return true;
  });
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────

function TransactionSkeleton() {
  return (
    <div className="flex p-3 rounded-lg border gap-2">
      <Skeleton className="h-8 w-8 rounded-full shrink-0" />
      <div className="flex flex-1 items-center flex-wrap justify-between gap-2">
        <div className="space-y-1.5">
          <Skeleton className="h-3.5 w-32" />
          <Skeleton className="h-3 w-40" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-20 rounded-full" />
          <div className="text-right space-y-1.5">
            <Skeleton className="h-3.5 w-16 ml-auto" />
            <Skeleton className="h-3 w-20 ml-auto" />
          </div>
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </div>
    </div>
  );
}

// ─── Empty / error states ─────────────────────────────────────────────────────

function EmptyState({ hasFilters }: { hasFilters: boolean }) {
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
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function PaymentsPage() {
  const [search, setSearch]   = useState("");
  const [status, setStatus]   = useState<ChargeStatus | "ALL">("ALL");
  const [page, setPage]       = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate async fetch — replace with useQuery when integrating Apollo
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [search, status]);

  // Reset page on filter change
  useEffect(() => { setPage(1); }, [search, status]);

  const filtered = useMemo(
    () => applyFilters(MOCK_CHARGES, search, status),
    [search, status],
  );

  const visible    = filtered.slice(0, page * PAGE_SIZE);
  const hasMore    = visible.length < filtered.length;
  const hasFilters = search !== "" || status !== "ALL";

  return (
    <div className="flex-1 space-y-6 px-6 pt-8 pb-10">
      {/* Page header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Payments</h1>
        <p className="text-muted-foreground text-sm">Browse and filter all transactions</p>
      </div>

      <Card className="cursor-default">
        {/* Card header — title + filters */}
        <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 pb-4">
          <div>
            <CardTitle>All Transactions</CardTitle>
            <CardDescription>
              {isLoading ? "Loading…" : `${filtered.length} payment${filtered.length !== 1 ? "s" : ""}`}
            </CardDescription>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Search ID, order, customer…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-8 pl-8 w-56 text-xs"
              />
            </div>

            <Select value={status} onValueChange={(v) => setStatus(v as ChargeStatus | "ALL")}>
              <SelectTrigger className="h-8 w-36 text-xs cursor-pointer">
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
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-xs"
                onClick={() => { setSearch(""); setStatus("ALL"); }}
              >
                Clear
              </Button>
            )}
          </div>
        </CardHeader>

        {/* Rows */}
        <CardContent className="space-y-3">
          {isLoading ? (
            Array.from({ length: PAGE_SIZE }).map((_, i) => <TransactionSkeleton key={i} />)
          ) : filtered.length === 0 ? (
            <EmptyState hasFilters={hasFilters} />
          ) : (
            visible.map((charge) => <PaymentRow key={charge.id} charge={charge} />)
          )}
        </CardContent>

        {/* Footer — count + load more */}
        {!isLoading && filtered.length > 0 && (
          <CardFooter className="flex items-center justify-between border-t pt-4">
            <p className="text-xs text-muted-foreground">
              Showing {visible.length} of {filtered.length}
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
