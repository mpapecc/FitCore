import { Search } from "lucide-react";
import type { ClassType } from "@fit-core/shared";
import { classTypeColors } from "./scheduleData";

interface ScheduleFilterBarProps {
  trainerFilter: string;
  onTrainerChange: (value: string) => void;
  classTypeFilter: string;
  onClassTypeChange: (value: string) => void;
  classNameSearch: string;
  onClassNameSearchChange: (value: string) => void;
  onClearFilters: () => void;
}

const CLASS_TYPES = Object.keys(classTypeColors) as ClassType[];

export function ScheduleFilterBar({
  trainerFilter,
  onTrainerChange,
  classTypeFilter,
  onClassTypeChange,
  classNameSearch,
  onClassNameSearchChange,
  onClearFilters,
}: ScheduleFilterBarProps) {
  const hasActiveFilters =
    trainerFilter !== "" || classTypeFilter !== "" || classNameSearch !== "";

  return (
    <div className="bg-white border border-stroke rounded-lg p-4 flex gap-3 items-center flex-wrap">
      {/* Search */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none"
        />
        <input
          type="text"
          value={classNameSearch}
          onChange={(e) => onClassNameSearchChange(e.target.value)}
          placeholder="Search classes..."
          className="border border-stroke rounded-lg pl-9 pr-3 py-2 w-64 text-primary placeholder:text-secondary text-sm focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent transition-all duration-DEFAULT"
        />
      </div>

      {/* Trainer filter */}
      <select
        value={trainerFilter}
        onChange={(e) => onTrainerChange(e.target.value)}
        className="border border-stroke rounded-lg px-3 py-2 text-primary text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent transition-all duration-DEFAULT"
      >
        <option value="">All Trainers</option>
        <option value="James Carter">James Carter</option>
        <option value="Coach Maria">Coach Maria</option>
        <option value="Coach Ben">Coach Ben</option>
      </select>

      {/* Class Type filter */}
      <select
        value={classTypeFilter}
        onChange={(e) => onClassTypeChange(e.target.value)}
        className="border border-stroke rounded-lg px-3 py-2 text-primary text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent transition-all duration-DEFAULT"
      >
        <option value="">All Types</option>
        {CLASS_TYPES.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={onClearFilters}
          className="text-secondary hover:text-primary text-sm transition-all duration-DEFAULT"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}
