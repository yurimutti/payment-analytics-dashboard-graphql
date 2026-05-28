export enum ErrorCode {
  UNAUTHENTICATED = "UNAUTHENTICATED",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  INTERNAL_ERROR = "INTERNAL_ERROR",
  NETWORK_ERROR = "NETWORK_ERROR",
  RATE_LIMITED = "RATE_LIMITED",
}

export interface ParsedError {
  code: ErrorCode;
  message: string;
  field?: string;
  retryable: boolean;
}
