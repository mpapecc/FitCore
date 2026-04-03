import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  type TooltipProps,
} from "recharts";
import { weeklyActivity } from "../../../pages/member/dashboard/memberDashboardData";
import { theme } from "../../../theme";

function ActivityTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  const duration = payload[0].value ?? 0;
  return (
    <div className="bg-white border border-stroke rounded-lg shadow-sm px-3 py-2 text-xs text-primary">
      {duration > 0 ? `${duration} min` : "Rest day"}
    </div>
  );
}

export default function WeeklyActivityChart() {
  const totalMin = weeklyActivity.reduce((sum, d) => sum + d.duration, 0);
  const activeDays = weeklyActivity.filter((d) => d.duration > 0).length;

  return (
    <div className="bg-white border border-stroke rounded-xl shadow-sm p-6">
      <p className="text-base font-semibold text-primary">Weekly Activity</p>
      <p className="text-secondary text-sm">Workout duration per day</p>

      <div className="mt-4">
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={weeklyActivity} barCategoryGap="30%">
            <CartesianGrid vertical={false} stroke={theme.hex.border} />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: theme.hex.textSecondary, fontSize: 12, fontFamily: "Inter, sans-serif" }}
            />
            <Tooltip content={<ActivityTooltip />} cursor={{ fill: theme.hex.ghostGray }} />
            <Bar dataKey="duration" radius={[4, 4, 0, 0]}>
              {weeklyActivity.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.duration > 0 ? theme.hex.green : theme.hex.border}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between text-xs text-secondary mt-2">
        <span>Total this week: {totalMin} min</span>
        <span>{activeDays} active days</span>
      </div>
    </div>
  );
}
