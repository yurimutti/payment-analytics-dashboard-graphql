import { Search } from "lucide-react";
import type { ChargeStatus } from "./payment-types";

export interface FilterState {
  search: string;
  status: ChargeStatus | "";
}

const ALL_STATUSES: ChargeStatus[] = [
  "SUCCEEDED", "PENDING", "PENDING_PROCESSING",
  "FAILED", "CANCELED", "REFUNDED",
  "PARTIALLY_REFUNDED", "AUTHORIZED", "EXPIRED", "PAID_OUT",
];

const STATUS_LABELS: Record<ChargeStatus, string> = {
  SUCCEEDED:          "Succeeded",
  PENDING:            "Pending",
  PENDING_PROCESSING: "Processing",
  FAILED:             "Failed",
  CANCELED:           "Canceled",
  REFUNDED:           "Refunded",
  PARTIALLY_REFUNDED: "Partial refund",
  AUTHORIZED:         "Authorized",
  EXPIRED:            "Expired",
  PAID_OUT:           "Paid out",
};

interface PaymentFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  total: number;
  shown: number;
}

export function PaymentFilters({ filters, onChange, total, shown }: PaymentFiltersProps) {
  return (
    <div className="flex flex-col gap-3 border-b border-hairline px-6 py-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Controls */}
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {/* Search */}
        <div className="relative flex items-center">
          <Search
            size={13}
            strokeWidth={1.5}
            className="pointer-events-none absolute left-2.5 text-ink-tertiary"
          />
          <input
            type="text"
            placeholder="Search by ID, order, customer…"
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="h-8 w-64 rounded-md border border-hairline bg-surface-1 pl-8 pr-3 text-xs text-ink placeholder:text-ink-tertiary focus:border-hairline-strong focus:outline-none"
          />
        </div>

        {/* Status */}
        <select
          value={filters.status}
          onChange={(e) => onChange({ ...filters, status: e.target.value as ChargeStatus | "" })}
          className="h-8 rounded-md border border-hairline bg-surface-1 px-2 text-xs text-ink focus:border-hairline-strong focus:outline-none cursor-pointer"
        >
          <option value="">All statuses</option>
          {ALL_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>

        {/* Reset */}
        {(filters.search || filters.status) && (
          <button
            onClick={() => onChange({ search: "", status: "" })}
            className="text-xs text-ink-subtle hover:text-ink transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {/* Count */}
      <p className="shrink-0 text-xs text-ink-tertiary">
        {shown} of {total}
      </p>
    </div>
  );
}
