import { type MouseEvent } from "react";
import type { GymClass } from "@fit-core/shared";
import { timeSlots, formatTime } from "@fit-core/shared";
import { ClassCard } from "./ClassCard";
import { HOUR_HEIGHT, GRID_HEIGHT, getClassPosition, positionClasses, yToTime } from "./gridUtils";

interface DayViewProps {
  day: string;
  classes: GymClass[];
  onEditClass: (id: string) => void;
  onDeleteClass: (id: string) => void;
  onAddClass: (day: string, time: string) => void;
}

const DAY_LABELS: Record<string, string> = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

const DAY_DATES: Record<string, { date: number; month: string }> = {
  Mon: { date: 17, month: "Mar" },
  Tue: { date: 18, month: "Mar" },
  Wed: { date: 19, month: "Mar" },
  Thu: { date: 20, month: "Mar" },
  Fri: { date: 21, month: "Mar" },
  Sat: { date: 22, month: "Mar" },
  Sun: { date: 23, month: "Mar" },
};

const TODAY_DAY = "Wed";

export function DayView({
  day,
  classes,
  onEditClass,
  onDeleteClass,
  onAddClass,
}: DayViewProps) {
  const isToday     = day === TODAY_DAY;
  const { date, month } = DAY_DATES[day] ?? { date: 0, month: "" };
  const dayClasses  = classes.filter((c) => c.day === day);

  function handleColumnClick(e: MouseEvent<HTMLDivElement>): void {
    const rect = e.currentTarget.getBoundingClientRect();
    onAddClass(day, yToTime(e.clientY - rect.top));
  }

  return (
    <div>
      {/* Header */}
      <div className="grid grid-cols-[80px_1fr] bg-ghost border-b border-stroke sticky top-0 z-20">
        <div className="border-r border-stroke py-3" />
        <div className="py-3 px-4">
          <p
            className={`text-xs font-semibold uppercase tracking-wide ${
              isToday ? "text-green" : "text-secondary"
            }`}
          >
            {DAY_LABELS[day]}
          </p>
          <p
            className={`text-sm font-bold mt-0.5 ${
              isToday ? "text-green" : "text-primary"
            }`}
          >
            {month} {date}, 2026
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="flex">
        {/* Time labels column */}
        <div
          className="w-20 shrink-0 relative border-r border-stroke bg-white"
          style={{ height: GRID_HEIGHT }}
        >
          {timeSlots.map((slot, i) => (
            <div key={slot}>
              <div
                className="absolute left-0 right-0 border-b border-stroke"
                style={{ top: i * HOUR_HEIGHT }}
              />
              <div
                className="absolute right-0 pr-3 text-xs text-secondary leading-none"
                style={{ top: i * HOUR_HEIGHT + 4 }}
              >
                {formatTime(slot)}
              </div>
            </div>
          ))}
        </div>

        {/* Day column */}
        <div
          className="flex-1 relative cursor-crosshair"
          style={{ height: GRID_HEIGHT }}
          onClick={handleColumnClick}
        >
          {/* Hour lines */}
          {timeSlots.map((_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0 border-b border-stroke pointer-events-none"
              style={{ top: i * HOUR_HEIGHT }}
            />
          ))}

          {/* Class cards */}
          {positionClasses(dayClasses).map((pos) => {
            const { top, height } = getClassPosition(
              pos.gymClass.startTime,
              pos.gymClass.duration,
            );
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
                <ClassCard
                  gymClass={pos.gymClass}
                  onEdit={onEditClass}
                  onDelete={onDeleteClass}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
