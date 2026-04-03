import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { session } from "@fit-core/shared";
import { useTranslation } from "react-i18next";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

export function AppShell() {
  const { pathname } = useLocation();
  const role = session.getRole();
  const { t: tAdmin } = useTranslation("admin");

  const ADMIN_ROUTE_TITLES: Record<string, string> = {
    "/dashboard":       tAdmin("dashboard"),
    "/members":         tAdmin("members"),
    "/class-schedule":  tAdmin("schedule"),
    "/workout-logs":    tAdmin("workouts"),
    "/nutrition-plans": tAdmin("nutrition"),
    "/billing":         tAdmin("billing"),
    "/settings":        tAdmin("settings"),
  };

  const MEMBER_ROUTE_TITLES: Record<string, string> = {
    "/member/dashboard": tAdmin("dashboard"),
    "/member/book":      tAdmin("bookClass"),
    "/member/bookings":  tAdmin("myBookings"),
    "/member/progress":  tAdmin("myProgress"),
    "/member/nutrition": tAdmin("nutritionPlan"),
    "/member/invoices":  tAdmin("myInvoices"),
    "/member/profile":   tAdmin("profileSettings"),
  };

  const routeTitles = role === "Member" ? MEMBER_ROUTE_TITLES : ADMIN_ROUTE_TITLES;
  const title = routeTitles[pathname]
    ?? (pathname.startsWith("/members/") ? tAdmin("memberProfile") : "FitCore");

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
