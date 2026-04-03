import { CheckCircle, Clock } from "lucide-react";
import type { BookableClass } from "../../../pages/member/book/bookClassData";
import { classTypeColors } from "../../../pages/member/book/bookClassData";

interface BookableClassCardProps {
  gymClass: BookableClass;
  onBook:   (gymClass: BookableClass) => void;
}

function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return m === 0 ? `${hour} ${period}` : `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

export default function BookableClassCard({ gymClass, onBook }: BookableClassCardProps) {
  const { status, type, spotsLeft } = gymClass;
  const colors = classTypeColors[type];

  const cardClass = (() => {
    if (status === "Full")
      return "bg-ghost border-stroke opacity-60 cursor-not-allowed";
    if (status === "Booked")
      return `${colors.bg} border-green`;
    // Available or AlmostFull
    return `${colors.bg} ${colors.border} hover:shadow-md hover:scale-[1.01] cursor-pointer`;
  })();

  return (
    <div className={`w-full h-full rounded-lg border p-2.5 text-left relative transition duration-DEFAULT overflow-hidden ${cardClass}`}>
      {/* Amber strip for AlmostFull */}
      {status === "AlmostFull" && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-warning rounded-t-lg" />
      )}

      {/* Row 1: dot + name + status indicator */}
      <div className="flex justify-between items-start gap-1">
        <div className="flex items-center gap-1.5 min-w-0">
          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${colors.dot}`} />
          <span className={`text-xs font-semibold truncate ${colors.text}`}>
            {gymClass.name}
          </span>
        </div>
        <div className="flex-shrink-0">
          {status === "Full" && (
            <span className="bg-stroke text-secondary text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase">
              Full
            </span>
          )}
          {status === "Booked" && (
            <CheckCircle className="w-4 h-4 text-green" />
          )}
          {status === "AlmostFull" && (
            <span className="text-warning text-[10px] font-bold">
              {spotsLeft} left
            </span>
          )}
        </div>
      </div>

      {/* Row 2: trainer */}
      <p className="text-[11px] text-secondary mt-0.5 truncate">{gymClass.trainer}</p>

      {/* Row 3: time + duration */}
      <div className="flex justify-between items-center mt-1.5">
        <span className="flex items-center gap-0.5 text-[11px] text-secondary">
          <Clock className="w-2.5 h-2.5" />
          {formatTime(gymClass.startTime)}
        </span>
        <span className="text-[11px] text-secondary">{gymClass.duration}m</span>
      </div>

      {/* Row 4: button */}
      {(status === "Available" || status === "AlmostFull") && (
        <div className="mt-2">
          {status === "AlmostFull" && (
            <p className="text-[10px] text-warning font-medium mb-1">
              ⚠ Only {spotsLeft} spot{spotsLeft === 1 ? "" : "s"} left!
            </p>
          )}
          <button
            type="button"
            onClick={() => onBook(gymClass)}
            className="w-full bg-green hover:bg-green-hover text-white text-[11px] font-semibold py-1 rounded transition-all duration-DEFAULT active:scale-95"
          >
            Book
          </button>
        </div>
      )}

      {status === "Booked" && (
        <div className="mt-2">
          <div className="w-full bg-green/10 text-green text-[11px] font-semibold py-1 rounded border border-green/20 text-center cursor-default">
            Booked ✓
          </div>
        </div>
      )}
    </div>
  );
}
