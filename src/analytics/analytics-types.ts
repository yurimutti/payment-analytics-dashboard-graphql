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
  date: number; // Unix timestamp
  amount: number;
  count: number;
}
