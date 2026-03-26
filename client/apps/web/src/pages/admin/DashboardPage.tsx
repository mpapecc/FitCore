import { StatCardsRow } from "../../components/dashboard/StatCardsRow";
import { RevenueChart } from "../../components/dashboard/RevenueChart";
import { UpcomingRenewals } from "../../components/dashboard/UpcomingRenewals";
import { RecentMembersTable } from "../../components/dashboard/RecentMembersTable";

export default function DashboardPage() {
  return (
    <div className="flex-1 ">
      {/* Row 1: stat cards */}
      <div className="mb-6">
        <StatCardsRow />
      </div>

      {/* Row 2: revenue chart + upcoming renewals */}
      <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RevenueChart />
        </div>
        <div className="xl:col-span-1">
          <UpcomingRenewals />
        </div>
      </div>

      {/* Row 3: recent members */}
      <RecentMembersTable />
    </div>
  );
}
