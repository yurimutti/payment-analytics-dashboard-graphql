import type { ChargeStatus } from "./payment-types";
import { cn } from "@/shared/lib/utils";

const STATUS_CONFIG: Record<
  ChargeStatus,
  { label: string; className: string }
> = {
  SUCCEEDED:          { label: "Succeeded",          className: "bg-brand/10 text-brand border-brand/20" },
  PAID_OUT:           { label: "Paid out",            className: "bg-brand/10 text-brand border-brand/20" },
  AUTHORIZED:         { label: "Authorized",          className: "bg-primary/10 text-primary border-primary/20" },
  PENDING:            { label: "Pending",             className: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  PENDING_PROCESSING: { label: "Processing",          className: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  FAILED:             { label: "Failed",              className: "bg-red-500/10 text-red-400 border-red-500/20" },
  CANCELED:           { label: "Canceled",            className: "bg-surface-3 text-ink-subtle border-hairline" },
  REFUNDED:           { label: "Refunded",            className: "bg-surface-3 text-ink-subtle border-hairline" },
  PARTIALLY_REFUNDED: { label: "Partial refund",      className: "bg-surface-3 text-ink-muted border-hairline" },
  EXPIRED:            { label: "Expired",             className: "bg-surface-3 text-ink-tertiary border-hairline" },
};

interface PaymentStatusBadgeProps {
  status: ChargeStatus;
  className?: string;
}

export function PaymentStatusBadge({ status, className }: PaymentStatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? { label: status, className: "bg-surface-2 text-ink-subtle border-hairline" };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium",
        config.className,
        className,
      )}
    >
      {config.label}
    </span>
  );
}
