import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Calendar, type DateRange } from "@/shared/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

interface DateRangePickerProps {
  value: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
  onClear: () => void;
}

export function DateRangePicker({ value, onChange, onClear }: DateRangePickerProps) {
  const label = value?.from
    ? value.to
      ? `${format(value.from, "MMM d")} – ${format(value.to, "MMM d, yyyy")}`
      : format(value.from, "MMM d, yyyy")
    : "Pick a date range";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 text-xs font-normal cursor-pointer">
          <CalendarIcon className="h-3.5 w-3.5 mr-2" />
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <Calendar mode="range" selected={value} onSelect={onChange} numberOfMonths={2} autoFocus />
        {value?.from && (
          <div className="border-t p-2 flex justify-end">
            <Button variant="ghost" size="sm" className="text-xs cursor-pointer" onClick={onClear}>
              <X className="h-3 w-3 mr-1" />
              Clear
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
