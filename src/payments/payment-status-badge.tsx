import type { ChargeStatus } from "./payment-types";
import { cn } from "@/shared/lib/utils";

const STATUS_CONFIG: Record<ChargeStatus, { label: string; className: string }> = {
  SUCCEEDED:          { label: "Completed",     className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  PAID_OUT:           { label: "Paid Out",       className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  AUTHORIZED:         { label: "Authorized",     className: "bg-indigo-500/15  text-indigo-400  border-indigo-500/30"  },
  PENDING:            { label: "Pending",        className: "bg-sky-500/15     text-sky-300     border-sky-500/30"     },
  PENDING_PROCESSING: { label: "Processing",     className: "bg-sky-500/15     text-sky-300     border-sky-500/30"     },
  FAILED:             { label: "Failed",         className: "bg-red-500/15     text-red-400     border-red-500/30"     },
  CANCELED:           { label: "Canceled",       className: "bg-zinc-500/15    text-zinc-300    border-zinc-500/30"    },
  REFUNDED:           { label: "Refunded",       className: "bg-amber-500/15   text-amber-300   border-amber-500/30"   },
  PARTIALLY_REFUNDED: { label: "Partial Refund", className: "bg-amber-500/15   text-amber-300   border-amber-500/30"   },
  EXPIRED:            { label: "Expired",        className: "bg-red-500/15     text-red-400     border-red-500/30"     },
};

export function statusLabel(status: ChargeStatus): string {
  return STATUS_CONFIG[status]?.label ?? status;
}

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
