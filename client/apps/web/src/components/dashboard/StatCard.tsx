import { TrendingUp, TrendingDown } from "lucide-react";
import { type ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  trend: number;
  trendLabel: string;
  icon: ReactNode;
}

export function StatCard({ title, value, trend, trendLabel, icon }: StatCardProps) {
  const isUp = trend >= 0;
  const TrendIcon = isUp ? TrendingUp : TrendingDown;
  const trendColor = isUp ? "text-green" : "text-error";
  const trendSign = isUp ? "+" : "";

  return (
    <div className="bg-white border border-stroke rounded-lg shadow-sm p-6 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200">
      {/* Top row: title + icon */}
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-secondary uppercase tracking-wide">
          {title}
        </p>
        <div className="w-10 h-10 rounded-full bg-ghost flex items-center justify-center flex-shrink-0 text-green">
          {icon}
        </div>
      </div>

      {/* Value */}
      <p className="text-3xl font-black text-primary tracking-tight leading-none">
        {value}
      </p>

      {/* Trend */}
      <div className={`flex items-center gap-1 text-sm font-semibold ${trendColor}`}>
        <TrendIcon size={14} strokeWidth={2.5} />
        <span>
          {trendSign}{trend}%
        </span>
        <span className="text-slate-400 font-normal">{trendLabel}</span>
      </div>
    </div>
  );
}
