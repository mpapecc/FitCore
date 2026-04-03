import { Clock, Flame, User } from "lucide-react";
import {
  recentWorkouts,
  classTypeColors,
} from "../../../pages/member/dashboard/memberDashboardData";

export default function RecentWorkouts() {
  return (
    <div>
      {/* Section header */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-base font-semibold text-primary">Recent Workouts</p>
        <button
          type="button"
          className="text-green text-sm hover:underline cursor-pointer"
        >
          View all
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recentWorkouts.map((workout) => {
          const colors = classTypeColors[workout.type] ?? {
            bg: "bg-gray-50",
            text: "text-secondary",
            dot: "bg-secondary",
          };
          const trainerFirstName = workout.trainer.split(" ")[0];

          return (
            <div
              key={workout.id}
              className="bg-white border border-stroke rounded-xl shadow-sm p-5 hover:shadow-md transition-all duration-DEFAULT"
            >
              {/* Top row */}
              <div className="flex justify-between items-start">
                <div>
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${colors.bg} ${colors.text}`}
                  >
                    {workout.type}
                  </span>
                  <p className="text-primary font-bold mt-2">{workout.name}</p>
                </div>
                <p className="text-secondary text-xs">{workout.date}</p>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-stroke">
                <div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-secondary" />
                    <p className="text-primary font-bold text-sm">{workout.duration} min</p>
                  </div>
                  <p className="text-secondary text-xs mt-0.5 uppercase tracking-wide">Duration</p>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <Flame className="w-3 h-3 text-warning" />
                    <p className="text-primary font-bold text-sm">{workout.calories}</p>
                  </div>
                  <p className="text-secondary text-xs mt-0.5 uppercase tracking-wide">Calories</p>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3 text-secondary" />
                    <p className="text-primary font-bold text-sm">{trainerFirstName}</p>
                  </div>
                  <p className="text-secondary text-xs mt-0.5 uppercase tracking-wide">Trainer</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
