import { useState } from 'react';
import { Clock, Flame, ChevronDown, ChevronUp } from 'lucide-react';
import {
  type WorkoutHistoryEntry,
  workoutTypeBadge,
} from '../../../pages/member/progress/myProgressData';

interface WorkoutHistoryTableProps {
  entries: WorkoutHistoryEntry[];
}

export function WorkoutHistoryTable({ entries }: WorkoutHistoryTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div className="bg-white border border-stroke rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-stroke">
        <p className="text-base font-semibold text-primary">Workout History</p>
        <span className="bg-ghost text-secondary text-xs font-bold px-2 py-0.5 rounded-full">
          {entries.length} sessions
        </span>
      </div>

      {/* Table */}
      <table className="w-full">
        <thead>
          <tr className="bg-ghost text-secondary text-xs font-semibold uppercase tracking-wide">
            <th className="px-6 py-3 text-left">Date</th>
            <th className="px-6 py-3 text-left">Workout</th>
            <th className="px-6 py-3 text-left">Type</th>
            <th className="px-6 py-3 text-left">Duration</th>
            <th className="px-6 py-3 text-left">Calories</th>
            <th className="px-6 py-3 text-left">Trainer</th>
            <th className="px-6 py-3 text-left" />
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => {
            const badge = workoutTypeBadge[entry.type];
            const isExpanded = expandedId === entry.id;

            return (
              <>
                <tr
                  key={entry.id}
                  className="bg-white border-b border-stroke hover:bg-ghost duration-DEFAULT"
                >
                  <td className="px-6 py-4 text-secondary text-sm">{entry.date}</td>
                  <td className="px-6 py-4 text-primary font-medium text-sm">{entry.name}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold border ${badge.bg} ${badge.text} ${badge.border}`}>
                      {entry.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1 text-secondary text-sm">
                      <Clock className="w-3 h-3" />
                      {entry.duration} min
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1 text-secondary text-sm">
                      <Flame className="w-3 h-3 text-warning" />
                      {entry.calories}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-secondary text-sm">{entry.trainer}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleExpand(entry.id)}
                      className="text-secondary hover:text-primary duration-DEFAULT"
                    >
                      {isExpanded
                        ? <ChevronUp className="w-4 h-4" />
                        : <ChevronDown className="w-4 h-4" />
                      }
                    </button>
                  </td>
                </tr>
                {isExpanded && (
                  <tr key={`${entry.id}-detail`} className="bg-ghost border-b border-stroke">
                    <td colSpan={7} className="px-6 py-4">
                      <p className="text-secondary text-sm italic">
                        No exercise details recorded
                      </p>
                    </td>
                  </tr>
                )}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
