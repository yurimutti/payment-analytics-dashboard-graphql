import { Skeleton } from "@/shared/ui/skeleton";

export function PaymentDetailSkeleton() {
  return (
    <div className="flex-1 space-y-6 px-4 pt-6 pb-10">
      <Skeleton className="h-4 w-20" />
      <div className="flex items-center gap-3">
        <Skeleton className="h-5 w-5 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
      <Skeleton className="h-px w-full" />
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <Skeleton className="h-36 rounded-lg" />
          <Skeleton className="h-36 rounded-lg" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-52 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
