import { ChevronLeft, ChevronRight, Clock, ClipboardList, Eye, Flame } from "lucide-react";
import { useState } from "react";
import type { WorkoutLog } from "@fit-core/shared";
import { workoutTypeColors } from "./workoutData";

const ITEMS_PER_PAGE = 5;

interface WorkoutLogsTableProps {
  logs: WorkoutLog[];
  onViewDetails: (log: WorkoutLog) => void;
}

export function WorkoutLogsTable({ logs, onViewDetails }: WorkoutLogsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(logs.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIdx = (safePage - 1) * ITEMS_PER_PAGE;
  const endIdx = Math.min(startIdx + ITEMS_PER_PAGE, logs.length);
  const pageRows = logs.slice(startIdx, endIdx);

  const pageNumbers: number[] = [];
  for (let p = Math.max(1, safePage - 1); p <= Math.min(totalPages, safePage + 1); p++) {
    pageNumbers.push(p);
  }

  const isEmpty = logs.length === 0;

  return (
    <div className="bg-white border border-stroke rounded-lg shadow-sm overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-ghost">
            {["Member", "Workout Name", "Type", "Trainer", "Duration", "Calories", "Date", "Actions"].map(
              (col) => (
                <th
                  key={col}
                  className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wide"
                >
                  {col}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {isEmpty ? (
            <tr>
              <td colSpan={8} className="py-16 text-center">
                <div className="flex flex-col items-center">
                  <ClipboardList size={48} className="text-secondary/30" />
                  <p className="text-primary font-medium mt-4">No workout logs found</p>
                  <p className="text-secondary text-sm mt-1">Try adjusting your filters</p>
                </div>
              </td>
            </tr>
          ) : (
            pageRows.map((log) => {
              const typeColor = workoutTypeColors[log.type];
              return (
                <tr
                  key={log.id}
                  className="bg-white border-b border-stroke hover:bg-ghost transition-all duration-DEFAULT"
                >
                  {/* Member */}
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-navy text-white text-xs font-semibold flex items-center justify-center shrink-0">
                        {log.member?.avatarInitials}
                      </div>
                      <span className="ml-2 text-primary font-medium text-sm">
                        {log.member?.name}
                      </span>
                    </div>
                  </td>

                  {/* Workout Name */}
                  <td className="px-6 py-4">
                    <span className="text-primary font-medium text-sm">{log.workoutName}</span>
                  </td>

                  {/* Type badge */}
                  <td className="px-6 py-4">
                    <span
                      className={`${typeColor.bg} ${typeColor.border} ${typeColor.text} border rounded-full px-2.5 py-0.5 text-xs font-semibold`}
                    >
                      {log.type}
                    </span>
                  </td>

                  {/* Trainer */}
                  <td className="px-6 py-4">
                    <span className="text-secondary text-sm">{log.trainer}</span>
                  </td>

                  {/* Duration */}
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Clock size={12} className="text-secondary mr-1" />
                      <span className="text-secondary text-sm">{log.duration} min</span>
                    </div>
                  </td>

                  {/* Calories */}
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Flame size={12} className="text-warning mr-1" />
                      <span className="text-secondary text-sm">{log.calories} kcal</span>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4">
                    <span className="text-secondary text-sm">{log.date}</span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onViewDetails(log)}
                      className="flex items-center gap-1 border border-stroke text-primary text-xs font-medium px-2.5 py-1.5 rounded-lg hover:bg-ghost hover:border-green hover:text-green transition-all duration-DEFAULT"
                    >
                      <Eye size={12} />
                      View Details
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {!isEmpty && (
        <div className="flex justify-between items-center px-6 py-4 border-t border-stroke">
          <p className="text-secondary text-sm">
            Showing {startIdx + 1}–{endIdx} of {logs.length} session{logs.length !== 1 ? "s" : ""}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(safePage - 1)}
              disabled={safePage === 1}
              className="border border-stroke rounded-lg p-2 transition-all duration-DEFAULT disabled:opacity-40 disabled:cursor-not-allowed hover:bg-ghost"
            >
              <ChevronLeft size={15} />
            </button>
            {pageNumbers.map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all duration-DEFAULT ${
                  p === safePage
                    ? "bg-navy text-white font-semibold"
                    : "text-secondary hover:bg-ghost"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(safePage + 1)}
              disabled={safePage === totalPages}
              className="border border-stroke rounded-lg p-2 transition-all duration-DEFAULT disabled:opacity-40 disabled:cursor-not-allowed hover:bg-ghost"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
