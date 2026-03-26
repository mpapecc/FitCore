import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface WeightTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}
import { TrendingDown } from "lucide-react";
import { theme } from "../../../theme";

// ─── Weight chart data ────────────────────────────────────────────────────────

const weightData = [
  { week: "Week 1",  weight: 74.2 },
  { week: "Week 2",  weight: 73.8 },
  { week: "Week 3",  weight: 73.5 },
  { week: "Week 4",  weight: 73.9 },
  { week: "Week 5",  weight: 73.1 },
  { week: "Week 6",  weight: 72.8 },
  { week: "Week 7",  weight: 72.5 },
  { week: "Week 8",  weight: 72.2 },
  { week: "Week 9",  weight: 71.9 },
  { week: "Week 10", weight: 71.5 },
  { week: "Week 11", weight: 71.2 },
  { week: "Week 12", weight: 70.8 },
];

// ─── Upcoming classes data ────────────────────────────────────────────────────

type ClassColor = "green" | "blue" | "orange";

interface UpcomingClass {
  name: string;
  date: string;
  time: string;
  trainer: string;
  color: ClassColor;
}

const upcomingClasses: UpcomingClass[] = [
  { name: "Morning HIIT",             date: "Today",       time: "07:00 AM", trainer: "James Carter", color: "green"  },
  { name: "Yoga Flow",                date: "Tomorrow",    time: "09:30 AM", trainer: "Coach Maria",  color: "blue"   },
  { name: "Strength & Conditioning",  date: "Wed, Mar 26", time: "06:00 PM", trainer: "James Carter", color: "green"  },
  { name: "Spin Class",               date: "Thu, Mar 27", time: "07:30 AM", trainer: "Coach Ben",    color: "orange" },
  { name: "Morning HIIT",             date: "Fri, Mar 28", time: "07:00 AM", trainer: "James Carter", color: "green"  },
];

const CLASS_DOT: Record<ClassColor, string> = {
  green:  "bg-success",
  blue:   "bg-blue-400",
  orange: "bg-warning",
};

// ─── Custom tooltip ───────────────────────────────────────────────────────────

function WeightTooltip({ active, payload, label }: WeightTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-stroke rounded-lg shadow-sm px-3 py-2">
      <p className="text-secondary text-xs mb-0.5">{label}</p>
      <p className="text-primary font-semibold text-sm">{payload[0].value} kg</p>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function MemberProfileCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

      {/* LEFT — Weight Progress */}
      <div className="bg-white border border-stroke rounded-lg shadow-sm p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="font-semibold text-primary">Weight Progress</h3>
          <p className="text-secondary text-sm mt-0.5">Last 3 months</p>
        </div>

        {/* Chart */}
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={weightData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="weightFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor={theme.hex.green} stopOpacity={0.15} />
                <stop offset="100%" stopColor={theme.hex.green} stopOpacity={0}    />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={theme.hex.border} strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="week"
              tick={{ fill: theme.hex.textSecondary, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              interval={2}
            />
            <YAxis
              domain={["auto", "auto"]}
              tick={{ fill: theme.hex.textSecondary, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `${v}`}
            />
            <Tooltip content={<WeightTooltip />} />
            <Area
              type="monotone"
              dataKey="weight"
              stroke={theme.hex.green}
              strokeWidth={2}
              fill="url(#weightFill)"
              dot={false}
              activeDot={{ r: 4, fill: theme.hex.green, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>

        {/* Summary row */}
        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-stroke">
          <div>
            <p className="text-secondary text-xs uppercase tracking-wide">Start</p>
            <p className="text-secondary text-sm mt-0.5">74.2 kg</p>
          </div>
          <div>
            <p className="text-secondary text-xs uppercase tracking-wide">Current</p>
            <p className="text-primary font-semibold text-sm mt-0.5">70.8 kg</p>
          </div>
          <div>
            <p className="text-secondary text-xs uppercase tracking-wide">Total Loss</p>
            <div className="flex items-center gap-1 mt-0.5">
              <TrendingDown size={14} className="text-success" />
              <p className="text-success font-semibold text-sm">-3.4 kg</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT — Upcoming Classes */}
      <div className="bg-white border border-stroke rounded-lg shadow-sm p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-primary">Upcoming Classes</h3>
          <button className="text-green text-sm hover:underline">View All</button>
        </div>

        {/* Class list */}
        <ul>
          {upcomingClasses.map((cls, i) => (
            <li
              key={i}
              className="flex items-center justify-between py-3 border-b border-stroke last:border-0 hover:bg-ghost rounded transition-all duration-DEFAULT px-2 -mx-2"
            >
              {/* Left: dot + name */}
              <div className="flex items-center gap-2.5 min-w-0">
                <span className={`w-2 h-2 rounded-full shrink-0 ${CLASS_DOT[cls.color]}`} />
                <span className="text-primary font-medium text-sm truncate">{cls.name}</span>
              </div>

              {/* Middle: date + time */}
              <div className="flex flex-col items-center text-secondary text-sm shrink-0 mx-4">
                <span>{cls.date}</span>
                <span>{cls.time}</span>
              </div>

              {/* Right: trainer */}
              <span className="text-secondary text-sm shrink-0">{cls.trainer}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
