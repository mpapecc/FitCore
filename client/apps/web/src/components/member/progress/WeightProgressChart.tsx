import { TrendingDown } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, type TooltipContentProps,
} from 'recharts';
import { type WeightDataPoint } from '../../../pages/member/progress/myProgressData';
import { theme } from '../../../theme';

interface WeightProgressChartProps {
  data: WeightDataPoint[];
}

function CustomTooltip({ active, payload, label }: TooltipContentProps) {
  if (!active || !payload?.length) return null;
  const weight = payload.find(p => p.dataKey === 'weight');
  const goal   = payload.find(p => p.dataKey === 'goal');
  return (
    <div className="bg-white border border-stroke rounded-lg shadow-sm p-3 text-xs">
      <p className="text-secondary font-medium mb-1">{label}</p>
      {weight && (
        <p className="text-green font-semibold">{weight.value} kg</p>
      )}
      {goal && (
        <p className="text-secondary">Goal: {goal.value} kg</p>
      )}
    </div>
  );
}

export function WeightProgressChart({ data }: WeightProgressChartProps) {
  return (
    <div className="bg-white border border-stroke rounded-xl shadow-sm p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-base font-semibold text-primary">Weight Progress</p>
          <p className="text-secondary text-xs mt-0.5">Tracking Sarah's weight loss journey</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black text-primary">70.8 kg</p>
          <p className="text-success text-sm font-semibold flex items-center gap-1 justify-end mt-0.5">
            <TrendingDown className="w-4 h-4" />
            -3.4 kg
          </p>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke={theme.hex.border} />
          <XAxis
            dataKey="date"
            tick={{ fill: theme.hex.textSecondary, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={['auto', 'auto']}
            tickFormatter={(v) => `${v}kg`}
            tick={{ fill: theme.hex.textSecondary, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={48}
          />
          <Tooltip content={CustomTooltip} />
          <Line
            type="monotone"
            dataKey="weight"
            stroke={theme.hex.green}
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, fill: theme.hex.green }}
          />
          <Line
            type="monotone"
            dataKey="goal"
            stroke={theme.hex.green}
            strokeWidth={1.5}
            strokeDasharray="6 4"
            dot={false}
            opacity={0.5}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex gap-4 mt-3 justify-center text-xs text-secondary">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-6 h-0.5 bg-green rounded" />
          Actual weight
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-6 border-t-2 border-dashed border-green opacity-50" />
          Goal (68 kg)
        </span>
      </div>
    </div>
  );
}
