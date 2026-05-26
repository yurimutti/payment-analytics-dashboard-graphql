export type DateRangeOption = 7 | 30 | 90;

export interface KPITotal {
  succeededAmount: number;
  succeededCount: number;
  capturedAmount: number;
  capturedCount: number;
  canceledAmount: number;
  canceledCount: number;
  refundedAmount: number;
  refundedCount: number;
  failedAmount: number;
  failedCount: number;
}

export interface KPIDataPoint {
  date: number; // Unix timestamp (seconds)
  amount: number; // cents
  count: number;
}

export interface AnalyticsData {
  currency: string;
  total: KPITotal;
  data: KPIDataPoint[];
}
