import { type MouseEvent, type ReactNode } from "react";
import { days, timeSlots, formatTime } from "@fit-core/shared";
import {
  HOUR_HEIGHT,
  GRID_HEIGHT,
  getClassPosition,
  positionClasses,
  yToTime,
} from "./gridUtils";

interface ClassBase {
  id: string;
  day: string;
  startTime: string;
  duration: number;
}

interface CalendarGridProps<T extends ClassBase> {
  classes: T[];
  /** Render the card content for a given class */
  renderCard: (gymClass: T) => ReactNode;
  /** Enable side-by-side overlap layout (admin use) */
  enableOverlap?: boolean;
  /** Called when an empty column area is clicked (admin use) */
  onColumnClick?: (day: string, time: string) => void;
}

// Week of Mar 17–23, Wednesday is today
const DAY_DATES: Record<string, { date: number; month: string }> = {
  Mon: { date: 17, month: "Mar" }, Tue: { date: 18, month: "Mar" },
  Wed: { date: 19, month: "Mar" }, Thu: { date: 20, month: "Mar" },
  Fri: { date: 21, month: "Mar" }, Sat: { date: 22, month: "Mar" },
  Sun: { date: 23, month: "Mar" },
};
const TODAY_DAY = "Wed";

export function CalendarGrid<T extends ClassBase>({
  classes,
  renderCard,
  enableOverlap = false,
  onColumnClick,
}: CalendarGridProps<T>) {
  function handleColumnClick(e: MouseEvent<HTMLDivElement>, day: string): void {
    if (!onColumnClick) return;
    const rect = e.currentTarget.getBoundingClientRect();
    onColumnClick(day, yToTime(e.clientY - rect.top));
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[900px]">
        {/* ── Day header row ── */}
        <div className="grid grid-cols-[80px_repeat(7,1fr)] sticky top-0 z-20 bg-ghost">
          <div className="border-b border-r border-stroke" />
          {days.map((day) => {
            const isToday = day === TODAY_DAY;
            const { date, month } = DAY_DATES[day];
            return (
              <div
                key={day}
                className="border-b border-r border-stroke py-3 px-2 text-center bg-white"
              >
                <p className={`text-xs font-semibold uppercase tracking-wide ${isToday ? "text-green" : "text-secondary"}`}>
                  {day}
                </p>
                {isToday ? (
                  <div className="w-8 h-8 rounded-full bg-green text-white mx-auto flex items-center justify-center mt-0.5">
                    <span className="text-sm font-bold leading-none">{date}</span>
                  </div>
                ) : (
                  <>
                    <p className="text-[10px] text-secondary">{month}</p>
                    <p className="text-sm font-bold text-primary leading-tight">{date}</p>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Grid body ── */}
        <div className="flex">
          {/* Time labels column */}
          <div className="w-20 shrink-0 relative border-r border-stroke bg-white" style={{ height: GRID_HEIGHT }}>
            {timeSlots.map((slot, i) => (
              <div key={slot}>
                <div className="absolute left-0 right-0 border-b border-stroke" style={{ top: i * HOUR_HEIGHT }} />
                <div className="absolute right-0 pr-3 text-xs text-secondary leading-none" style={{ top: i * HOUR_HEIGHT + 4 }}>
                  {formatTime(slot)}
                </div>
              </div>
            ))}
          </div>

          {/* Day columns */}
          <div className="flex-1 grid grid-cols-7">
            {days.map((day) => {
              const dayClasses = classes.filter((c) => c.day === day);
              return (
                <div
                  key={day}
                  className={`relative border-r border-stroke ${onColumnClick ? "cursor-crosshair" : ""}`}
                  style={{ height: GRID_HEIGHT }}
                  onClick={onColumnClick ? (e) => handleColumnClick(e, day) : undefined}
                >
                  {/* Hour grid lines */}
                  {timeSlots.map((_, i) => (
                    <div
                      key={i}
                      className="absolute left-0 right-0 border-b border-stroke pointer-events-none"
                      style={{ top: i * HOUR_HEIGHT }}
                    />
                  ))}

                  {/* Class cards */}
                  {enableOverlap
                    ? positionClasses(dayClasses).map((pos) => {
                        const { top, height } = getClassPosition(pos.gymClass.startTime, pos.gymClass.duration);
                        const colW = 100 / pos.totalColumns;
                        return (
                          <div
                            key={pos.gymClass.id}
                            className="absolute overflow-hidden"
                            style={{
                              top,
                              height,
                              left:  `calc(${pos.column * colW}% + 2px)`,
                              right: `calc(${(pos.totalColumns - pos.column - 1) * colW}% + 2px)`,
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {renderCard(pos.gymClass)}
                          </div>
                        );
                      })
                    : dayClasses.map((gymClass) => {
                        const { top, height } = getClassPosition(gymClass.startTime, gymClass.duration);
                        return (
                          <div
                            key={gymClass.id}
                            className="absolute overflow-hidden"
                            style={{ top, height, left: 2, right: 2 }}
                          >
                            {renderCard(gymClass)}
                          </div>
                        );
                      })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
