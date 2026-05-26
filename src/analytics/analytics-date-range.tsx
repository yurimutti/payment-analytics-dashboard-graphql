import type { DateRangeOption } from "./analytics-types";
import { cn } from "@/lib/utils";

const OPTIONS: { label: string; value: DateRangeOption }[] = [
  { label: "7d",  value: 7  },
  { label: "30d", value: 30 },
  { label: "90d", value: 90 },
];

interface AnalyticsDateRangeProps {
  value: DateRangeOption;
  onChange: (v: DateRangeOption) => void;
}

export function AnalyticsDateRange({ value, onChange }: AnalyticsDateRangeProps) {
  return (
    <div className="flex items-center gap-1 rounded-md border border-hairline bg-surface-1 p-0.5">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            "rounded px-3 py-1 text-xs font-medium transition-colors outline-none",
            value === opt.value
              ? "bg-surface-3 text-ink"
              : "text-ink-subtle hover:text-ink",
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
