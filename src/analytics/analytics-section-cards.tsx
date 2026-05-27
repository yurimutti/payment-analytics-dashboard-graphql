import { TrendingDown, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/shared/lib/currency";
import { Badge } from "@/shared/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { AnalyticsCardSkeleton } from "./analytics-card.skeleton";
import type { AnalyticsData } from "./analytics-types";
import { SECTION_CARDS_COUNT } from "./constants";

interface AnalyticsSectionCardsProps {
  data: AnalyticsData | null;
  isLoading: boolean;
}

interface Metric {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  footer: string;
  subfooter: string;
}

function deriveMetrics(data: AnalyticsData): Metric[] {
  const { total, currency } = data;

  const successAmount = total.succeededAmount;
  const successCount = total.succeededCount;

  const totalAttempts =
    successCount + total.failedCount + total.canceledCount + total.refundedCount;

  const successRate = totalAttempts > 0 ? Math.round((successCount / totalAttempts) * 100) : 0;
  const failureRate = totalAttempts > 0 ? Math.round((total.failedCount / totalAttempts) * 100) : 0;
  const avgTxCents = successCount > 0 ? Math.round(successAmount / successCount) : 0;

  return [
    {
      title: "Total Volume",
      value: formatCurrency(successAmount, currency),
      change: `${successCount.toLocaleString()} payments`,
      trend: "up",
      footer: "Succeeded charges (auth + captured + paid out)",
      subfooter:
        total.directCount > 0
          ? `${formatCurrency(total.directAmount, currency)} direct · ${formatCurrency(total.capturedAmount, currency)} captured`
          : `${successRate}% overall success rate`,
    },
    {
      title: "Success Rate",
      value: `${successRate}%`,
      change: `${successCount.toLocaleString()} of ${totalAttempts.toLocaleString()}`,
      trend: successRate >= 75 ? "up" : "down",
      footer: successRate >= 75 ? "Above target threshold" : "Below target threshold",
      subfooter: `${totalAttempts.toLocaleString()} total attempts`,
    },
    {
      title: "Failed",
      value: total.failedCount.toLocaleString(),
      change: `${failureRate}% of attempts`,
      trend: "down",
      footer: `${formatCurrency(total.failedAmount, currency)} in failed volume`,
      subfooter:
        total.canceledCount > 0
          ? `${total.canceledCount.toLocaleString()} canceled`
          : "Review decline reasons",
    },
    {
      title: "Avg Transaction",
      value: formatCurrency(avgTxCents, currency),
      change: `${successCount.toLocaleString()} payments`,
      trend: "up",
      footer: "Per successful payment",
      subfooter:
        total.refundedCount > 0
          ? `${formatCurrency(total.refundedAmount, currency)} refunded (${total.refundedCount})`
          : "No refunds in period",
    },
  ];
}

export function AnalyticsSectionCards({ data, isLoading }: AnalyticsSectionCardsProps) {
  if (isLoading || !data) {
    return (
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: SECTION_CARDS_COUNT }).map((_, i) => (
          <AnalyticsCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  const metrics = deriveMetrics(data);

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => {
        const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown;
        return (
          <Card key={metric.title} className="@container/card cursor-pointer">
            <CardHeader>
              <CardDescription>{metric.title}</CardDescription>
              <CardTitle className="min-w-0 truncate text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {metric.value}
              </CardTitle>
              <CardAction>
                <Badge variant="outline" className="gap-1.5 whitespace-nowrap">
                  <TrendIcon className="h-4 w-4 shrink-0" />
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
