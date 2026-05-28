import { ApolloError } from "@apollo/client";
import { describe, expect, it } from "vitest";
import { getApolloErrorMessage, parseGraphQLError } from "./apollo-error";
import { ErrorCode } from "./error-codes";

describe("parseGraphQLError", () => {
  it("uses extensions.code to classify GraphQL errors", () => {
    const error = new ApolloError({
      graphQLErrors: [
        { message: "Login required", extensions: { code: ErrorCode.UNAUTHENTICATED } } as never,
      ],
    });
    const [parsed] = parseGraphQLError(error);
    expect(parsed.code).toBe(ErrorCode.UNAUTHENTICATED);
    expect(parsed.message).toBe("Your session has expired. Please log in again.");
    expect(parsed.retryable).toBe(false);
  });

  it("preserves the raw message for VALIDATION_ERROR", () => {
    const error = new ApolloError({
      graphQLErrors: [
        {
          message: "Amount must be positive",
          extensions: { code: ErrorCode.VALIDATION_ERROR, field: "amount" },
        } as never,
      ],
    });
    const [parsed] = parseGraphQLError(error);
    expect(parsed.code).toBe(ErrorCode.VALIDATION_ERROR);
    expect(parsed.message).toBe("Amount must be positive");
    expect(parsed.field).toBe("amount");
    expect(parsed.retryable).toBe(false);
  });

  it("falls back to INTERNAL_ERROR when extensions.code is missing", () => {
    const error = new ApolloError({
      graphQLErrors: [{ message: "Charge not found" } as never],
    });
    const [parsed] = parseGraphQLError(error);
    expect(parsed.code).toBe(ErrorCode.INTERNAL_ERROR);
    expect(parsed.message).toBe("Something went wrong. Please try again later.");
    expect(parsed.retryable).toBe(true);
  });

  it("flags NETWORK_ERROR for any networkError on the ApolloError", () => {
    const error = new ApolloError({
      networkError: new Error("Connection refused"),
    });
    const [parsed] = parseGraphQLError(error);
    expect(parsed.code).toBe(ErrorCode.NETWORK_ERROR);
    expect(parsed.message).toBe(
      "Unable to connect to the server. Please check your internet connection.",
    );
    expect(parsed.retryable).toBe(true);
  });

  it("returns one entry per graphQLError plus a separate network entry", () => {
    const error = new ApolloError({
      graphQLErrors: [
        { message: "Forbidden", extensions: { code: ErrorCode.FORBIDDEN } } as never,
        { message: "Bad input", extensions: { code: ErrorCode.VALIDATION_ERROR } } as never,
      ],
      networkError: new Error("offline"),
    });
    const parsed = parseGraphQLError(error);
    expect(parsed).toHaveLength(3);
    expect(parsed.map((p) => p.code)).toEqual([
      ErrorCode.FORBIDDEN,
      ErrorCode.VALIDATION_ERROR,
      ErrorCode.NETWORK_ERROR,
    ]);
  });

  it("returns a fallback INTERNAL_ERROR when nothing else is present", () => {
    const error = new ApolloError({});
    const [parsed] = parseGraphQLError(error);
    expect(parsed.code).toBe(ErrorCode.INTERNAL_ERROR);
    expect(parsed.message).toBe("An unexpected error occurred. Please try again.");
    expect(parsed.retryable).toBe(true);
  });
});

describe("getApolloErrorMessage", () => {
  it("returns the friendly message of the first ParsedError for ApolloError", () => {
    const error = new ApolloError({
      graphQLErrors: [{ message: "x", extensions: { code: ErrorCode.NOT_FOUND } } as never],
    });
    expect(getApolloErrorMessage(error)).toBe("The requested resource was not found.");
  });

  it("surfaces plain Error.message for non-Apollo errors", () => {
    expect(getApolloErrorMessage(new Error("boom"))).toBe("boom");
  });

  it("returns a generic copy for unknown values", () => {
    expect(getApolloErrorMessage("nope")).toBe("Something went wrong. Please try again.");
  });
});
