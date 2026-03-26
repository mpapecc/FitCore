import { useState } from "react";
import { theme } from "../../theme";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  type TooltipContentProps,
} from "recharts";

const COLOR_LINE = theme.hex.green;
const COLOR_GRID = theme.hex.border;
const COLOR_AXIS_LABEL = theme.hex.textSecondary;
const COLOR_DOT_BORDER = "#ffffff";
const FONT_AXIS = "Inter, sans-serif";
const FONT_SIZE_AXIS = 12;
const CHART_HEIGHT = 280;
const Y_AXIS_WIDTH = 48;
const LINE_STROKE_WIDTH = 2.5;
const DOT_RADIUS = 4;
const ACTIVE_DOT_RADIUS = 6;
const ACTIVE_DOT_STROKE_WIDTH = 2;

const DATA_6M = [
  { month: "Oct", revenue: 7200 },
  { month: "Nov", revenue: 8100 },
  { month: "Dec", revenue: 7650 },
  { month: "Jan", revenue: 8800 },
  { month: "Feb", revenue: 9400 },
  { month: "Mar", revenue: 8240 },
];

const DATA_12M = [
  { month: "Apr", revenue: 5800 },
  { month: "May", revenue: 6300 },
  { month: "Jun", revenue: 6900 },
  { month: "Jul", revenue: 7100 },
  { month: "Aug", revenue: 6750 },
  { month: "Sep", revenue: 7050 },
  { month: "Oct", revenue: 7200 },
  { month: "Nov", revenue: 8100 },
  { month: "Dec", revenue: 7650 },
  { month: "Jan", revenue: 8800 },
  { month: "Feb", revenue: 9400 },
  { month: "Mar", revenue: 8240 },
];

type Period = "6m" | "12m";

function formatCurrency(value: number): string {
  return `$${value.toLocaleString()}`;
}

function CustomTooltip({ active, payload, label }: TooltipContentProps) {
  if (!active || !payload?.length) return null;
  const rawValue = payload[0].value;
  const numericValue = typeof rawValue === "number" ? rawValue : Number(rawValue ?? 0);
  return (
    <div className="bg-white border border-stroke rounded-lg shadow-sm px-4 py-3">
      <p className="text-xs font-medium text-secondary uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="text-lg font-black text-primary tracking-tight">
        {formatCurrency(numericValue)}
      </p>
    </div>
  );
}

export function RevenueChart() {
  const [period, setPeriod] = useState<Period>("6m");
  const data = period === "6m" ? DATA_6M : DATA_12M;

  return (
    <div className="bg-white border border-stroke rounded-lg shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base font-semibold text-primary">Revenue Overview</h2>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value as Period)}
          className="text-sm text-secondary border border-stroke rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent transition duration-200 cursor-pointer"
        >
          <option value="6m">Last 6 months</option>
          <option value="12m">Last 12 months</option>
        </select>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
        <LineChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={COLOR_GRID}
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tick={{ fill: COLOR_AXIS_LABEL, fontSize: FONT_SIZE_AXIS, fontFamily: FONT_AXIS }}
            axisLine={false}
            tickLine={false}
            dy={8}
          />
          <YAxis
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            tick={{ fill: COLOR_AXIS_LABEL, fontSize: FONT_SIZE_AXIS, fontFamily: FONT_AXIS }}
            axisLine={false}
            tickLine={false}
            width={Y_AXIS_WIDTH}
            domain={["auto", "auto"]}
          />
          <Tooltip content={(props) => <CustomTooltip {...props} />} cursor={{ stroke: COLOR_GRID, strokeWidth: 1 }} />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke={COLOR_LINE}
            strokeWidth={LINE_STROKE_WIDTH}
            dot={{ fill: COLOR_LINE, strokeWidth: 0, r: DOT_RADIUS }}
            activeDot={{ fill: COLOR_LINE, stroke: COLOR_DOT_BORDER, strokeWidth: ACTIVE_DOT_STROKE_WIDTH, r: ACTIVE_DOT_RADIUS }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
