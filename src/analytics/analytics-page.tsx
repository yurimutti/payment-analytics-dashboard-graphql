import { MOCK_KPI_TOTAL, MOCK_KPI_DATA } from "./analytics-mock";

export function AnalyticsPage() {
  const total = MOCK_KPI_TOTAL;
  const data = MOCK_KPI_DATA;

  return (
    <div className="p-6 space-y-6">
      <p className="text-xs text-ink-subtle">
        Using mock data — GraphQL integration coming next
      </p>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border border-hairline bg-surface-1 p-4">
          <p className="text-xs text-ink-subtle">Succeeded</p>
          <p className="mt-1 text-2xl font-semibold text-ink">{total.succeededCount}</p>
          <p className="mt-0.5 text-xs text-ink-tertiary">
            €{(total.succeededAmount / 100).toFixed(2)}
          </p>
        </div>
        <div className="rounded-lg border border-hairline bg-surface-1 p-4">
          <p className="text-xs text-ink-subtle">Failed</p>
          <p className="mt-1 text-2xl font-semibold text-ink">{total.failedCount}</p>
        </div>
        <div className="rounded-lg border border-hairline bg-surface-1 p-4">
          <p className="text-xs text-ink-subtle">Refunded</p>
          <p className="mt-1 text-2xl font-semibold text-ink">{total.refundedCount}</p>
          <p className="mt-0.5 text-xs text-ink-tertiary">
            €{(total.refundedAmount / 100).toFixed(2)}
          </p>
        </div>
        <div className="rounded-lg border border-hairline bg-surface-1 p-4">
          <p className="text-xs text-ink-subtle">Canceled</p>
          <p className="mt-1 text-2xl font-semibold text-ink">{total.canceledCount}</p>
        </div>
      </div>

      {/* Chart placeholder */}
      <div className="rounded-lg border border-hairline bg-surface-1 p-4">
        <p className="mb-3 text-xs font-medium text-ink">Volume — last 30 days ({data.length} pts)</p>
        <div className="flex h-32 items-end gap-1">
          {data.map((d, i) => {
            const max = Math.max(...data.map((x) => x.amount));
            const h = Math.round((d.amount / max) * 100);
            return (
              <div
                key={i}
                className="flex-1 rounded-sm bg-primary/40 hover:bg-primary/70 transition-colors"
                style={{ height: `${h}%` }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
