import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { MemberProfileHeader } from "../../components/members/profile/MemberProfileHeader";
import { MemberStatCards } from "../../components/members/profile/MemberStatCards";
import { MemberProfileCharts } from "../../components/members/profile/MemberProfileCharts";
import { MemberProfileTabs } from "../../components/members/profile/MemberProfileTabs";

export default function MemberProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <button
          onClick={() => navigate("/members")}
          className="text-secondary hover:text-primary transition-all duration-DEFAULT"
        >
          Members
        </button>
        <ChevronRight size={16} className="text-secondary" />
        <span className="text-primary font-medium">Sarah Mitchell</span>
      </div>

      {/* Profile header */}
      <div className="mb-4">
        <MemberProfileHeader />
      </div>

      {/* Stat cards */}
      <div className="mb-4">
        <MemberStatCards />
      </div>

      {/* Charts + upcoming classes */}
      <div className="mb-4">
        <MemberProfileCharts />
      </div>

      {/* Tabbed section */}
      <MemberProfileTabs />
    </div>
  );
}
