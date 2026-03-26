import { useState } from "react";
import { Eye, Clock, Flame } from "lucide-react";
import type { WorkoutLog } from "@fit-core/shared";

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = "Workout Logs" | "Invoices" | "Nutrition Plan" | "Notes";

const TABS: Tab[] = ["Workout Logs", "Invoices", "Nutrition Plan", "Notes"];

// ─── Workout logs data ────────────────────────────────────────────────────────


const workoutLogs: WorkoutLog[] = [
  { id: "1",  date: "Mar 22, 2026", type: "HIIT",       duration: 45, calories: 520 },
  { id: "2",  date: "Mar 20, 2026", type: "Strength",   duration: 60, calories: 380 },
  { id: "3",  date: "Mar 18, 2026", type: "Flexibility", duration: 50, calories: 210 },
  { id: "4",  date: "Mar 15, 2026", type: "Cardio",     duration: 45, calories: 480 },
  { id: "5",  date: "Mar 13, 2026", type: "Strength",   duration: 55, calories: 420 },
  { id: "6",  date: "Mar 11, 2026", type: "HIIT",       duration: 40, calories: 460 },
  { id: "7",  date: "Mar 08, 2026", type: "Strength",   duration: 65, calories: 510 },
  { id: "8",  date: "Mar 06, 2026", type: "Flexibility", duration: 50, calories: 200 },
  { id: "9",  date: "Mar 04, 2026", type: "Cardio",     duration: 35, calories: 390 },
  { id: "10", date: "Mar 01, 2026", type: "HIIT",       duration: 45, calories: 440 },
];

// ─── Tab content panels ───────────────────────────────────────────────────────

function WorkoutLogsPanel() {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-ghost">
          {["Date", "Workout Name", "Duration", "Calories Burned", "Actions"].map((col) => (
            <th
              key={col}
              className="px-6 py-3 text-left text-secondary text-xs font-semibold uppercase tracking-wide"
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {workoutLogs.map((log) => (
          <tr
            key={log.id}
            className="border-b border-stroke hover:bg-ghost transition-all duration-DEFAULT"
          >
            <td className="px-6 py-4 text-secondary text-sm">{log.date}</td>
            <td className="px-6 py-4 text-primary font-medium">{log.type}</td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-1.5 text-secondary text-sm">
                <Clock size={12} className="shrink-0" />
                {log.duration}
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-1.5 text-secondary text-sm">
                <Flame size={12} className="text-warning shrink-0" />
                {log.calories} kcal
              </div>
            </td>
            <td className="px-6 py-4">
              <button
                className="p-1.5 rounded text-secondary hover:text-green transition-all duration-DEFAULT hover:bg-ghost"
                aria-label="View workout"
              >
                <Eye size={15} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function PlaceholderPanel({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center py-16 px-6">
      <p className="text-secondary">{label} tab coming soon</p>
    </div>
  );
}

function NotesPanel() {
  return (
    <div className="p-6">
      <label className="text-primary font-medium mb-2 block">Admin Notes</label>
      <textarea
        placeholder="Add notes about this member..."
        rows={4}
        className="w-full border border-stroke rounded-lg p-4 text-primary placeholder:text-secondary resize-none h-32 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent transition-all duration-DEFAULT"
      />
      <button className="mt-3 bg-green text-white font-semibold px-4 py-2 rounded-lg transition-all duration-DEFAULT active:scale-95 hover:bg-green-hover">
        Save Notes
      </button>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function MemberProfileTabs() {
  const [activeTab, setActiveTab] = useState<Tab>("Workout Logs");

  return (
    <div className="bg-white border border-stroke rounded-lg shadow-sm overflow-hidden">
      {/* Tab bar */}
      <div className="flex border-b border-stroke px-6">
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={[
                "py-4 px-4 text-sm border-b-2 transition-all duration-DEFAULT",
                isActive
                  ? "text-green font-semibold border-green"
                  : "text-secondary font-medium border-transparent hover:text-primary hover:border-stroke",
              ].join(" ")}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      {activeTab === "Workout Logs"   && <WorkoutLogsPanel />}
      {activeTab === "Invoices"       && <PlaceholderPanel label="Invoices" />}
      {activeTab === "Nutrition Plan" && <PlaceholderPanel label="Nutrition Plan" />}
      {activeTab === "Notes"          && <NotesPanel />}
    </div>
  );
}
