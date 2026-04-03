import MemberStatCards     from "../../components/member/dashboard/MemberStatCards";
import WeeklyActivityChart from "../../components/member/dashboard/WeeklyActivityChart";
import UpcomingClassesList from "../../components/member/dashboard/UpcomingClassesList";
import RecentWorkouts      from "../../components/member/dashboard/RecentWorkouts";

export default function MemberDashboardPage() {
  return (
    <div>
      {/* Stat cards */}
      <MemberStatCards />

      {/* Middle row — chart + upcoming classes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <WeeklyActivityChart />
        <UpcomingClassesList />
      </div>

      {/* Recent workouts */}
      <div className="mt-6">
        <RecentWorkouts />
      </div>
    </div>
  );
}
