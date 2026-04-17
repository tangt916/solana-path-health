import { useMemo, useState, useEffect } from "react";
import { Star, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  getMockAvailability,
  getMockProviders,
  getAvailableDates,
  type TimeSlot,
} from "@/lib/mock-calendar";

interface MockCalendarProps {
  /** Initially-selected slot, used when the user comes back to the step. */
  initialSlot?: TimeSlot | null;
  /** Fired whenever the user picks (or unpicks) a slot. */
  onSlotSelected?: (slot: TimeSlot | null) => void;
  /** Fired when the user clicks the bottom "Confirm this time" CTA. */
  onConfirm?: (slot: TimeSlot) => void;
  /** Hide the confirm strip if the parent supplies its own bottom action. */
  hideConfirm?: boolean;
  className?: string;
}

export const MockCalendar = ({
  initialSlot,
  onSlotSelected,
  onConfirm,
  hideConfirm,
  className,
}: MockCalendarProps) => {
  const slots = useMemo(() => getMockAvailability(), []);
  const dates = useMemo(() => getAvailableDates(slots), [slots]);
  const provider = getMockProviders()[0];

  const firstAvailableDate =
    dates.find((d) => d.hasAvailability)?.date ?? dates[0]?.date ?? "";

  const [selectedDate, setSelectedDate] = useState<string>(
    initialSlot?.date ?? firstAvailableDate
  );
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(
    initialSlot ?? null
  );

  // Keep parent in sync when slot changes (without re-firing on initial mount).
  useEffect(() => {
    onSlotSelected?.(selectedSlot);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSlot]);

  const slotsForDate = useMemo(
    () => slots.filter((s) => s.date === selectedDate),
    [slots, selectedDate]
  );

  const hasAnyAvailable = slotsForDate.some((s) => s.available);

  return (
    <div className={cn("space-y-6", className)}>
      {/* Provider card */}
      <div className="flex items-center gap-4 bg-card border border-border rounded-xl p-4">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-base font-medium text-primary-foreground shrink-0 bg-primary"
          aria-hidden="true"
        >
          {provider.avatar}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-foreground text-sm sm:text-base">
            {provider.name}, {provider.title}
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {provider.specialty}
          </p>
          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
            <Star className="w-3 h-3 fill-current text-amber-500" />
            <span>
              {provider.rating} · {provider.patientCount} patients
            </span>
          </p>
        </div>
      </div>

      {/* Date pills */}
      <div>
        <p className="text-sm font-medium text-foreground mb-2">Pick a date</p>
        <div
          className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-thin"
          role="radiogroup"
          aria-label="Available dates"
        >
          {dates.map((d) => {
            const isSelected = selectedDate === d.date;
            const disabled = !d.hasAvailability;
            return (
              <button
                key={d.date}
                type="button"
                role="radio"
                aria-checked={isSelected}
                disabled={disabled}
                onClick={() => {
                  setSelectedDate(d.date);
                  // clear slot if date changed
                  if (selectedSlot && selectedSlot.date !== d.date) {
                    setSelectedSlot(null);
                  }
                }}
                className={cn(
                  "shrink-0 flex flex-col items-center justify-center w-14 h-16 rounded-lg border text-xs transition-all",
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground hover:border-primary/50",
                  disabled && "opacity-40 cursor-not-allowed hover:border-border"
                )}
              >
                <span className="text-[11px] uppercase tracking-wide">
                  {d.dayAbbrev}
                </span>
                <span className="text-lg font-medium leading-none mt-0.5">
                  {d.dayNumber}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time slots grid */}
      <div>
        <p className="text-sm font-medium text-foreground mb-2">
          Available times
        </p>
        {!hasAnyAvailable ? (
          <p className="text-sm text-muted-foreground bg-muted/40 border border-border rounded-lg p-4 text-center">
            No availability on this date — try another day.
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {slotsForDate.map((s) => {
              const isSelected =
                selectedSlot?.date === s.date && selectedSlot?.time === s.time;
              return (
                <button
                  key={`${s.date}-${s.time}`}
                  type="button"
                  disabled={!s.available}
                  onClick={() => setSelectedSlot(s)}
                  className={cn(
                    "h-10 rounded-md border text-sm font-medium transition-all",
                    s.available && !isSelected &&
                      "border-border bg-card text-foreground hover:border-primary",
                    isSelected &&
                      "border-primary bg-primary text-primary-foreground",
                    !s.available &&
                      "border-border bg-muted/40 text-muted-foreground line-through cursor-not-allowed"
                  )}
                >
                  {s.time}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Confirmation strip */}
      {!hideConfirm && selectedSlot && (
        <div className="sticky bottom-4 bg-card border border-border rounded-xl p-4 shadow-lg flex flex-col sm:flex-row sm:items-center gap-3 animate-in slide-in-from-bottom-4">
          <div className="flex-1 flex items-center gap-2 text-sm text-foreground min-w-0">
            <CalendarIcon className="w-4 h-4 shrink-0 text-primary" />
            <span className="truncate">
              {selectedSlot.providerName.split(" ").slice(0, 2).join(" ")} ·{" "}
              {selectedSlot.dayAbbrev} {selectedSlot.displayDate.split(", ")[1]} ·{" "}
              {selectedSlot.time}
            </span>
          </div>
          <Button
            onClick={() => onConfirm?.(selectedSlot)}
            className="w-full sm:w-auto"
          >
            Confirm this time →
          </Button>
        </div>
      )}
    </div>
  );
};
