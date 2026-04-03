import type { GymClass } from "@fit-core/shared";
import { CalendarGrid } from "./CalendarGrid";
import { ClassCard } from "./ClassCard";

interface ScheduleGridProps {
  classes: GymClass[];
  onEditClass: (id: string) => void;
  onDeleteClass: (id: string) => void;
  onAddClass: (day: string, time: string) => void;
}

export function ScheduleGrid({
  classes,
  onEditClass,
  onDeleteClass,
  onAddClass,
}: ScheduleGridProps) {
  return (
    <CalendarGrid
      classes={classes}
      enableOverlap
      onColumnClick={onAddClass}
      renderCard={(gymClass) => (
        <ClassCard gymClass={gymClass} onEdit={onEditClass} onDelete={onDeleteClass} />
      )}
    />
  );
}
