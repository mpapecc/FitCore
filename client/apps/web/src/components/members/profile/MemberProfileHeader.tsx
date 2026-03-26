import { Calendar, User, Pencil, ShieldOff } from "lucide-react";

const member = {
  id: "1",
  name: "Sarah Mitchell",
  email: "sarah.mitchell@email.com",
  phone: "+1 (555) 234-5678",
  plan: "Pro",
  status: "Active",
  joinDate: "March 15, 2023",
  avatarUrl: null,
  assignedTrainer: {
    name: "James Carter",
    avatarInitials: "JC",
  },
};

export function MemberProfileHeader() {
  return (
    <div className="bg-white border border-stroke rounded-lg shadow-sm p-6 md:p-8">
      <div className="flex justify-between items-start">
        {/* Left — avatar + info */}
        <div className="flex items-center gap-6">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-navy text-white text-2xl font-bold flex items-center justify-center shrink-0">
            SM
          </div>

          {/* Info block */}
          <div>
            {/* Name */}
            <h1 className="text-2xl font-bold text-primary">{member.name}</h1>

            {/* Plan badge + status chip */}
            <div className="flex items-center gap-2 mt-1.5">
              <span className="bg-navy text-white text-xs font-semibold px-3 py-1 rounded-full">
                {member.plan}
              </span>
              <span className="bg-success/10 text-success border border-success text-xs font-bold px-2.5 py-0.5 rounded-full uppercase">
                {member.status}
              </span>
            </div>

            {/* Join date + trainer */}
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1.5 text-secondary text-sm">
                <Calendar size={14} className="shrink-0" />
                <span>Member since {member.joinDate}</span>
              </div>
              <div className="flex items-center gap-1.5 text-secondary text-sm">
                <User size={14} className="shrink-0" />
                <div className="w-5 h-5 rounded-full bg-green text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {member.assignedTrainer.avatarInitials}
                </div>
                <span>{member.assignedTrainer.name}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right — actions */}
        <div className="flex gap-3 shrink-0">
          <button className="flex items-center gap-2 bg-green text-white font-semibold px-4 py-2 rounded-lg transition-all duration-DEFAULT active:scale-95 hover:bg-green-hover">
            <Pencil size={15} />
            Edit Profile
          </button>
          <button className="flex items-center gap-2 border border-error text-error hover:bg-error/10 px-4 py-2 rounded-lg transition-all duration-DEFAULT">
            <ShieldOff size={15} />
            Suspend Member
          </button>
        </div>
      </div>
    </div>
  );
}
