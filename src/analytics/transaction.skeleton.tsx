import { Skeleton } from "@/shared/ui/skeleton";

export function TransactionSkeleton() {
  return (
    <div className="flex items-center p-3 rounded-lg border gap-2">
      <Skeleton className="h-8 w-8 rounded-full shrink-0" />
      <div className="flex flex-1 items-center justify-between gap-2">
        <div className="space-y-1.5">
          <Skeleton className="h-3.5 w-28" />
          <Skeleton className="h-3 w-36" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-20 rounded-md" />
          <div className="space-y-1.5 text-right">
            <Skeleton className="h-3.5 w-16" />
            <Skeleton className="h-3 w-12" />
          </div>
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </div>
    </div>
  );
}
