import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, fromUnixTime } from "date-fns";
import Decimal from "decimal.js";
import type { KPIDataPoint } from "./analytics-types";
import { Skeleton } from "@/components/ui/skeleton";

interface ChartRow {
  label: string;
  amount: number; // major units (EUR)
  count: number;
}

function toChartRows(data: KPIDataPoint[]): ChartRow[] {
  return data.map((d) => ({
    label: format(fromUnixTime(d.date), "MMM d"),
    amount: new Decimal(d.amount).div(100).toDecimalPlaces(2).toNumber(),
    count: d.count,
  }));
}

function formatYAxis(value: number): string {
  if (value >= 1_000) return `€${(value / 1_000).toFixed(0)}k`;
  return `€${value}`;
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number; payload: ChartRow }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;

  return (
    <div className="rounded-lg border border-hairline bg-surface-2 px-3 py-2.5 shadow-medium text-xs">
      <p className="font-medium text-ink">{label}</p>
      <p className="mt-1 text-sm font-semibold text-ink">
        €{row.amount.toLocaleString("en-EU", { minimumFractionDigits: 2 })}
      </p>
      <p className="text-ink-subtle">{row.count} transactions</p>
    </div>
  );
}

interface AnalyticsChartProps {
  data: KPIDataPoint[];
  isLoading?: boolean;
}

export function AnalyticsChart({ data, isLoading = false }: AnalyticsChartProps) {
  if (isLoading) {
    return <Skeleton className="h-64 w-full rounded-lg" />;
  }

  const rows = toChartRows(data);

  return (
    <div className="rounded-lg border border-hairline bg-surface-1 p-4">
      <p className="mb-4 text-xs font-medium text-ink-subtle">Volume (EUR)</p>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={rows} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#23252a"
            vertical={false}
          />

          <XAxis
            dataKey="label"
            tick={{ fill: "#8a8f98", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
          />

          <YAxis
            tick={{ fill: "#8a8f98", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={formatYAxis}
            width={48}
          />

          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#34343a" }} />

          <Area
            type="monotone"
            dataKey="amount"
            stroke="#6366f1"
            strokeWidth={2}
            fill="url(#areaGradient)"
            dot={false}
            activeDot={{ r: 4, fill: "#6366f1", stroke: "#818cf8", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
