import { Bell, Search, Settings } from "lucide-react";

interface TopBarProps {
  title: string;
}

const CURRENT_USER = {
  name: "Alex Morgan",
  initials: "AM",
  role: "Admin",
};

const TODAY = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function TopBar({ title }: TopBarProps) {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-stroke px-8 py-4 flex items-center justify-between">
      {/* Left: title + greeting */}
      <div className="shrink-0">
        <h1 className="text-xl font-bold text-primary tracking-tight leading-tight">
          {title}
        </h1>
        <p className="text-sm text-secondary mt-0.5">
          {getGreeting()}, {CURRENT_USER.name} 👋 &middot; {TODAY}
        </p>
      </div>

      {/* Right: search + icons + user */}
      <div className="flex items-center gap-2">
        {/* Search input */}
        <div className="relative mr-24">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Find"
            className="w-72 pl-9 pr-4 py-2 text-sm text-primary bg-ghost border border-stroke rounded-lg placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent transition duration-200"
          />
        </div>

        <button className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-all duration-200">
          <Bell size={18} />
        </button>
        <button className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-all duration-200">
          <Settings size={18} />
        </button>

        <div className="w-px h-6 bg-slate-200 mx-2" />

        <div className="w-8 h-8 rounded-full bg-green flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xs font-bold">{CURRENT_USER.initials}</span>
        </div>
      </div>
    </header>
  );
}
