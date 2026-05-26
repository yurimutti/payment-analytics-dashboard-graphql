import Decimal from "decimal.js";

Decimal.set({ precision: 20, rounding: Decimal.ROUND_HALF_UP });

export function centsToMajor(cents: number): Decimal {
  return new Decimal(cents).div(100);
}

export function formatCurrency(cents: number, currency: string): string {
  const amount = centsToMajor(cents).toNumber();
  return new Intl.NumberFormat("en-EU", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatCurrencyMajor(amount: number, currency = "EUR"): string {
  return new Intl.NumberFormat("en-EU", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function centsToPreciseFloat(cents: number): number {
  return new Decimal(cents).div(100).toDecimalPlaces(2).toNumber();
}

export function formatChartAmount(value: number): string {
  if (value >= 1_000_000) return `€${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `€${(value / 1_000).toFixed(0)}k`;
  return `€${value}`;
}
