import type { KPITotal, KPIDataPoint } from "./analytics-types";

export const MOCK_KPI_TOTAL: KPITotal = {
  succeededAmount: 1_248_500,
  succeededCount: 842,
  capturedAmount: 320_000,
  capturedCount: 210,
  canceledAmount: 85_000,
  canceledCount: 54,
  refundedAmount: 42_300,
  refundedCount: 28,
  failedAmount: 0,
  failedCount: 137,
};

// 30 days of mock data
const now = Math.floor(Date.now() / 1000);
const DAY = 86_400;

export const MOCK_KPI_DATA: KPIDataPoint[] = Array.from({ length: 30 }, (_, i) => ({
  date: now - (29 - i) * DAY,
  amount: Math.floor(20_000 + Math.random() * 80_000),
  count: Math.floor(10 + Math.random() * 60),
}));
