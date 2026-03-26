import { TrendingUp, TrendingDown, Dumbbell, Flame, CalendarCheck, type LucideIcon } from "lucide-react";

interface ProfileStatCardProps {
  label: string;
  value: string | number;
  trend: number;
  trendSuffix?: string;
  trendLabel: string;
  icon: LucideIcon;
}

function ProfileStatCard({ label, value, trend, trendSuffix = "", trendLabel, icon: Icon }: ProfileStatCardProps) {
  const isUp = trend >= 0;
  const TrendIcon = isUp ? TrendingUp : TrendingDown;
  const trendColor = isUp ? "text-success" : "text-error";
  const trendSign = isUp ? "+" : "";

  return (
    <div className="bg-white border border-stroke rounded-lg shadow-sm p-6 flex flex-col gap-4">
      {/* Top row: label + icon */}
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-secondary uppercase tracking-wide">{label}</p>
        <div className="w-10 h-10 rounded-full bg-ghost flex items-center justify-center shrink-0 text-green">
          <Icon size={18} />
        </div>
      </div>

      {/* Value */}
      <p className="text-3xl font-black text-primary tracking-tight leading-none">{value}</p>

      {/* Trend */}
      <div className={`flex items-center gap-1 text-sm font-semibold ${trendColor}`}>
        <TrendIcon size={14} strokeWidth={2.5} />
        <span>{trendSign}{trend}{trendSuffix}</span>
        <span className="text-secondary font-normal">{trendLabel}</span>
      </div>
    </div>
  );
}

export function MemberStatCards() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <ProfileStatCard
        label="Workouts This Month"
        value={18}
        trend={20}
        trendSuffix="%"
        trendLabel="vs last month"
        icon={Dumbbell}
      />
      <ProfileStatCard
        label="Current Streak"
        value="12 days"
        trend={5}
        trendLabel="vs last month"
        icon={Flame}
      />
      <ProfileStatCard
        label="Classes Booked This Month"
        value={7}
        trend={-1}
        trendLabel="vs last month"
        icon={CalendarCheck}
      />
    </div>
  );
}
