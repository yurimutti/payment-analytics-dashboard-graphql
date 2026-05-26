import { format, fromUnixTime } from "date-fns";
import Decimal from "decimal.js";

/**
 * Formats a Unix timestamp (seconds) into a human-readable string.
 * e.g. 1761746741 → "May 28, 2025, 14:32"
 */
export function formatDate(unixSeconds: number): string {
  return format(fromUnixTime(unixSeconds), "MMM d, yyyy, HH:mm");
}

/**
 * Converts cents to major currency units without floating-point errors,
 * then formats as a locale currency string.
 * e.g. formatAmount(4999, "EUR") → "€49.99"
 */
export function formatAmount(cents: number, currency: string): string {
  const amount = new Decimal(cents).div(100).toNumber();

  return new Intl.NumberFormat("en-EU", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

/**
 * Returns just the numeric value in major units (for charts/calculations).
 * e.g. centsToDecimal(4999) → Decimal("49.99")
 */
export function centsToDecimal(cents: number): Decimal {
  return new Decimal(cents).div(100);
}
