import { ApolloError } from "@apollo/client";
import { ErrorCode, type ParsedError } from "./error-codes";

const FRIENDLY_MESSAGES: Record<ErrorCode, string> = {
  [ErrorCode.UNAUTHENTICATED]: "Your session has expired. Please log in again.",
  [ErrorCode.FORBIDDEN]: "You do not have permission to perform this action.",
  [ErrorCode.NOT_FOUND]: "The requested resource was not found.",
  [ErrorCode.VALIDATION_ERROR]: "",
  [ErrorCode.INTERNAL_ERROR]: "Something went wrong. Please try again later.",
  [ErrorCode.NETWORK_ERROR]: "Unable to connect. Please check your internet connection.",
  [ErrorCode.RATE_LIMITED]: "Too many requests. Please wait a moment and try again.",
};

function getUserFriendlyMessage(code: ErrorCode, defaultMessage: string): string {
  if (code === ErrorCode.VALIDATION_ERROR) return defaultMessage;
  return FRIENDLY_MESSAGES[code] || defaultMessage;
}

function isRetryable(code: ErrorCode): boolean {
  return (
    code === ErrorCode.NETWORK_ERROR ||
    code === ErrorCode.INTERNAL_ERROR ||
    code === ErrorCode.RATE_LIMITED
  );
}

export function parseGraphQLError(error: ApolloError): ParsedError[] {
  const errors: ParsedError[] = [];

  if (error.graphQLErrors) {
    error.graphQLErrors.forEach((graphQLError) => {
      const code = (graphQLError.extensions?.code as ErrorCode) || ErrorCode.INTERNAL_ERROR;
      const field = graphQLError.extensions?.field as string | undefined;

      errors.push({
        code,
        message: getUserFriendlyMessage(code, graphQLError.message),
        field,
        retryable: isRetryable(code),
      });
    });
  }

  if (error.networkError) {
    errors.push({
      code: ErrorCode.NETWORK_ERROR,
      message: "Unable to connect to the server. Please check your internet connection.",
      retryable: true,
    });
  }

  return errors.length > 0
    ? errors
    : [
        {
          code: ErrorCode.INTERNAL_ERROR,
          message: "An unexpected error occurred. Please try again.",
          retryable: true,
        },
      ];
}

export function getApolloErrorMessage(error: unknown): string {
  if (error instanceof ApolloError) {
    return (
      parseGraphQLError(error)[0]?.message ?? "An unexpected error occurred. Please try again."
    );
  }
  if (error instanceof Error) return error.message;
  return "Something went wrong. Please try again.";
}
