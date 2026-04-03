import { Search } from "lucide-react";

interface BookClassFilterBarProps {
  search:          string;
  onSearchChange:  (v: string) => void;
  typeFilter:      string;
  onTypeChange:    (v: string) => void;
  trainerFilter:   string;
  onTrainerChange: (v: string) => void;
  dateFilter:      string;
  onDateChange:    (v: string) => void;
  onClearFilters:  () => void;
}

const selectClass =
  "border border-stroke rounded-lg px-3 py-2 text-primary text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent transition-all duration-DEFAULT";

export default function BookClassFilterBar({
  search,
  onSearchChange,
  typeFilter,
  onTypeChange,
  trainerFilter,
  onTrainerChange,
  dateFilter,
  onDateChange,
  onClearFilters,
}: BookClassFilterBarProps) {
  const hasActiveFilters =
    search !== "" || typeFilter !== "" || trainerFilter !== "" || dateFilter !== "";

  return (
    <div className="bg-white border border-stroke rounded-lg p-4 flex gap-3 items-center flex-wrap mb-4">
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
          placeholder="Search classes..."
          className="border border-stroke rounded-lg pl-9 pr-3 py-2 w-52 text-primary placeholder:text-secondary text-sm focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent transition-all duration-DEFAULT"
        />
      </div>

      {/* Type filter */}
      <select value={typeFilter} onChange={(e) => onTypeChange(e.target.value)} className={selectClass}>
        <option value="">All Types</option>
        <option value="Yoga">Yoga</option>
        <option value="HIIT">HIIT</option>
        <option value="Pilates">Pilates</option>
        <option value="Cycling">Cycling</option>
        <option value="Strength">Strength</option>
      </select>

      {/* Trainer filter */}
      <select value={trainerFilter} onChange={(e) => onTrainerChange(e.target.value)} className={selectClass}>
        <option value="">All Trainers</option>
        <option value="James Carter">James Carter</option>
        <option value="Coach Maria">Coach Maria</option>
        <option value="Coach Ben">Coach Ben</option>
      </select>

      {/* Date filter */}
      <input
        type="date"
        value={dateFilter}
        onChange={(e) => onDateChange(e.target.value)}
        className={selectClass}
      />

      {/* Clear filters */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={onClearFilters}
          className="text-secondary hover:text-primary text-sm transition-all duration-DEFAULT"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}
