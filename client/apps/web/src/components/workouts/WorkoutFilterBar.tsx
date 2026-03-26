import { Search } from "lucide-react";

interface WorkoutFilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  trainerFilter: string;
  onTrainerChange: (value: string) => void;
  typeFilter: string;
  onTypeChange: (value: string) => void;
  dateFrom: string;
  onDateFromChange: (value: string) => void;
  dateTo: string;
  onDateToChange: (value: string) => void;
  onClearFilters: () => void;
}

export function WorkoutFilterBar({
  search,
  onSearchChange,
  trainerFilter,
  onTrainerChange,
  typeFilter,
  onTypeChange,
  dateFrom,
  onDateFromChange,
  dateTo,
  onDateToChange,
  onClearFilters,
}: WorkoutFilterBarProps) {
  const hasActiveFilters =
    search !== "" ||
    trainerFilter !== "" ||
    typeFilter !== "" ||
    dateFrom !== "" ||
    dateTo !== "";

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
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search member name..."
          className="border border-stroke rounded-lg pl-9 pr-3 py-2 w-52 text-primary placeholder:text-secondary text-sm focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent transition-all duration-DEFAULT"
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

      {/* Type filter */}
      <select
        value={typeFilter}
        onChange={(e) => onTypeChange(e.target.value)}
        className="border border-stroke rounded-lg px-3 py-2 text-primary text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent transition-all duration-DEFAULT"
      >
        <option value="">All Types</option>
        <option value="Strength">Strength</option>
        <option value="Cardio">Cardio</option>
        <option value="Flexibility">Flexibility</option>
        <option value="HIIT">HIIT</option>
      </select>

      {/* Date range */}
      <div className="flex items-center gap-2">
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => onDateFromChange(e.target.value)}
          className="border border-stroke rounded-lg px-3 py-2 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent transition-all duration-DEFAULT"
        />
        <span className="text-secondary text-sm">–</span>
        <input
          type="date"
          value={dateTo}
          onChange={(e) => onDateToChange(e.target.value)}
          className="border border-stroke rounded-lg px-3 py-2 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent transition-all duration-DEFAULT"
        />
      </div>

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
