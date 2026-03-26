import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

const ROUTE_TITLES: Record<string, string> = {
  "/dashboard":      "Dashboard",
  "/members":        "Members",
  "/class-schedule": "Class Schedule",
  "/workout-logs":   "Workout Logs",
  "/nutrition-plans":"Nutrition Plans",
  "/billing":        "Billing & Invoices",
  "/settings":       "Settings",
};

export function AppShell() {
  const { pathname } = useLocation();
  const title = ROUTE_TITLES[pathname]
    ?? (pathname.startsWith("/members/") ? "Member Profile" : "FitCore");

  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem("sidebar-collapsed") === "true";
  });

  const toggleSidebar = () => {
    setIsCollapsed((prev) => {
      localStorage.setItem("sidebar-collapsed", String(!prev));
      return !prev;
    });
  };

  return (
    <div className="flex h-screen bg-ghost">
      <div
        className={`flex-shrink-0 transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-16" : "w-60"
        }`}
      >
        <Sidebar isCollapsed={isCollapsed} onToggle={toggleSidebar} />
      </div>
      <div className="flex-1 flex flex-col min-h-0 transition-all duration-300 ease-in-out overflow-hidden">
        <TopBar title={title} />
        <main className="flex-1 min-h-0 overflow-hidden flex flex-col overflow-y-auto">
          <div className="p-8 max-w-7xl mx-auto w-full flex-1 min-h-0 flex flex-col">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
