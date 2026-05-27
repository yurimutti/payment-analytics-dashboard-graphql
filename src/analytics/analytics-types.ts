export type DateRangeOption = 7 | 30 | 90;

export interface KPITotal {
  succeededAmount: number;
  succeededCount: number;
  capturedAmount: number;
  capturedCount: number;
  directAmount: number;
  directCount: number;
  canceledAmount: number;
  canceledCount: number;
  refundedAmount: number;
  refundedCount: number;
  failedAmount: number;
  failedCount: number;
}

export interface KPIDataPoint {
  timestamp: number;
  succeededAmount: number;
  succeededCount: number;
  capturedAmount: number;
  capturedCount: number;
  directAmount: number;
  directCount: number;
  failedAmount: number;
  failedCount: number;
  canceledAmount: number;
  canceledCount: number;
  refundedAmount: number;
  refundedCount: number;
}

export interface AnalyticsData {
  currency: string;
  total: KPITotal;
  data: KPIDataPoint[];
}
