import { Clock, Dumbbell, TrendingUp } from "lucide-react";
import type { WorkoutLog } from "@fit-core/shared";
import { getWorkoutSummary, workoutTypeColors } from "./workoutData";

interface WorkoutSummaryCardsProps {
  logs: WorkoutLog[];
}

export default function WorkoutSummaryCards({ logs }: WorkoutSummaryCardsProps) {
  const summary = getWorkoutSummary(logs);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Card 1 — Total Workouts */}
      <div className="bg-white border border-stroke rounded-lg shadow-sm p-6 border-l-4 border-l-navy">
        <div className="flex items-start gap-4">
          <div className="bg-navy/10 rounded-full p-2 shrink-0">
            <Dumbbell className="w-5 h-5 text-navy" />
          </div>
          <div>
            <p className="text-3xl font-black text-primary tracking-tight">
              {summary.total}
            </p>
            <p className="text-sm font-medium text-secondary uppercase tracking-wide mt-1">
              Total Workouts
            </p>
            <p className="text-xs text-secondary mt-0.5">This month</p>
          </div>
        </div>
      </div>

      {/* Card 2 — Average Duration */}
      <div className="bg-white border border-stroke rounded-lg shadow-sm p-6 border-l-4 border-l-warning">
        <div className="flex items-start gap-4">
          <div className="bg-warning/10 rounded-full p-2 shrink-0">
            <Clock className="w-5 h-5 text-warning" />
          </div>
          <div>
            <p className="text-3xl font-black text-primary tracking-tight">
              {summary.avgDuration} min
            </p>
            <p className="text-sm font-medium text-secondary uppercase tracking-wide mt-1">
              Avg Duration
            </p>
            <p className="text-xs text-secondary mt-0.5">Per session</p>
          </div>
        </div>
      </div>

      {/* Card 3 — Most Popular Workout Type */}
      <div className="bg-white border border-stroke rounded-lg shadow-sm p-6 border-l-4 border-l-success">
        <div className="flex items-start gap-4">
          <div className="bg-success/10 rounded-full p-2 shrink-0">
            <TrendingUp className="w-5 h-5 text-success" />
          </div>
          <div>
            <p className={`text-3xl font-black tracking-tight ${workoutTypeColors[summary.mostPopular].text}`}>
              {summary.mostPopular}
            </p>
            <p className="text-sm font-medium text-secondary uppercase tracking-wide mt-1">
              Most Popular
            </p>
            <p className="text-xs text-secondary mt-0.5">This month</p>
          </div>
        </div>
      </div>
    </div>
  );
}
