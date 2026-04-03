import { Dumbbell, BarChart2, Flame } from 'lucide-react';
import { type ProgressStats } from '../../../pages/member/progress/myProgressData';

interface ProgressStatCardsProps {
  stats: ProgressStats;
}

export function ProgressStatCards({ stats }: ProgressStatCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Card 1 — Total Workouts */}
      <div className="bg-white border border-stroke rounded-xl shadow-sm p-6 border-l-4 border-l-navy">
        <div className="flex items-start gap-4">
          <div className="bg-navy/10 text-navy rounded-full p-2">
            <Dumbbell className="w-5 h-5" />
          </div>
          <div>
            <p className="text-4xl font-black text-primary">{stats.totalWorkouts}</p>
            <p className="text-secondary text-sm uppercase tracking-wide mt-1">Total Workouts</p>
          </div>
        </div>
      </div>

      {/* Card 2 — Avg Per Week */}
      <div className="bg-white border border-stroke rounded-xl shadow-sm p-6 border-l-4 border-l-green">
        <div className="flex items-start gap-4">
          <div className="bg-green/10 text-green rounded-full p-2">
            <BarChart2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-4xl font-black text-primary">
              {stats.avgPerWeek.toFixed(1)}
              <span className="text-secondary text-lg ml-1">/ week</span>
            </p>
            <p className="text-secondary text-sm uppercase tracking-wide mt-1">Avg Workouts</p>
          </div>
        </div>
      </div>

      {/* Card 3 — Total Calories */}
      <div className="bg-white border border-stroke rounded-xl shadow-sm p-6 border-l-4 border-l-warning">
        <div className="flex items-start gap-4">
          <div className="bg-warning/10 text-warning rounded-full p-2">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <p className="text-4xl font-black text-primary">{stats.totalCalories.toLocaleString()}</p>
            <p className="text-secondary text-sm uppercase tracking-wide mt-1">Calories Burned</p>
            <p className="text-secondary text-xs">kcal total</p>
          </div>
        </div>
      </div>
    </div>
  );
}
