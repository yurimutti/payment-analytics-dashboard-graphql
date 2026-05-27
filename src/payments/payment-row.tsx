import { MoreHorizontal } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { formatCurrency } from "@/shared/lib/currency";
import { timeAgo } from "@/shared/lib/date";
import type { Charge } from "./payment-types";
import { PaymentStatusBadge } from "./payment-status-badge";
import { INITIALS_LENGTH } from "./constants";

function getInitials(charge: Charge): string {
  const name = charge.customer?.name;
  if (name) {
    return name.split(" ").map((w) => w[0]).join("").slice(0, INITIALS_LENGTH).toUpperCase();
  }
  return charge.id.slice(0, INITIALS_LENGTH).toUpperCase();
}

function getDisplayName(charge: Charge): string {
  return charge.customer?.name ?? charge.id;
}

function getEmail(charge: Charge): string {
  return charge.customer?.email ?? charge.orderId ?? "—";
}

interface PaymentRowProps {
  charge: Charge;
}

export function PaymentRow({ charge }: PaymentRowProps) {
  return (
    <div className="flex p-3 rounded-lg border gap-2 hover:bg-muted/30 transition-colors">
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback className="text-xs font-semibold bg-surface-3 text-ink-subtle">
          {getInitials(charge)}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-1 items-center flex-wrap justify-between gap-2">
        <Link
          to="/payments/$id"
          params={{ id: charge.id }}
          className="min-w-0 flex-1"
        >
          <p className="text-sm font-medium truncate">{getDisplayName(charge)}</p>
          <p className="text-xs text-muted-foreground truncate">{getEmail(charge)}</p>
        </Link>

        <div className="flex items-center gap-3 shrink-0">
          {charge.paymentMethod?.method && (
            <span className="hidden sm:block text-xs text-muted-foreground capitalize">
              {charge.paymentMethod.method.toLowerCase()}
            </span>
          )}

          <PaymentStatusBadge status={charge.status} />

          <div className="text-right">
            <p className="text-sm font-medium tabular-nums">
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
              >
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
  );
}
