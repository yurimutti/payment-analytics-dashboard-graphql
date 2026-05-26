import { Eye, MoreHorizontal } from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Skeleton } from "@/shared/ui/skeleton";
import { formatCurrency } from "@/shared/lib/currency";
import { timeAgo } from "@/shared/lib/date";
import type { Charge } from "@/payments/payment-types";
import { MOCK_CHARGES } from "@/payments/payments-mock";
import { PaymentStatusBadge } from "@/payments/payment-status-badge";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInitials(charge: Charge): string {
  const name = charge.customer?.name;
  if (name) {
    return name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }
  return charge.id.slice(0, 2).toUpperCase();
}

function getDisplayName(charge: Charge): string {
  return charge.customer?.name ?? charge.id;
}

function getEmail(charge: Charge): string {
  return charge.customer?.email ?? charge.orderId ?? "—";
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

// ─── Component ────────────────────────────────────────────────────────────────

interface RecentTransactionsProps {
  isLoading?: boolean;
}

export function RecentTransactions({ isLoading = false }: RecentTransactionsProps) {
  const recent = MOCK_CHARGES.slice(0, 5);

  return (
    <Card className="cursor-pointer">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Latest customer transactions</CardDescription>
        </div>
        <Button variant="outline" size="sm" className="cursor-pointer" asChild>
          <Link to="/payments">
            <Eye className="h-4 w-4 mr-2" />
            View All
          </Link>
        </Button>
      </CardHeader>

      <CardContent className="space-y-3">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => <TransactionSkeleton key={i} />)
          : recent.map((charge) => (
            <div key={charge.id} className="flex p-3 rounded-lg border gap-2">
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="text-xs font-semibold bg-surface-3 text-ink-subtle">
                  {getInitials(charge)}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-1 items-center flex-wrap justify-between gap-2">
                {/* Name + email */}
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{getDisplayName(charge)}</p>
                  <p className="text-xs text-muted-foreground truncate">{getEmail(charge)}</p>
                </div>

                {/* Status + amount + time + menu */}
                <div className="flex items-center gap-3">
                  <PaymentStatusBadge status={charge.status} />

                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {formatCurrency(charge.amount, charge.currency)}
                    </p>
                    <p className="text-xs text-muted-foreground">{timeAgo(charge.createdAt)}</p>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 cursor-pointer">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="cursor-pointer" asChild>
                        <Link to="/payments/$id" params={{ id: charge.id }}>
                          View Details
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          ))}
      </CardContent>
    </Card>
  );
}
