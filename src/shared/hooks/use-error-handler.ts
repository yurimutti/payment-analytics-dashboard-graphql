import { ApolloError } from "@apollo/client";
import { useCallback } from "react";
import { ErrorCode, type ParsedError, parseGraphQLError } from "@/shared/lib/apollo";
import { toast } from "@/shared/ui/toaster";

export function useErrorHandler() {
  const handleError = useCallback((error: unknown): ParsedError[] => {
    const parsed =
      error instanceof ApolloError
        ? parseGraphQLError(error)
        : [
            {
              code: ErrorCode.INTERNAL_ERROR,
              message:
                error instanceof Error ? error.message : "Something went wrong. Please try again.",
              retryable: true,
            },
          ];

    for (const e of parsed) {
      switch (e.code) {
        case ErrorCode.UNAUTHENTICATED:
          // future: redirect to login when auth is added
          toast.error(e.message);
          break;
        case ErrorCode.RATE_LIMITED:
          // future: exponential backoff
          toast.error(e.message);
          break;
        default:
          toast.error(e.message);
      }
    }

    return parsed;
  }, []);

  return { handleError };
}
