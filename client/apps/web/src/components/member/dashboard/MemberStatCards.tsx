import { CalendarCheck, Clock, Dumbbell, Flame, TrendingUp } from "lucide-react";
import { memberStats } from "../../../pages/member/dashboard/memberDashboardData";

export default function MemberStatCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Card 1 — Workouts This Month */}
      <div className="bg-white border border-stroke rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-secondary uppercase tracking-wide">
            Workouts This Month
          </p>
          <div className="w-8 h-8 bg-green/10 rounded-full flex items-center justify-center p-1.5">
            <Dumbbell className="w-full h-full text-green" />
          </div>
        </div>
        <p className="text-4xl font-black text-primary tracking-tight mt-2">
          {memberStats.workoutsThisMonth}
        </p>
        <p className="text-success text-sm flex items-center gap-1 mt-2">
          <TrendingUp className="w-3.5 h-3.5" />
          +3 vs last month
        </p>
      </div>

      {/* Card 2 — Current Streak */}
      <div className="bg-white border border-stroke rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-secondary uppercase tracking-wide">
            Current Streak
          </p>
          <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center p-1.5">
            <Flame className="w-full h-full text-warning" />
          </div>
        </div>
        <p className="text-4xl font-black text-primary tracking-tight mt-2">
          {memberStats.currentStreak}
          <span className="text-secondary text-lg font-medium ml-1">days</span>
        </p>
        <p className="text-warning text-sm font-medium mt-2">Keep it up! 🔥</p>
      </div>

      {/* Card 3 — Next Class */}
      <div className="bg-white border border-stroke rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-secondary uppercase tracking-wide">
            Next Class
          </p>
          <div className="w-8 h-8 bg-green/10 rounded-full flex items-center justify-center p-1.5">
            <CalendarCheck className="w-full h-full text-green" />
          </div>
        </div>
        <p className="text-xl font-bold text-primary mt-2">
          {memberStats.nextClass.name}
        </p>
        <p className="text-secondary text-sm mt-1 flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {memberStats.nextClass.time} · {memberStats.nextClass.date}
        </p>
        <div className="mt-3">
          <span className="bg-green/10 text-green text-xs font-semibold px-2.5 py-1 rounded-full">
            Starting soon
          </span>
        </div>
      </div>
    </div>
  );
}
