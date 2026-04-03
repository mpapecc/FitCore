import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, type TooltipContentProps,
} from 'recharts';
import { type WorkoutFrequencyPoint } from '../../../pages/member/progress/myProgressData';
import { theme } from '../../../theme';

interface WorkoutFrequencyChartProps {
  data: WorkoutFrequencyPoint[];
}

function CustomTooltip({ active, payload, label }: TooltipContentProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-stroke rounded-lg shadow-sm p-3 text-xs">
      <p className="text-secondary font-medium mb-1">{label}</p>
      <p className="text-green font-semibold">{payload[0].value} workouts</p>
    </div>
  );
}

export function WorkoutFrequencyChart({ data }: WorkoutFrequencyChartProps) {
  return (
    <div className="bg-white border border-stroke rounded-xl shadow-sm p-6">
      {/* Header */}
      <div className="mb-4">
        <p className="text-base font-semibold text-primary">Workout Frequency</p>
        <p className="text-secondary text-xs mt-0.5">Sessions per week</p>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke={theme.hex.border} />
          <XAxis
            dataKey="week"
            tick={{ fill: theme.hex.textSecondary, fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis hide />
          <Tooltip content={CustomTooltip} />
          <Bar
            dataKey="count"
            fill={theme.hex.green}
            radius={[4, 4, 0, 0]}
            maxBarSize={32}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Summary */}
      <div className="flex justify-between text-xs text-secondary mt-3">
        <span>Best week: 4 workouts</span>
        <span>Average: 3.0/week</span>
      </div>
    </div>
  );
}
