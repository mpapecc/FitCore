import { type MemberRenewal } from "@fit-core/shared";

const RENEWALS: MemberRenewal[] = [
  { id: 1, name: "Sarah Mills",   initials: "SM", plan: "Pro",     expiryDate: "Mar 25, 2026", daysRemaining: 1 },
  { id: 2, name: "Mike Torres",   initials: "MT", plan: "Basic",   expiryDate: "Mar 27, 2026", daysRemaining: 3 },
  { id: 3, name: "John Carter",   initials: "JC", plan: "Elite",   expiryDate: "Mar 29, 2026", daysRemaining: 5 },
  { id: 4, name: "Emma Davis",    initials: "ED", plan: "Student", expiryDate: "Mar 31, 2026", daysRemaining: 7 },
  { id: 5, name: "Ryan Nguyen",   initials: "RN", plan: "Pro",     expiryDate: "Apr 3, 2026",  daysRemaining: 10 },
];

function getDaysChipStyle(days: number): string {
  if (days <= 3) return "bg-red-100 text-red-700 border border-red-200";
  if (days <= 7) return "bg-amber-100 text-amber-700 border border-amber-200";
  return "bg-green-100 text-green-700 border border-green-200";
}

const CHIP_BASE = "px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap";

export function UpcomingRenewals() {
  return (
    <div className="bg-white border border-stroke rounded-lg shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-primary">Upcoming Renewals</h2>
          <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 border border-green-200 text-xs font-semibold">
            {RENEWALS.length}
          </span>
        </div>
      </div>

      {/* List */}
      <ul>
        {RENEWALS.map((member, index) => (
          <li
            key={member.id}
            className={`flex items-center justify-between py-3 ${index < RENEWALS.length - 1 ? "border-b border-slate-100" : ""}`}
          >
            {/* Left: avatar + name + plan */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-navy flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-white">{member.initials}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-primary leading-tight">{member.name}</p>
                <p className="text-xs text-secondary mt-0.5">{member.plan}</p>
              </div>
            </div>

            {/* Right: expiry date + days chip */}
            <div className="flex flex-col items-end gap-1">
              <p className="text-xs text-secondary">{member.expiryDate}</p>
              <span className={`${CHIP_BASE} ${getDaysChipStyle(member.daysRemaining)}`}>
                {member.daysRemaining}d left
              </span>
            </div>
          </li>
        ))}
      </ul>

      {/* Footer link */}
      <div className="mt-4 pt-4 border-t border-slate-100">
        <button className="text-sm font-medium text-green hover:text-green-600 transition-colors duration-200">
          View all renewals
        </button>
      </div>
    </div>
  );
}
