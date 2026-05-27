import { Eye, MoreHorizontal } from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Button, buttonVariants } from "@/shared/ui/button";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Skeleton } from "@/shared/ui/skeleton";
import { ErrorState } from "@/shared/ui/error-state";
import { formatCurrency } from "@/shared/lib/currency";
import { timeAgo } from "@/shared/lib/date";
import { PaymentStatusBadge } from "@/payments/payment-status-badge";
import { RECENT_TRANSACTIONS_SIZE, INITIALS_LENGTH } from "@/payments/constants";
import { TransactionSkeleton } from "./transaction.skeleton";
import { useRecentChargesQuery, type RecentCharge as Charge } from "./use-recent-charges-query";

function getInitials(charge: Charge): string {
  const name = charge.customer?.name;
  if (name) {
    return name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, INITIALS_LENGTH)
      .toUpperCase();
  }
  return charge.id.slice(0, INITIALS_LENGTH).toUpperCase();
}

function getDisplayName(charge: Charge): string {
  return charge.customer?.name ?? charge.id;
}

function getEmail(charge: Charge): string {
  return charge.customer?.email ?? charge.orderId ?? "—";
}
export function RecentTransactions() {
  const { charges, loading, error, errorMessage, refetch, hasData } = useRecentChargesQuery();

  if (loading && !hasData) {
    return (
      <Card className="cursor-pointer">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest customer transactions</CardDescription>
          </div>
          <Skeleton className="h-8 w-20 rounded-md" />
        </CardHeader>
        <CardContent className="space-y-3">
          {Array.from({ length: RECENT_TRANSACTIONS_SIZE }).map((_, i) => <TransactionSkeleton key={i} />)}
        </CardContent>
      </Card>
    );
  }

  if (error && !hasData) {
    return (
      <Card className="cursor-pointer">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest customer transactions</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <ErrorState
            title="Could not load recent transactions"
            description={errorMessage}
            onRetry={() => refetch()}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="cursor-pointer">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Latest customer transactions</CardDescription>
        </div>
        <Link
          to="/payments"
          className={buttonVariants({ variant: "outline", size: "sm" }) + " cursor-pointer"}
        >
          <Eye className="h-4 w-4 mr-2" />
          View All
        </Link>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="space-y-3">
          {charges.map((charge) => (
            <Link
              key={charge.id}
              to="/payments/$id"
              params={{ id: charge.id }}
              className="flex p-3 rounded-lg border gap-2 cursor-pointer hover:bg-accent/50 transition-colors"
            >
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="text-xs font-semibold bg-surface-3 text-ink-subtle">
                  {getInitials(charge)}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-1 items-center flex-wrap justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{getDisplayName(charge)}</p>
                  <p className="text-xs text-muted-foreground truncate">{getEmail(charge)}</p>
                </div>

                <div className="flex items-center gap-3">
                  <PaymentStatusBadge status={charge.status} />

                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {formatCurrency(charge.amount ?? 0, charge.currency)}
                    </p>
                    <p className="text-xs text-muted-foreground">{timeAgo(charge.createdAt ?? 0)}</p>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 cursor-pointer"
                        aria-label="Open payment actions menu"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenuItem className="cursor-pointer" asChild>
                        <Link to="/payments/$id" params={{ id: charge.id }}>
                          View Details
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
