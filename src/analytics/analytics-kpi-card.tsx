import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface AnalyticsKpiCardProps {
  label: string;
  value: string;
  sub?: string;
  accent?: "default" | "success" | "danger" | "warning";
  isLoading?: boolean;
}

const ACCENT_CLASSES = {
  default: "text-ink",
  success: "text-brand",
  danger:  "text-red-400",
  warning: "text-yellow-400",
} as const;

export function AnalyticsKpiCard({
  label,
  value,
  sub,
  accent = "default",
  isLoading = false,
}: AnalyticsKpiCardProps) {
  if (isLoading) {
    return (
      <div className="rounded-lg border border-hairline bg-surface-1 p-4 space-y-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-7 w-32" />
        <Skeleton className="h-3 w-20" />
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-hairline bg-surface-1 p-4">
      <p className="text-xs text-ink-subtle">{label}</p>
      <p className={cn("mt-1.5 text-2xl font-semibold tabular-nums", ACCENT_CLASSES[accent])}>
        {value}
      </p>
      {sub && <p className="mt-0.5 text-xs text-ink-tertiary">{sub}</p>}
    </div>
  );
}
