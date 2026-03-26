import { type RecentMember } from "@fit-core/shared";

const MEMBERS: RecentMember[] = [
  {
    id: 1,
    name: "John Carter",
    avatarInitials: "JC",
    plan: "Elite",
    joinDate: "Mar 18, 2026",
  },
  {
    id: 2,
    name: "Sarah Mills",
    avatarInitials: "SM",
    plan: "Pro",
    joinDate: "Mar 15, 2026",
  },
  {
    id: 3,
    name: "Mike Torres",
    avatarInitials: "MT",
    plan: "Basic",
    joinDate: "Mar 12, 2026",
  },
  {
    id: 4,
    name: "Emma Davis",
    avatarInitials: "ED",
    plan: "Student",
    joinDate: "Mar 10, 2026",
  },
  {
    id: 5,
    name: "Ryan Nguyen",
    avatarInitials: "RN",
    plan: "Pro",
    joinDate: "Mar 7, 2026",
  },
];

const COLUMNS = ["Member", "Plan", "Join Date", "Actions"] as const;

function Avatar({ initials }: { initials: string }) {
  return (
    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
      <span className="text-xs font-semibold text-slate-600">{initials}</span>
    </div>
  );
}

export function RecentMembersTable() {
  return (
    <div className="bg-white border border-stroke rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-stroke">
        <h2 className="text-base font-semibold text-primary">Recent Signups</h2>
        <button className="text-sm font-medium text-green hover:text-green-600 transition-colors duration-200">
          View All
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-ghost">
              {COLUMNS.map((col) => (
                <th
                  key={col}
                  className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wide"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MEMBERS.map((member) => (
              <tr
                key={member.id}
                className="bg-white border-b border-slate-100 hover:bg-ghost transition-colors duration-150"
              >
                {/* Avatar + Name */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar initials={member.avatarInitials} />
                    <span className="text-sm font-medium text-primary">
                      {member.name}
                    </span>
                  </div>
                </td>

                {/* Plan */}
                <td className="px-6 py-4 text-sm text-slate-600">
                  {member.plan}
                </td>

                {/* Join Date */}
                <td className="px-6 py-4 text-sm text-slate-600">
                  {member.joinDate}
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <button className="text-sm font-semibold text-green border border-green px-3 py-1 rounded-lg hover:bg-green-50 transition-all duration-200">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
