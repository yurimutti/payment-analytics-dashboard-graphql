import { TrendingDown, TrendingUp } from "lucide-react";
import { Badge } from "@/shared/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { formatCurrency } from "@/shared/lib/currency";
import type { AnalyticsData } from "./analytics-types";

function formatEur(cents: number) {
  return formatCurrency(cents, "EUR");
}

function CardSkeleton() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <Skeleton className="h-3 w-28" />
        <Skeleton className="mt-2 h-8 w-36" />
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5">
        <Skeleton className="h-3 w-40" />
        <Skeleton className="h-3 w-32" />
      </CardFooter>
    </Card>
  );
}

interface AnalyticsSectionCardsProps {
  data: AnalyticsData | null;
  isLoading: boolean;
}

export function AnalyticsSectionCards({ data, isLoading }: AnalyticsSectionCardsProps) {
  if (isLoading || !data) {
    return (
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
    );
  }

  const { total } = data;
  const successAmount  = total.succeededAmount + total.capturedAmount;
  const successCount   = total.succeededCount  + total.capturedCount;
  const totalAttempts  = successCount + total.failedCount + total.canceledCount + total.refundedCount;
  const successRate    = totalAttempts > 0 ? Math.round((successCount / totalAttempts) * 100) : 0;
  // avgTx: average cents per transaction
  const avgTx = successCount > 0 ? Math.round(successAmount / successCount) : 0;

  const cards = [
    {
      label:    "Total Volume",
      value:    formatEur(successAmount),
      badge:    `${successCount.toLocaleString()} payments`,
      positive: true,
      footer:   "Succeeded + captured",
      sub:      `${successRate}% success rate`,
    },
    {
      label:    "Success Rate",
      value:    `${successRate}%`,
      badge:    `${successCount.toLocaleString()} of ${totalAttempts.toLocaleString()}`,
      positive: successRate >= 75,
      footer:   successRate >= 75 ? "Above target threshold" : "Below target threshold",
      sub:      `${totalAttempts.toLocaleString()} total attempts`,
    },
    {
      label:    "Failed",
      value:    total.failedCount.toLocaleString(),
      badge:    `${totalAttempts > 0 ? Math.round((total.failedCount / totalAttempts) * 100) : 0}% of attempts`,
      positive: false,
      footer:   "No charge issued",
      sub:      "Review decline reasons",
    },
    {
      label:    "Avg Transaction",
      value:    formatEur(avgTx),
      badge:    `${successCount.toLocaleString()} payments`,
      positive: true,
      footer:   "Per successful payment",
      sub:      formatEur(total.refundedAmount) + " refunded",
    },
  ];

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.label} className="@container/card">
          <CardHeader>
            <CardDescription>{card.label}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {card.value}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                {card.positive ? <TrendingUp /> : <TrendingDown />}
                {card.badge}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {card.footer}
              {card.positive
                ? <TrendingUp className="size-4" />
                : <TrendingDown className="size-4" />}
            </div>
            <div className="text-muted-foreground">{card.sub}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
