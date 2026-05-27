import { describe, expect, it } from "vitest";
import { centsToMajor, formatChartAmount, formatCurrency } from "./currency";

describe("formatCurrency", () => {
  it("renders 100 cents as €1.00", () => {
    expect(formatCurrency(100, "EUR")).toContain("1.00");
  });

  it("handles zero", () => {
    expect(formatCurrency(0, "EUR")).toContain("0.00");
  });

  it("groups thousands", () => {
    expect(formatCurrency(1_234_567, "EUR")).toContain("12,345.67");
  });

  it("respects the currency code", () => {
    expect(formatCurrency(100, "USD")).toMatch(/\$|USD/);
  });
});

describe("centsToMajor", () => {
  it("converts integer cents to major units without floating-point drift", () => {
    expect(centsToMajor(199).toNumber()).toBe(1.99);
    expect(centsToMajor(1).toNumber()).toBe(0.01);
  });
});

describe("formatChartAmount", () => {
  it("compacts millions and thousands", () => {
    expect(formatChartAmount(2_500_000)).toBe("€2.5M");
    expect(formatChartAmount(12_000)).toBe("€12k");
    expect(formatChartAmount(750)).toBe("€750");
  });
});
