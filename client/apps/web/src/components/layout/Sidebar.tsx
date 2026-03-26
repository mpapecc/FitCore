import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Dumbbell,
  Apple,
  Receipt,
  Settings,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

interface NavItem {
  label: string;
  icon: LucideIcon;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Members", icon: Users, path: "/members" },
  { label: "Class Schedule", icon: CalendarDays, path: "/class-schedule" },
  { label: "Workout Logs", icon: Dumbbell, path: "/workout-logs" },
  { label: "Nutrition Plans", icon: Apple, path: "/nutrition-plans" },
  { label: "Billing & Invoices", icon: Receipt, path: "/billing" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const { pathname } = useLocation();
  const [tooltip, setTooltip] = useState<{ label: string; y: number } | null>(
    null,
  );

  function isActive(path: string): boolean {
    return pathname.startsWith(path);
  }

  return (
    <aside className="h-screen w-full bg-navy flex flex-col z-10">
      {/* Logo / Brand */}
      <div className="flex items-center px-4 py-5 border-b border-slate-700">
        <div className="w-8 h-8 bg-green rounded-lg flex items-center justify-center flex-shrink-0">
          <Dumbbell className="w-4 h-4 text-white" />
        </div>
        <span
          className={`ml-3 font-bold text-white text-lg tracking-tight transition-all duration-300 whitespace-nowrap overflow-hidden ${
            isCollapsed ? "opacity-0 w-0" : "opacity-100"
          }`}
        >
          Fit<span className="text-green">Core</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(({ label, icon: Icon, path }) => {
          const active = isActive(path);
          return (
            <div
              key={path}
              onMouseEnter={(e) => {
                if (isCollapsed) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setTooltip({ label, y: rect.top + rect.height / 2 });
                }
              }}
              onMouseLeave={() => setTooltip(null)}
            >
              <Link
                to={path}
                className={[
                  "flex items-center w-full rounded-lg text-sm font-medium transition-all duration-DEFAULT",
                  isCollapsed ? "px-0 py-3 justify-center" : "py-3",
                  active
                    ? "border-l-4 border-green bg-slate-800 text-white pl-3"
                    : "border-l-4 border-transparent pl-3 text-slate-300 hover:bg-slate-800 hover:text-white",
                ].join(" ")}
              >
                <Icon
                  size={18}
                  className={`flex-shrink-0 ${active ? "text-white" : "text-slate-400"}`}
                />
                <span
                  className={`ml-3 transition-all duration-300 whitespace-nowrap overflow-hidden ${
                    isCollapsed ? "opacity-0 w-0" : "opacity-100"
                  }`}
                >
                  {label}
                </span>
              </Link>
            </div>
          );
        })}
      </nav>

      {/* Fixed tooltip — renders outside all overflow contexts */}
      {isCollapsed && tooltip && (
        <div
          className="fixed left-16 ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded whitespace-nowrap pointer-events-none z-50 -translate-y-1/2"
          style={{ top: tooltip.y }}
        >
          {tooltip.label}
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-center py-2 text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-DEFAULT border-t border-slate-700"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <>
            <ChevronLeft className="w-4 h-4" />
            <span className="ml-2 text-xs font-medium">Collapse</span>
          </>
        )}
      </button>

      {/* User profile */}
      <div
        className={`flex items-center ${
          isCollapsed ? "justify-center px-2" : "px-4"
        } py-4 border-t border-slate-700`}
      >
        <div className="w-8 h-8 rounded-full bg-green flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          AD
        </div>
        <div
          className={`ml-3 transition-all duration-300 overflow-hidden whitespace-nowrap ${
            isCollapsed ? "opacity-0 w-0" : "opacity-100"
          }`}
        >
          <p className="text-white text-sm font-medium">Admin User</p>
          <p className="text-slate-400 text-xs">Admin</p>
        </div>
      </div>
    </aside>
  );
}
