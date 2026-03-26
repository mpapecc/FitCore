import { useState } from "react";
import type { WorkoutLog } from "@fit-core/shared";
import WorkoutSummaryCards from "../../components/workouts/WorkoutSummaryCards";
import { WorkoutFilterBar } from "../../components/workouts/WorkoutFilterBar";
import { WorkoutLogsTable } from "../../components/workouts/WorkoutLogsTable";
import { WorkoutDetailDrawer } from "../../components/workouts/WorkoutDetailDrawer";
import { workoutLogs } from "../../components/workouts/workoutData";

export default function WorkoutLogsPage() {
  const [search, setSearch] = useState("");
  const [trainerFilter, setTrainerFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedLog, setSelectedLog] = useState<WorkoutLog | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const filteredLogs = workoutLogs.filter((log) => {
    const matchesSearch =
      search === "" ||
      (log.member?.name ?? "").toLowerCase().includes(search.toLowerCase());
    const matchesTrainer = trainerFilter === "" || log.trainer === trainerFilter;
    const matchesType = typeFilter === "" || log.type === typeFilter;
    const matchesDate = true;
    return matchesSearch && matchesTrainer && matchesType && matchesDate;
  });

  const handleViewDetails = (log: WorkoutLog) => {
    setSelectedLog(log);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedLog(null), 300);
  };

  const handleClearFilters = () => {
    setSearch("");
    setTrainerFilter("");
    setTypeFilter("");
    setDateFrom("");
    setDateTo("");
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Workout Logs</h1>
          <p className="text-secondary text-sm mt-0.5">
            Track and review member workout sessions
          </p>
        </div>
        <div className="bg-ghost px-3 py-1.5 rounded-lg border border-stroke">
          <span className="text-secondary text-sm">
            {workoutLogs.length} sessions logged
          </span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mb-6">
        <WorkoutSummaryCards logs={filteredLogs} />
      </div>

      {/* Filter Bar */}
      <div className="mb-4">
        <WorkoutFilterBar
          search={search}
          onSearchChange={setSearch}
          trainerFilter={trainerFilter}
          onTrainerChange={setTrainerFilter}
          typeFilter={typeFilter}
          onTypeChange={setTypeFilter}
          dateFrom={dateFrom}
          onDateFromChange={setDateFrom}
          dateTo={dateTo}
          onDateToChange={setDateTo}
          onClearFilters={handleClearFilters}
        />
      </div>

      {/* Table */}
      <WorkoutLogsTable logs={filteredLogs} onViewDetails={handleViewDetails} />

      {/* Detail Drawer */}
      <WorkoutDetailDrawer
        log={selectedLog}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </div>
  );
}
