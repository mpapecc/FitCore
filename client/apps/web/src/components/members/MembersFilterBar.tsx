import { Search, Plus, Download } from "lucide-react";

interface MembersFilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  planFilter: string;
  onPlanChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  trainerFilter: string;
  onTrainerChange: (value: string) => void;
  onClearFilters: () => void;
  onAddMember: () => void;
}

export function MembersFilterBar({
  search,
  onSearchChange,
  planFilter,
  onPlanChange,
  statusFilter,
  onStatusChange,
  trainerFilter,
  onTrainerChange,
  onClearFilters,
  onAddMember,
}: MembersFilterBarProps) {
  const hasActiveFilters =
    search !== "" ||
    planFilter !== "" ||
    statusFilter !== "" ||
    trainerFilter !== "";

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
          placeholder="Search name, email or phone…"
          className="border border-stroke rounded-lg pl-9 pr-3 py-2 w-64 text-primary placeholder:text-secondary text-sm focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent transition-all duration-DEFAULT"
        />
      </div>

      {/* Plan filter */}
      <select
        value={planFilter}
        onChange={(e) => onPlanChange(e.target.value)}
        className="border border-stroke rounded-lg px-3 py-2 text-primary text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent transition-all duration-DEFAULT"
      >
        <option value="">All Plans</option>
        <option value="basic">Basic</option>
        <option value="pro">Pro</option>
        <option value="elite">Elite</option>
        <option value="student">Student</option>
      </select>

      {/* Status filter */}
      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        className="border border-stroke rounded-lg px-3 py-2 text-primary text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent transition-all duration-DEFAULT"
      >
        <option value="">All Statuses</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="overdue">Overdue</option>
      </select>

      {/* Trainer filter */}
      <select
        value={trainerFilter}
        onChange={(e) => onTrainerChange(e.target.value)}
        className="border border-stroke rounded-lg px-3 py-2 text-primary text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent transition-all duration-DEFAULT"
      >
        <option value="">All Trainers</option>
        <option value="coach-alex">Coach Alex</option>
        <option value="coach-maria">Coach Maria</option>
        <option value="coach-ben">Coach Ben</option>
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

      {/* Spacer */}
      <div className="flex-1" />

      {/* Add Member */}
      <button
        onClick={onAddMember}
        className="flex items-center gap-2 bg-green text-white font-semibold px-4 py-2 rounded-lg transition-all duration-DEFAULT active:scale-95 hover:bg-green-hover"
      >
        <Plus size={16} />
        Add Member
      </button>

      <button className="flex items-center gap-2 border border-stroke text-primary hover:bg-ghost px-4 py-2 rounded-lg transition-all duration-DEFAULT text-sm font-medium">
        <Download size={16} />
        Export CSV
      </button>
    </div>
  );
}
