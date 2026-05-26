import { TrendingDown, TrendingUp } from "lucide-react";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Skeleton } from "@/shared/ui/skeleton";
import { formatCurrency } from "@/shared/lib/currency";
import type { AnalyticsData } from "./analytics-types";

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function CardSkeleton() {
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

// ─── Derived metrics ──────────────────────────────────────────────────────────

interface Metric {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  footer: string;
  subfooter: string;
}

function deriveMetrics(data: AnalyticsData): Metric[] {
  const { total } = data;
  const successAmount  = total.succeededAmount + total.capturedAmount;
  const successCount   = total.succeededCount  + total.capturedCount;
  const totalAttempts  = successCount + total.failedCount + total.canceledCount + total.refundedCount;
  const successRate    = totalAttempts > 0 ? Math.round((successCount / totalAttempts) * 100) : 0;
  const failureRate    = totalAttempts > 0 ? Math.round((total.failedCount / totalAttempts) * 100) : 0;
  const avgTxCents     = successCount > 0 ? Math.round(successAmount / successCount) : 0;

  return [
    {
      title:     "Total Volume",
      value:     formatCurrency(successAmount, "EUR"),
      change:    `${successCount.toLocaleString()} payments`,
      trend:     "up",
      footer:    "Succeeded & captured charges",
      subfooter: `${successRate}% overall success rate`,
    },
    {
      title:     "Success Rate",
      value:     `${successRate}%`,
      change:    `${successCount.toLocaleString()} of ${totalAttempts.toLocaleString()}`,
      trend:     successRate >= 75 ? "up" : "down",
      footer:    successRate >= 75 ? "Above target threshold" : "Below target threshold",
      subfooter: `${totalAttempts.toLocaleString()} total attempts`,
    },
    {
      title:     "Failed",
      value:     total.failedCount.toLocaleString(),
      change:    `${failureRate}% of attempts`,
      trend:     "down",
      footer:    "No charge issued",
      subfooter: "Review decline reasons",
    },
    {
      title:     "Avg Transaction",
      value:     formatCurrency(avgTxCents, "EUR"),
      change:    `${successCount.toLocaleString()} payments`,
      trend:     "up",
      footer:    "Per successful payment",
      subfooter: `${formatCurrency(total.refundedAmount, "EUR")} refunded`,
    },
  ];
}

// ─── Section cards ────────────────────────────────────────────────────────────

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

  const metrics = deriveMetrics(data);

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => {
        const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown;
        return (
          <Card key={metric.title} className="@container/card cursor-pointer">
            <CardHeader>
              <CardDescription>{metric.title}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {metric.value}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <TrendIcon className="h-4 w-4" />
                  {metric.change}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                {metric.footer} <TrendIcon className="size-4" />
              </div>
              <div className="text-muted-foreground">{metric.subfooter}</div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
