import { Skeleton } from "@/shared/ui/skeleton";

export function PaymentRowSkeleton() {
  return (
    <div className="flex items-center p-4 rounded-lg border gap-3">
      <Skeleton className="h-9 w-9 rounded-full shrink-0" />
      <div className="flex flex-1 items-center gap-3 min-w-0">
        <div className="space-y-1.5 min-w-0 flex-1">
          <Skeleton className="h-3.5 w-32 max-w-full" />
          <Skeleton className="h-3 w-24 max-w-full" />
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Skeleton className="h-5 w-20 rounded-md" />
          <Skeleton className="h-3.5 w-16" />
          <Skeleton className="h-3.5 w-20" />
        </div>
      </div>
    </div>
  );
}
