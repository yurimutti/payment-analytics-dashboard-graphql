import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { unixToISODate, formatChartDate } from "@/shared/lib/date";
import { centsToPreciseFloat } from "@/shared/lib/currency";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";
import type { KPIDataPoint, DateRangeOption } from "./analytics-types";

const chartConfig = {
  amount: {
    label: "Successful Volume",
    color: "var(--primary)",
  },
  failed: {
    label: "Failed Volume",
    color: "var(--destructive)",
  },
  count: {
    label: "Transactions",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

function toChartRows(data: KPIDataPoint[]) {
  return data.map((d) => ({
    date:   unixToISODate(d.timestamp),
    amount: centsToPreciseFloat(d.succeededAmount),
    failed: centsToPreciseFloat(d.failedAmount),
    count:  d.succeededCount,
  }));
}

interface AnalyticsChartInteractiveProps {
  data: KPIDataPoint[];
  range: DateRangeOption;
  onRangeChange: (v: DateRangeOption) => void;
  isLoading: boolean;
}

const RANGE_OPTIONS: { label: string; value: DateRangeOption }[] = [
  { label: "Last 12 months", value: 365 },
  { label: "Last 90 days",   value: 90  },
  { label: "Last 30 days",   value: 30  },
  { label: "Last 7 days",    value: 7   },
];

function ChartHeader({
  range,
  onRangeChange,
}: {
  range: DateRangeOption;
  onRangeChange: (v: DateRangeOption) => void;
}) {
  return (
    <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-2 space-y-0 pb-2">
      <div>
        <CardTitle>Payment Volume</CardTitle>
        <CardDescription>Daily transaction volume for the selected period</CardDescription>
      </div>
      <div className="flex items-center gap-2">
        <Select
          value={String(range)}
          onValueChange={(v) => onRangeChange(Number(v) as DateRangeOption)}
        >
          <SelectTrigger className="w-36 cursor-pointer">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {RANGE_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={String(o.value)} className="cursor-pointer">
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          className="cursor-pointer hidden sm:flex"
          aria-label="Export payment data"
        >
          Export
        </Button>
      </div>
    </CardHeader>
  );
}

export function AnalyticsChartInteractive({
  data,
  range,
  onRangeChange,
  isLoading,
}: AnalyticsChartInteractiveProps) {
  const isMobile = useIsMobile();

  React.useEffect(() => {
    if (isMobile) onRangeChange(7);
  }, [isMobile, onRangeChange]);

  const rows = toChartRows(data);
  const hasData = rows.some((r) => r.amount > 0 || r.failed > 0);

  if (isLoading) {
    return (
      <Card className="cursor-pointer">
        <ChartHeader range={range} onRangeChange={onRangeChange} />
        <CardContent className="p-0 pt-6">
          <div className="px-6 pb-6">
            <Skeleton className="h-65 sm:h-80 lg:h-87.5 w-full rounded-lg" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!hasData) {
    return (
      <Card className="cursor-pointer">
        <ChartHeader range={range} onRangeChange={onRangeChange} />
        <CardContent className="p-0 pt-6">
          <div className="px-6 pb-6">
            <div className="flex h-65 sm:h-80 lg:h-87.5 w-full flex-col items-center justify-center text-center gap-2">
              <p className="text-sm font-medium text-muted-foreground">No transactions in this period</p>
              <p className="text-xs text-muted-foreground">Try a wider date range or check back after new charges arrive</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="cursor-pointer">
      <ChartHeader range={range} onRangeChange={onRangeChange} />
      <CardContent className="p-0 pt-6">
        <div className="px-6 pb-6">
          <ChartContainer config={chartConfig} className="h-65 sm:h-80 lg:h-87.5 w-full">
            <AreaChart data={rows} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="var(--color-amount)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="var(--color-amount)" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="colorFailed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="var(--color-failed)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-failed)" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="var(--color-count)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="var(--color-count)" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />

              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={(v: string) =>
                  new Date(v).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                }
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={(v: number) =>
                  v >= 1000 ? `€${(v / 1000).toFixed(0)}k` : `€${v}`
                }
              />

              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(value: string) => formatChartDate(value)}
                  />
                }
              />

              <Area
                type="monotone"
                dataKey="failed"
                stroke="var(--color-failed)"
                fill="url(#colorFailed)"
                strokeWidth={1}
              />

              <Area
                type="monotone"
                dataKey="amount"
                stroke="var(--color-amount)"
                fill="url(#colorAmount)"
                strokeWidth={1.5}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
