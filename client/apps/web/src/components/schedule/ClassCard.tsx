import { Clock, Users } from "lucide-react";
import type { GymClass } from "@fit-core/shared";
import { isClassFull } from "@fit-core/shared";
import { classTypeColors } from "./scheduleData";

interface ClassCardProps {
  gymClass: GymClass;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ClassCard({ gymClass, onEdit, onDelete }: ClassCardProps) {
  const colors = classTypeColors[gymClass.type];
  const full = isClassFull(gymClass);

  return (
    <div
      onClick={() => onEdit(gymClass.id)}
      className={[
        "group relative w-full h-full overflow-hidden rounded-lg border p-2 cursor-pointer shadow-sm hover:shadow-md transition-all duration-DEFAULT",
        colors.bg,
        colors.border,
        full ? "opacity-60" : "",
      ].join(" ")}
    >
      {/* Full badge */}
      {full && (
        <span className="absolute top-1 right-1 bg-error/10 text-error text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase">
          Full
        </span>
      )}

      {/* Top row: dot + class name */}
      <div className="flex items-center gap-1.5 pr-6">
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${colors.dot}`} />
        <span className={`text-xs font-semibold truncate ${colors.text}`}>
          {gymClass.name}
        </span>
      </div>

      {/* Trainer */}
      <p className="text-xs text-secondary mt-0.5 truncate">
        {gymClass.trainer}
      </p>

      {/* Bottom row: duration + capacity */}
      <div className="flex justify-between items-center mt-1">
        <div className="flex items-center gap-1 text-secondary">
          <Clock size={10} className="shrink-0" />
          <span className="text-xs">{gymClass.duration} min</span>
        </div>
        <div className="flex items-center gap-1">
          <Users size={10} className="shrink-0 text-secondary" />
          <span
            className={`text-xs ${full ? "text-error font-semibold" : "text-secondary"}`}
          >
            {gymClass.booked}/{gymClass.capacity}
          </span>
        </div>
      </div>

      {/* Hover quick actions */}
      <div className="flex gap-1 justify-end mt-1">
        <button
          onClick={() => onEdit(gymClass.id)}
          className="text-[10px] bg-white border border-stroke text-primary px-1.5 py-0.5 rounded hover:bg-ghost transition-all duration-DEFAULT opacity-0 group-hover:opacity-100"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(gymClass.id)}
          className="text-[10px] bg-white border border-error text-error px-1.5 py-0.5 rounded hover:bg-error/10 transition-all duration-DEFAULT opacity-0 group-hover:opacity-100"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
