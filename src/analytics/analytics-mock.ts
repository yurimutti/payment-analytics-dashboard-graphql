import type { AnalyticsData, DateRangeOption } from "./analytics-types";

const now = Math.floor(Date.now() / 1000);
const DAY = 86_400;

/** Generates a seeded pseudo-random number from a seed value */
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10_000;
  return x - Math.floor(x);
}

/** Generates daily KPI data points for the last N days */
function generateDataPoints(days: number) {
  return Array.from({ length: days }, (_, i) => {
    const dayIndex = i + 1;
    const isWeekend = new Date((now - (days - i) * DAY) * 1000).getDay() % 6 === 0;
    const base = isWeekend ? 18_000 : 42_000;
    const variance = seededRandom(dayIndex * 7) * 30_000;
    const trend = dayIndex * 180; // slight upward trend
    const amount = Math.round(base + variance + trend);
    const count = Math.round(amount / 5200 + seededRandom(dayIndex * 3) * 12);

    return {
      date: now - (days - i) * DAY,
      amount,
      count,
    };
  });
}

/** Returns analytics mock data for a given date range (in days) */
export function getMockAnalytics(days: DateRangeOption): AnalyticsData {
  const data = generateDataPoints(days);

  const totalAmount = data.reduce((s, d) => s + d.amount, 0);
  const totalCount = data.reduce((s, d) => s + d.count, 0);

  return {
    currency: "EUR",
    total: {
      succeededAmount: Math.round(totalAmount * 0.78),
      succeededCount: Math.round(totalCount * 0.78),
      capturedAmount: Math.round(totalAmount * 0.09),
      capturedCount: Math.round(totalCount * 0.09),
      canceledAmount: Math.round(totalAmount * 0.05),
      canceledCount: Math.round(totalCount * 0.05),
      refundedAmount: Math.round(totalAmount * 0.04),
      refundedCount: Math.round(totalCount * 0.04),
      failedAmount: 0,
      failedCount: Math.round(totalCount * 0.04),
    },
    data,
  };
}
