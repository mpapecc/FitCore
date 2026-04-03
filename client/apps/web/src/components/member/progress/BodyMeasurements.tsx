import { TrendingDown, TrendingUp } from 'lucide-react';
import { type BodyMeasurement } from '../../../pages/member/progress/myProgressData';

interface BodyMeasurementsProps {
  measurements: BodyMeasurement[];
}

function getMeasurementColor(isLowerBetter: boolean, change: number): string {
  if (change === 0) return 'text-secondary';
  const isImprovement = isLowerBetter ? change < 0 : change > 0;
  return isImprovement ? 'text-success' : 'text-error';
}

export function BodyMeasurements({ measurements }: BodyMeasurementsProps) {
  return (
    <div className="bg-white border border-stroke rounded-xl shadow-sm p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <p className="text-base font-semibold text-primary">Body Measurements</p>
        <span className="text-secondary text-xs">Updated Mar 22</span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {measurements.map((m) => {
          const change = parseFloat((m.current - m.starting).toFixed(1));
          const color = getMeasurementColor(m.isLowerBetter, change);
          const isDown = change < 0;
          const sign = change > 0 ? '+' : '';

          return (
            <div key={m.id} className="bg-ghost border border-stroke rounded-xl p-4">
              <p className="text-secondary text-xs font-medium uppercase tracking-wide mb-1">
                {m.label}
              </p>
              <p className="text-2xl font-black text-primary">
                {m.current}
                <span className="text-secondary text-sm ml-1">{m.unit}</span>
              </p>
              <div className={`flex items-center gap-1.5 mt-2 ${color}`}>
                {isDown
                  ? <TrendingDown className="w-3.5 h-3.5" />
                  : <TrendingUp className="w-3.5 h-3.5" />
                }
                <span className="text-xs font-medium">
                  {sign}{change} {m.unit} since start
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
