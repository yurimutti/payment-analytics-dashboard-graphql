import { Skeleton } from "@/shared/ui/skeleton";

export function PaymentRowSkeleton() {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4 gap-4">
      <div className="flex items-center gap-3">
        <Skeleton className="h-9 w-9 rounded-full shrink-0" />
        <div className="space-y-1.5">
          <Skeleton className="h-3.5 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Skeleton className="h-5 w-20 rounded-md" />
        <Skeleton className="h-3.5 w-16" />
        <Skeleton className="h-3.5 w-20" />
      </div>
    </div>
  );
}
