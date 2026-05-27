import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { formatUnixDate, formatUnixShortDate, timeAgo, unixToISODate } from "./date";

// 2023-11-14T22:13:20Z
const FIXED_UNIX = 1700000000;

describe("formatUnixDate", () => {
  it("formats with the default pattern", () => {
    expect(formatUnixDate(FIXED_UNIX)).toBe("Nov 14, 2023, 22:13");
  });

  it("respects a custom pattern", () => {
    expect(formatUnixDate(FIXED_UNIX, "yyyy-MM-dd")).toBe("2023-11-14");
  });
});

describe("unixToISODate", () => {
  it("converts a unix timestamp to a YYYY-MM-DD string", () => {
    expect(unixToISODate(FIXED_UNIX)).toBe("2023-11-14");
  });
});

describe("formatUnixShortDate", () => {
  it("renders 'MMM d, yyyy'", () => {
    expect(formatUnixShortDate(FIXED_UNIX)).toBe("Nov 14, 2023");
  });
});

describe("timeAgo", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2023-11-15T22:13:20Z"));
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("describes a timestamp 1 day in the past", () => {
    expect(timeAgo(FIXED_UNIX)).toBe("1 day ago");
  });
});
