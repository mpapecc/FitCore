import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ProgressStatCards }     from '../../components/member/progress/ProgressStatCards';
import { WeightProgressChart }   from '../../components/member/progress/WeightProgressChart';
import { WorkoutFrequencyChart } from '../../components/member/progress/WorkoutFrequencyChart';
import { BodyMeasurements }      from '../../components/member/progress/BodyMeasurements';
import { WorkoutHistoryTable }   from '../../components/member/progress/WorkoutHistoryTable';
import {
  type TimeRange,
  progressStats,
  weightDataByRange,
  workoutFrequencyData,
  bodyMeasurements,
  workoutHistory,
} from './progress/myProgressData';

const TIME_RANGES: TimeRange[] = ['1M', '3M', '6M', '1Y'];

export default function MyProgressPage() {
  const { t } = useTranslation('member');
  const [timeRange, setTimeRange] = useState<TimeRange>('3M');

  return (
    <div className="p-8">
      {/* Page header + time range selector */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">{t('myProgress')}</h1>
          <p className="text-secondary text-sm mt-0.5">{t('myProgressDesc')}</p>
        </div>

        {/* Time range toggle */}
        <div className="flex border border-stroke rounded-lg overflow-hidden">
          {TIME_RANGES.map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`
                px-4 py-2 text-sm font-medium duration-DEFAULT
                ${timeRange === range
                  ? 'bg-navy text-white'
                  : 'bg-white text-secondary hover:bg-ghost'
                }
              `}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Stat cards */}
      <ProgressStatCards stats={progressStats[timeRange]} />

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <WeightProgressChart data={weightDataByRange[timeRange]} />
        <WorkoutFrequencyChart data={workoutFrequencyData} />
      </div>

      {/* Body measurements */}
      <div className="mt-6">
        <BodyMeasurements measurements={bodyMeasurements} />
      </div>

      {/* Workout history */}
      <div className="mt-6">
        <WorkoutHistoryTable entries={workoutHistory} />
      </div>
    </div>
  );
}
