import type { Charge } from "./payment-types";
import { PaymentStatusBadge } from "./payment-status-badge";
import { formatCurrency } from "@/shared/lib/currency";
import { formatUnixDate } from "@/shared/lib/date";
import { ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface PaymentRowProps {
  charge: Charge;
}

export function PaymentRow({ charge }: PaymentRowProps) {
  return (
    <Link
      to="/payments/$id"
      params={{ id: charge.id }}
      className="flex items-center gap-4 border-b border-hairline px-6 py-3 transition-colors hover:bg-surface-1"
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-ink truncate">{charge.id}</p>
        {charge.orderId && (
          <p className="text-xs text-ink-tertiary truncate">{charge.orderId}</p>
        )}
      </div>

      <div className="hidden sm:block text-sm text-ink-subtle shrink-0">
        {charge.paymentMethod?.method ?? "—"}
      </div>

      <div className="shrink-0">
        <PaymentStatusBadge status={charge.status} />
      </div>

      <div className="text-right shrink-0">
        <p className="text-sm font-medium text-ink">
          {formatCurrency(charge.amount, charge.currency)}
        </p>
        <p className="text-xs text-ink-tertiary">{formatUnixDate(charge.createdAt, "MMM d, yyyy")}</p>
      </div>

      <ChevronRight size={14} className="shrink-0 text-ink-tertiary" />
    </Link>
  );
}
