import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useQuery } from "@/shared/lib/apollo";
import { graphql } from "@/shared/lib/graphql";

const CHARGES_QUERY = graphql(`
  query Charges(
    $search: String
    $filter: SearchableChargeFilterInput
    $size: Int
    $from: Int
  ) {
    charges(search: $search, filter: $filter, size: $size, from: $from) {
      items {
        id
        amount
        currency
        status
        createdAt
        updatedAt
        orderId
        livemode
        customer { name email phone }
        paymentMethod {
          method
          card { brand last4 expiration }
        }
      }
      total
    }
  }
`);
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
import type { ChargeStatus } from "./payment-types";

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

function PaymentRowSkeleton() {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4 gap-4">
      <div className="flex items-center gap-3">
        <Skeleton className="h-9 w-9 rounded-full shrink-0" />
        <div className="space-y-1.5">
          <Skeleton className="h-3.5 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Skeleton className="h-5 w-20 rounded-md" />
        <Skeleton className="h-3.5 w-16" />
        <Skeleton className="h-3.5 w-20" />
      </div>
    </div>
  );
}

function EmptyState({
  hasFilters,
  onClear,
}: {
  hasFilters: boolean;
  onClear: () => void;
}) {
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

function ErrorState() {
  return (
    <div className="flex items-center justify-center py-12">
      <p className="text-sm text-muted-foreground">—</p>
    </div>
  );
}
interface FilterBarProps {
  search: string;
  status: ChargeStatus | "ALL";
  hasFilters: boolean;
  onSearchChange: (v: string) => void;
  onStatusChange: (v: ChargeStatus | "ALL") => void;
  onClear: () => void;
}

function FilterBar({ search, status, hasFilters, onSearchChange, onStatusChange, onClear }: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Search ID, order, customer…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-8 pl-8 w-56 text-xs"
        />
      </div>

      <Select value={status} onValueChange={(v) => onStatusChange(v as ChargeStatus | "ALL")}>
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
          onClick={onClear}
        >
          Clear
        </Button>
      )}
    </div>
  );
}

export function PaymentsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ChargeStatus | "ALL">("ALL");
  const [page, setPage]     = useState(1);

  const [debouncedSearch, setDebouncedSearch] = useState(search);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => { setPage(1); }, [debouncedSearch, status]);

  const { data, loading, error } = useQuery(CHARGES_QUERY, {
    variables: {
      search: debouncedSearch || undefined,
      filter: status !== "ALL" ? { status: { eq: status } } : undefined,
      size: PAGE_SIZE * page,
      from: 0,
    },
    fetchPolicy: "cache-and-network",
  });

  const charges    = data?.charges.items ?? [];
  const total      = data?.charges.total  ?? 0;
  const hasMore    = charges.length < total;
  const hasFilters = debouncedSearch !== "" || status !== "ALL";

  function clearFilters() {
    setSearch("");
    setStatus("ALL");
  }

  if (loading && !data) {
    return (
      <div className="flex-1 space-y-6 px-4 pt-6 pb-10">
        <Card className="cursor-default">
          <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 pb-4">
            <div>
              <CardTitle>All Transactions</CardTitle>
              <CardDescription>
                <Skeleton className="mt-1 h-4 w-20" />
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {Array.from({ length: PAGE_SIZE }).map((_, i) => <PaymentRowSkeleton key={i} />)}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="flex-1 space-y-6 px-4 pt-6 pb-10">
        <Card className="cursor-default">
          <CardHeader className="pb-4">
            <CardTitle>All Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <ErrorState />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (charges.length === 0) {
    return (
      <div className="flex-1 space-y-6 px-4 pt-6 pb-10">
        <Card className="cursor-default">
          <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 pb-4">
            <div>
              <CardTitle>All Transactions</CardTitle>
              <CardDescription>0 payments</CardDescription>
            </div>
            <FilterBar
              search={search}
              status={status}
              hasFilters={hasFilters}
              onSearchChange={setSearch}
              onStatusChange={setStatus}
              onClear={clearFilters}
            />
          </CardHeader>
          <CardContent>
            <EmptyState hasFilters={hasFilters} onClear={clearFilters} />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 px-4 pt-6 pb-10">
      <Card className="cursor-default">
        <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 pb-4">
          <div>
            <CardTitle>All Transactions</CardTitle>
            <CardDescription>
              {`${charges.length} payment${charges.length !== 1 ? "s" : ""}`}
            </CardDescription>
          </div>
          <FilterBar
            search={search}
            status={status}
            hasFilters={hasFilters}
            onSearchChange={setSearch}
            onStatusChange={setStatus}
            onClear={clearFilters}
          />
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="space-y-3">
            {charges.map((charge) => <PaymentRow key={charge.id} charge={charge} />)}
          </div>
        </CardContent>

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
      </Card>
    </div>
  );
}
