import { ApolloError } from "@apollo/client";

export function getApolloErrorMessage(error: unknown): string {
  if (error instanceof ApolloError) {
    if (error.graphQLErrors.length > 0) {
      return error.graphQLErrors[0].message;
    }
    const ne = error.networkError as unknown as {
      statusCode?: number;
      bodyText?: string;
      message?: string;
    } | null;
    if (ne) {
      if (ne.bodyText !== undefined) return "The server returned an invalid response.";
      if (ne.statusCode !== undefined) return "The server is unavailable. Please try again.";
      return ne.message ?? "Network error. Check your connection.";
    }
    return error.message;
  }
  if (error instanceof Error) return error.message;
  return "Something went wrong. Please try again.";
}
