import { CalendarX } from "lucide-react";
import {
  upcomingClasses,
  classTypeColors,
} from "../../../pages/member/dashboard/memberDashboardData";

export default function UpcomingClassesList() {
  return (
    <div className="bg-white border border-stroke rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-stroke">
        <p className="text-base font-semibold text-primary">Upcoming Classes</p>
        <button
          type="button"
          className="text-green text-sm hover:underline cursor-pointer"
        >
          View all
        </button>
      </div>

      {/* List */}
      {upcomingClasses.length === 0 ? (
        <div className="py-12 text-center">
          <CalendarX className="w-10 h-10 text-secondary/30 mx-auto mb-3" />
          <p className="text-primary font-medium">No upcoming classes</p>
          <p className="text-secondary text-sm mt-1">Book a class to get started</p>
          <button
            type="button"
            className="mt-4 bg-green hover:bg-green-hover text-white font-semibold px-5 py-2 rounded-lg text-sm transition-all duration-DEFAULT active:scale-95"
          >
            Book Now
          </button>
        </div>
      ) : (
        <div className="divide-y divide-stroke">
          {upcomingClasses.map((cls) => {
            const colors = classTypeColors[cls.type];
            return (
              <div
                key={cls.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-ghost transition-all duration-DEFAULT"
              >
                {/* Left */}
                <div className="flex items-center gap-4">
                  <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${colors.dot}`} />
                  <div>
                    <p className="text-primary font-semibold text-sm">{cls.name}</p>
                    <p className="text-secondary text-xs mt-0.5 flex items-center gap-1">
                      {cls.date} · {cls.time} · {cls.trainer}
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-3">
                  {cls.spotsLeft <= 2 && (
                    <span className="bg-error/10 text-error text-xs font-medium px-2 py-0.5 rounded-full">
                      {cls.spotsLeft} spot left
                    </span>
                  )}
                  <button
                    type="button"
                    className="border border-stroke text-secondary text-xs font-medium px-3 py-1.5 rounded-lg hover:border-error hover:text-error transition-all duration-DEFAULT"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
