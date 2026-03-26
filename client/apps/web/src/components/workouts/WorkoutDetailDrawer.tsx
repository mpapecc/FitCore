import { Clock, Flame, MessageSquare, Star, X } from "lucide-react";
import type { WorkoutLog } from "@fit-core/shared";
import { workoutTypeColors } from "./workoutData";

interface WorkoutDetailDrawerProps {
  log: WorkoutLog | null;
  isOpen: boolean;
  onClose: () => void;
}

function RatingLabel({ rating }: { rating: number }) {
  if (rating === 5) return <span className="text-success text-xs font-medium">Excellent session!</span>;
  if (rating === 4) return <span className="text-success text-xs font-medium">Great session</span>;
  if (rating === 3) return <span className="text-secondary text-xs font-medium">Good session</span>;
  return <span className="text-error text-xs font-medium">Needs improvement</span>;
}

export function WorkoutDetailDrawer({ log, isOpen, onClose }: WorkoutDetailDrawerProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-DEFAULT ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-lg bg-white shadow-xl z-50 flex flex-col transition-transform duration-DEFAULT ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {log && (
          <div className="flex flex-col h-full overflow-y-auto">
            {/* Header */}
            <div className="px-6 py-4 border-b border-stroke">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-bold text-primary">{log.workoutName}</h2>
                  <div className="flex items-center mt-1">
                    <span
                      className={`${workoutTypeColors[log.type].bg} ${workoutTypeColors[log.type].border} ${workoutTypeColors[log.type].text} border rounded-full px-2.5 py-0.5 text-xs font-semibold`}
                    >
                      {log.type}
                    </span>
                    <span className="text-secondary text-sm ml-2">{log.date}</span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-secondary hover:text-primary transition-all duration-DEFAULT"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Member info strip */}
            <div className="px-6 py-3 bg-ghost border-b border-stroke">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-navy text-white text-xs font-semibold flex items-center justify-center shrink-0">
                    {log.member?.avatarInitials}
                  </div>
                  <div>
                    <p className="text-primary font-medium text-sm">{log.member?.name}</p>
                    <p className="text-secondary text-sm">{log.trainer}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <Clock size={12} className="text-secondary mr-1" />
                    <span className="text-secondary text-sm">{log.duration} min</span>
                  </div>
                  <div className="flex items-center">
                    <Flame size={12} className="text-warning mr-1" />
                    <span className="text-secondary text-sm">{log.calories} kcal</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Exercises */}
            <div className="px-6 py-5 border-b border-stroke">
              <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
                Exercises
              </p>
              <div className="grid grid-cols-4 bg-ghost rounded-lg px-3 py-2 mb-1">
                {["Exercise", "Sets", "Reps", "Weight"].map((h) => (
                  <span key={h} className="text-xs font-semibold text-secondary uppercase tracking-wide">
                    {h}
                  </span>
                ))}
              </div>
              {log.exercises?.map((exercise, i) => (
                <div
                  key={i}
                  className="grid grid-cols-4 px-3 py-2.5 border-b border-stroke last:border-0"
                >
                  <span className="text-primary text-sm font-medium">{exercise.name}</span>
                  <span className="text-secondary text-sm text-center">{exercise.sets}</span>
                  <span className="text-secondary text-sm text-center">{exercise.reps}</span>
                  <span
                    className={
                      exercise.weight === "Bodyweight"
                        ? "text-blue-600 text-sm font-medium"
                        : "text-secondary text-sm"
                    }
                  >
                    {exercise.weight}
                  </span>
                </div>
              ))}
            </div>

            {/* Trainer Notes */}
            <div className="px-6 py-5 border-b border-stroke">
              <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
                Trainer Notes
              </p>
              <div className="bg-ghost rounded-lg p-4">
                <MessageSquare size={16} className="text-secondary/40 mb-2" />
                <p className="text-primary text-sm leading-relaxed italic">{log.trainerNotes}</p>
                <p className="text-secondary text-xs mt-2">— {log.trainer}</p>
              </div>
            </div>

            {/* Member Rating */}
            <div className="px-6 py-5">
              <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
                Member Rating
              </p>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={
                      i < (log.memberRating ?? 0) ? "text-warning fill-warning" : "text-secondary/20"
                    }
                  />
                ))}
                <span className="text-secondary text-sm ml-2">{log.memberRating}/5</span>
              </div>
              <div className="mt-1">
                <RatingLabel rating={log.memberRating ?? 0} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
