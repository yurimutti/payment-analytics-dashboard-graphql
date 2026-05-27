import {
  endOfDay,
  format,
  formatDistanceToNow,
  fromUnixTime,
  isWithinInterval,
  startOfDay,
  subDays,
} from "date-fns";

export type { Interval } from "date-fns";

export function formatUnixDate(unixSeconds: number, pattern = "MMM d, yyyy, HH:mm"): string {
  return format(fromUnixTime(unixSeconds), pattern);
}

export function formatUnixShortDate(unixSeconds: number): string {
  return format(fromUnixTime(unixSeconds), "MMM d, yyyy");
}

export function formatISODate(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function unixToISODate(unixSeconds: number): string {
  return format(fromUnixTime(unixSeconds), "yyyy-MM-dd");
}

export function daysAgo(n: number): Date {
  return subDays(new Date(), n);
}

export function isUnixInRange(unixSeconds: number, from: Date, to: Date): boolean {
  const d = fromUnixTime(unixSeconds);
  return isWithinInterval(d, { start: startOfDay(from), end: endOfDay(to) });
}

export function formatChartDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function formatChartTick(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

/**
 * Returns a human-readable "time ago" string from a Unix timestamp.
 * e.g. 1761746741 → "2 hours ago"
 */
export function timeAgo(unixSeconds: number): string {
  return formatDistanceToNow(fromUnixTime(unixSeconds), { addSuffix: true });
}
