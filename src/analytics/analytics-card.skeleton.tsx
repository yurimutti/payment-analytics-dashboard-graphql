import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
} from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

export function AnalyticsCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-4 w-28" />
        <Skeleton className="mt-1 h-8 w-36" />
        <CardAction>
          <Skeleton className="h-6 w-16 rounded-full" />
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-3 w-32" />
      </CardFooter>
    </Card>
  );
}
