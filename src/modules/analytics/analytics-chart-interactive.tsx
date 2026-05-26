import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { unixToISODate, formatChartDate, formatChartTick } from "@/shared/lib/date";
import { centsToPreciseFloat, formatChartAmount } from "@/shared/lib/currency";



import { useIsMobile } from "@/shared/hooks/use-mobile";
import {
  Card,
  CardAction,
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
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/shared/ui/toggle-group";
import { Skeleton } from "@/shared/ui/skeleton";
import type { KPIDataPoint, DateRangeOption } from "./analytics-types";

const chartConfig = {
  amount: {
    label: "Volume (EUR)",
    color: "var(--color-primary)",
  },
  count: {
    label: "Transactions",
    color: "var(--color-brand)",
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
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Payment Volume</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Daily transaction volume for the selected period
          </span>
          <span className="@[540px]/card:hidden">Daily volume</span>
        </CardDescription>
        <CardAction>
          {/* Desktop: toggle group */}
          <ToggleGroup
            type="single"
            value={String(range)}
            onValueChange={(v) => { if (v) onRangeChange(Number(v) as DateRangeOption); }}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="7">7d</ToggleGroupItem>
            <ToggleGroupItem value="30">30d</ToggleGroupItem>
            <ToggleGroupItem value="90">90d</ToggleGroupItem>
          </ToggleGroup>

          {/* Mobile: select */}
          <Select
            value={String(range)}
            onValueChange={(v) => onRangeChange(Number(v) as DateRangeOption)}
          >
            <SelectTrigger
              className="flex h-8 w-40 text-xs @[767px]/card:hidden"
              aria-label="Select date range"
            >
              <SelectValue placeholder="Last 30 days" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {rangeOptions.map((o) => (
                <SelectItem key={o.value} value={String(o.value)} className="rounded-lg">
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {isLoading ? (
          <Skeleton className="h-[250px] w-full rounded-lg" />
        ) : (
          <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
            <AreaChart data={rows}>
              <defs>
                <linearGradient id="fillAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="var(--color-amount)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-amount)" stopOpacity={0.05} />
                </linearGradient>
              </defs>

              <CartesianGrid vertical={false} stroke="var(--color-hairline)" />

              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tick={{ fill: "var(--color-ink-subtle)", fontSize: 11 }}
                tickFormatter={(v: string) => formatChartTick(v)}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--color-ink-subtle)", fontSize: 11 }}
                width={56}
                tickFormatter={(v: number) => formatChartAmount(v)}
              />

              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value: string) => formatChartDate(value)}
                    formatter={(value, name) => {
                      if (name === "amount") {
                        const formatted = `€${Number(value).toLocaleString("en-EU", { minimumFractionDigits: 2 })}`;
                        return [formatted, "Volume"] as [string, string];
                      }
                      return [String(value), "Transactions"] as [string, string];
                    }}
                    indicator="dot"
                  />
                }
              />

              <Area
                dataKey="amount"
                type="natural"
                fill="url(#fillAmount)"
                stroke="var(--color-amount)"
                strokeWidth={2}
                dot={false}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
