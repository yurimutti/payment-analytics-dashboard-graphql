import type * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

import { cn } from "@/shared/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

// Remap react-day-picker CSS variables to our shadcn theme tokens.
// Default rdp uses `blue` for accent — we use our `primary` / `accent`.
const themeStyle = {
  "--rdp-accent-color": "var(--primary)",
  "--rdp-accent-background-color": "var(--accent)",
  "--rdp-range_middle-background-color": "var(--accent)",
  "--rdp-range_middle-color": "var(--accent-foreground)",
  "--rdp-range_start-color": "var(--primary-foreground)",
  "--rdp-range_start-background": "var(--primary)",
  "--rdp-range_end-color": "var(--primary-foreground)",
  "--rdp-range_end-background": "var(--primary)",
  "--rdp-selected-border": "none",
  "--rdp-today-color": "var(--primary)",
  "--rdp-day_button-border": "none",
} as React.CSSProperties;

function Calendar({ className, classNames, ...props }: CalendarProps) {
  return (
    <DayPicker
      style={themeStyle}
      className={cn("p-3", className)}
      classNames={{
        // ensure selected days have visible text on our primary color
        selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-md",
        range_start: "bg-primary text-primary-foreground rounded-l-md rounded-r-none",
        range_end: "bg-primary text-primary-foreground rounded-r-md rounded-l-none",
        range_middle: "bg-accent text-accent-foreground rounded-none",
        today: "font-semibold text-primary",
        outside: "text-muted-foreground opacity-50",
        disabled: "text-muted-foreground opacity-50",
        ...classNames,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
