import { timeSlots, formatTime } from "@fit-core/shared";
import type { BookableClass } from "../../../pages/member/book/bookClassData";
import { TODAY_DAY } from "../../../pages/member/book/bookClassData";
import { HOUR_HEIGHT, GRID_HEIGHT, getClassPosition } from "../../schedule/gridUtils";
import BookableClassCard from "./BookableClassCard";

const DAY_LABELS: Record<string, string> = {
  Mon: "Monday", Tue: "Tuesday", Wed: "Wednesday", Thu: "Thursday",
  Fri: "Friday", Sat: "Saturday", Sun: "Sunday",
};

const DAY_DATES: Record<string, { date: number; month: string }> = {
  Mon: { date: 17, month: "Mar" }, Tue: { date: 18, month: "Mar" },
  Wed: { date: 19, month: "Mar" }, Thu: { date: 20, month: "Mar" },
  Fri: { date: 21, month: "Mar" }, Sat: { date: 22, month: "Mar" },
  Sun: { date: 23, month: "Mar" },
};

interface BookDayViewProps {
  day:     string;
  classes: BookableClass[];
  onBook:  (gymClass: BookableClass) => void;
}

export default function BookDayView({ day, classes, onBook }: BookDayViewProps) {
  const isToday    = day === TODAY_DAY;
  const { date, month } = DAY_DATES[day] ?? { date: 0, month: "" };
  const dayClasses = classes.filter((c) => c.day === day);

  return (
    <div>
      {/* Header */}
      <div className="grid grid-cols-[80px_1fr] bg-ghost border-b border-stroke sticky top-0 z-20">
        <div className="border-r border-stroke py-3" />
        <div className="py-3 px-4">
          <p className={`text-xs font-semibold uppercase tracking-wide ${isToday ? "text-green" : "text-secondary"}`}>
            {DAY_LABELS[day]}
          </p>
          <p className={`text-sm font-bold mt-0.5 ${isToday ? "text-green" : "text-primary"}`}>
            {month} {date}, 2026
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="flex">
        {/* Time labels */}
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

        {/* Day column */}
        <div className="flex-1 relative" style={{ height: GRID_HEIGHT }}>
          {/* Hour lines */}
          {timeSlots.map((_, i) => (
            <div key={i} className="absolute left-0 right-0 border-b border-stroke pointer-events-none" style={{ top: i * HOUR_HEIGHT }} />
          ))}

          {/* Class cards */}
          {dayClasses.map((gymClass) => {
            const { top, height } = getClassPosition(gymClass.startTime, gymClass.duration);
            return (
              <div
                key={gymClass.id}
                className="absolute overflow-hidden"
                style={{ top, height, left: 2, right: 2 }}
                >
                <BookableClassCard gymClass={gymClass} onBook={onBook} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
