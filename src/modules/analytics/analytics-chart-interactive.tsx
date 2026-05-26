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
    label: "Volume (EUR)",
    color: "var(--primary)",
  },
  count: {
    label: "Transactions",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

function toChartRows(data: KPIDataPoint[]) {
  return data.map((d) => ({
    date: unixToISODate(d.date),
    amount: centsToPreciseFloat(d.amount),
    count: d.count,
  }));
}

interface AnalyticsChartInteractiveProps {
  data: KPIDataPoint[];
  range: DateRangeOption;
  onRangeChange: (v: DateRangeOption) => void;
  isLoading: boolean;
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

  const rangeOptions: { label: string; value: DateRangeOption }[] = [
    { label: "Last 7 days",  value: 7  },
    { label: "Last 30 days", value: 30 },
    { label: "Last 90 days", value: 90 },
  ];

  return (
    <Card className="cursor-pointer">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
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
              {rangeOptions.map((o) => (
                <SelectItem key={o.value} value={String(o.value)} className="cursor-pointer">
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" className="cursor-pointer hidden sm:flex">
            Export
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0 pt-6">
        <div className="px-6 pb-6">
          {isLoading ? (
            <Skeleton className="h-[350px] w-full rounded-lg" />
          ) : (
            <ChartContainer config={chartConfig} className="h-[350px] w-full">
              <AreaChart data={rows} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="var(--color-amount)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--color-amount)" stopOpacity={0.05} />
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

                {/* Dashed secondary: transaction count (scaled for visual comparison) */}
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="var(--color-count)"
                  fill="url(#colorCount)"
                  strokeDasharray="5 5"
                  strokeWidth={1}
                />

                {/* Main area: payment volume */}
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="var(--color-amount)"
                  fill="url(#colorAmount)"
                  strokeWidth={1.5}
                />
              </AreaChart>
            </ChartContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
