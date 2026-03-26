import { Eye, Pencil, Trash2, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { type Member } from "@fit-core/shared";

interface MembersTableProps {
  members: Member[];
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
}

const DUMMY_MEMBERS: Member[] = [
  {
    id: 1,
    name: "Marcus Johnson",
    email: "marcus.johnson@email.com",
    phone: "+1 (555) 012-3456",
    plan: "Elite",
    status: "Active",
    joinDate: "2024-01-12",
    avatarInitials: "MJ",
  },
  {
    id: 2,
    name: "Sofia Reyes",
    email: "sofia.reyes@email.com",
    phone: "+1 (555) 234-5678",
    plan: "Pro",
    status: "Active",
    joinDate: "2024-03-08",
    avatarInitials: "SR",
  },
  {
    id: 3,
    name: "Daniel Park",
    email: "daniel.park@email.com",
    phone: "+1 (555) 345-6789",
    plan: "Basic",
    status: "Overdue",
    joinDate: "2023-11-20",
    avatarInitials: "DP",
  },
  {
    id: 4,
    name: "Amelia Chen",
    email: "amelia.chen@email.com",
    phone: "+1 (555) 456-7890",
    plan: "Student",
    status: "Active",
    joinDate: "2024-09-01",
    avatarInitials: "AC",
  },
  {
    id: 5,
    name: "James Okafor",
    email: "james.okafor@email.com",
    phone: "+1 (555) 567-8901",
    plan: "Pro",
    status: "Inactive",
    joinDate: "2023-06-15",
    avatarInitials: "JO",
  },
  {
    id: 6,
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+1 (555) 678-9012",
    plan: "Elite",
    status: "Active",
    joinDate: "2024-02-27",
    avatarInitials: "PS",
  },
  {
    id: 7,
    name: "Lucas Fernandez",
    email: "lucas.fernandez@email.com",
    phone: "+1 (555) 789-0123",
    plan: "Basic",
    status: "Active",
    joinDate: "2024-05-14",
    avatarInitials: "LF",
  },
  {
    id: 8,
    name: "Nadia Kowalski",
    email: "nadia.kowalski@email.com",
    phone: "+1 (555) 890-1234",
    plan: "Pro",
    status: "Overdue",
    joinDate: "2023-08-03",
    avatarInitials: "NK",
  },
  {
    id: 9,
    name: "Ethan Williams",
    email: "ethan.williams@email.com",
    phone: "+1 (555) 901-2345",
    plan: "Student",
    status: "Inactive",
    joinDate: "2024-07-22",
    avatarInitials: "EW",
  },
  {
    id: 10,
    name: "Isabella Torres",
    email: "isabella.torres@email.com",
    phone: "+1 (555) 102-3456",
    plan: "Elite",
    status: "Active",
    joinDate: "2023-12-10",
    avatarInitials: "IT",
  },
];

function formatJoinDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const STATUS_STYLES: Record<Member["status"], string> = {
  Active:
    "bg-success/10 text-success border border-success rounded-full px-2.5 py-0.5 text-xs font-bold uppercase",
  Inactive:
    "bg-secondary/10 text-secondary border border-stroke rounded-full px-2.5 py-0.5 text-xs font-bold uppercase",
  Overdue:
    "bg-error/10 text-error border border-error rounded-full px-2.5 py-0.5 text-xs font-bold uppercase",
};

export { DUMMY_MEMBERS };

export function MembersTable({
  members,
  onView,
  onEdit,
  onDelete,
  currentPage,
  onPageChange,
  itemsPerPage,
}: MembersTableProps) {
  // Pagination
  const totalPages = Math.max(1, Math.ceil(members.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIdx = (safePage - 1) * itemsPerPage;
  const endIdx = Math.min(startIdx + itemsPerPage, members.length);
  const pageRows = members.slice(startIdx, endIdx);

  const pageNumbers: number[] = [];
  for (let p = Math.max(1, safePage - 1); p <= Math.min(totalPages, safePage + 1); p++) {
    pageNumbers.push(p);
  }

  const isEmpty = members.length === 0;

  return (
    <div className="bg-white border border-stroke rounded-lg shadow-sm overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-ghost">
            {["Member", "Email", "Phone", "Plan", "Join Date", "Status", "Actions"].map(
              (col) => (
                <th
                  key={col}
                  className="px-6 py-3 text-left text-secondary text-xs font-semibold uppercase tracking-wide"
                >
                  {col}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {isEmpty ? (
            <tr>
              <td colSpan={7}>
                <div className="flex flex-col items-center justify-center py-16">
                  <Users size={48} className="text-secondary/30" />
                  <p className="text-primary font-medium mt-4">No members found</p>
                  <p className="text-secondary text-sm mt-1">Try adjusting your filters</p>
                </div>
              </td>
            </tr>
          ) : (
            pageRows.map((member) => (
              <tr
                key={member.id}
                className="bg-white border-b border-stroke hover:bg-ghost transition-all duration-DEFAULT"
              >
                {/* Avatar + Name */}
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-9 h-9 rounded-full bg-navy text-white font-semibold text-sm flex items-center justify-center shrink-0">
                      {member.avatarInitials}
                    </div>
                    <span className="text-primary font-medium ml-3">{member.name}</span>
                  </div>
                </td>

                {/* Email */}
                <td className="px-6 py-4 text-secondary text-sm">{member.email}</td>

                {/* Phone */}
                <td className="px-6 py-4 text-secondary text-sm">{member.phone}</td>

                {/* Plan */}
                <td className="px-6 py-4">
                  <span className="bg-ghost text-primary text-xs font-medium px-2.5 py-1 rounded-md">
                    {member.plan}
                  </span>
                </td>

                {/* Join Date */}
                <td className="px-6 py-4 text-secondary text-sm">
                  {formatJoinDate(member.joinDate)}
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span className={STATUS_STYLES[member.status]}>{member.status}</span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onView(member.id)}
                      className="p-1.5 rounded hover:bg-ghost transition-all duration-DEFAULT text-secondary hover:text-green"
                      aria-label="View member"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => onEdit(member.id)}
                      className="p-1.5 rounded hover:bg-ghost transition-all duration-DEFAULT text-secondary hover:text-primary"
                      aria-label="Edit member"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(member.id)}
                      className="p-1.5 rounded hover:bg-ghost transition-all duration-DEFAULT text-secondary hover:text-error"
                      aria-label="Delete member"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {!isEmpty && (
        <div className="flex justify-between items-center px-6 py-4 border-t border-stroke">
          <p className="text-secondary text-sm">
            Showing {startIdx + 1}–{endIdx} of {members.length} member{members.length !== 1 ? "s" : ""}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onPageChange(safePage - 1)}
              disabled={safePage === 1}
              className="border border-stroke rounded-lg p-2 transition-all duration-DEFAULT disabled:opacity-40 disabled:cursor-not-allowed hover:bg-ghost"
            >
              <ChevronLeft size={15} />
            </button>
            {pageNumbers.map((p) => (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all duration-DEFAULT ${
                  p === safePage
                    ? "bg-navy text-white font-semibold"
                    : "text-secondary hover:bg-ghost"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => onPageChange(safePage + 1)}
              disabled={safePage === totalPages}
              className="border border-stroke rounded-lg p-2 transition-all duration-DEFAULT disabled:opacity-40 disabled:cursor-not-allowed hover:bg-ghost"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
