import { ApolloError } from "@apollo/client";
import { describe, expect, it } from "vitest";
import { getApolloErrorMessage } from "./apollo-error";

describe("getApolloErrorMessage", () => {
  it("returns the first GraphQL error message when present", () => {
    const error = new ApolloError({
      graphQLErrors: [
        { message: "Charge not found" } as never,
        { message: "Second error" } as never,
      ],
    });
    expect(getApolloErrorMessage(error)).toBe("Charge not found");
  });

  it("returns invalid-response copy for ServerParseError shape", () => {
    const error = new ApolloError({
      networkError: Object.assign(new Error("parse"), { bodyText: "<html>not json</html>" }),
    });
    expect(getApolloErrorMessage(error)).toBe("The server returned an invalid response.");
  });

  it("returns unavailable copy for ServerError shape", () => {
    const error = new ApolloError({
      networkError: Object.assign(new Error("502"), { statusCode: 502 }),
    });
    expect(getApolloErrorMessage(error)).toBe("The server is unavailable. Please try again.");
  });

  it("falls back to networkError.message for plain network errors", () => {
    const error = new ApolloError({
      networkError: new Error("Connection refused"),
    });
    expect(getApolloErrorMessage(error)).toBe("Connection refused");
  });

  it("surfaces plain Error.message for non-Apollo errors", () => {
    expect(getApolloErrorMessage(new Error("boom"))).toBe("boom");
  });

  it("returns a generic copy for unknown values", () => {
    expect(getApolloErrorMessage("nope")).toBe("Something went wrong. Please try again.");
  });
});
