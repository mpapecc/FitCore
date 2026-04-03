export type TimeRange = '1M' | '3M' | '6M' | '1Y';

export interface WeightDataPoint {
  date: string;
  weight: number;
  goal: number;
}

export interface WorkoutFrequencyPoint {
  week: string;
  count: number;
}

export interface BodyMeasurement {
  id: string;
  label: string;
  unit: string;
  current: number;
  starting: number;
  isLowerBetter: boolean; // true for weight/fat/waist — lower is improvement
}

export interface WorkoutHistoryEntry {
  id: string;
  date: string;
  name: string;
  type: 'HIIT' | 'Yoga' | 'Strength' | 'Cycling' | 'Pilates';
  duration: number;
  calories: number;
  trainer: string;
}

export interface ProgressStats {
  totalWorkouts: number;
  avgPerWeek: number;
  totalCalories: number;
}

export const progressStats: Record<TimeRange, ProgressStats> = {
  '1M': { totalWorkouts: 12,  avgPerWeek: 3.0, totalCalories: 5840  },
  '3M': { totalWorkouts: 34,  avgPerWeek: 2.8, totalCalories: 16200 },
  '6M': { totalWorkouts: 67,  avgPerWeek: 2.9, totalCalories: 31800 },
  '1Y': { totalWorkouts: 124, avgPerWeek: 2.6, totalCalories: 58400 },
};

export const weightData3M: WeightDataPoint[] = [
  { date: 'Jan 1',  weight: 74.2, goal: 68 },
  { date: 'Jan 8',  weight: 73.8, goal: 68 },
  { date: 'Jan 15', weight: 73.5, goal: 68 },
  { date: 'Jan 22', weight: 73.9, goal: 68 },
  { date: 'Jan 29', weight: 73.1, goal: 68 },
  { date: 'Feb 5',  weight: 72.8, goal: 68 },
  { date: 'Feb 12', weight: 72.5, goal: 68 },
  { date: 'Feb 19', weight: 72.2, goal: 68 },
  { date: 'Feb 26', weight: 71.9, goal: 68 },
  { date: 'Mar 5',  weight: 71.5, goal: 68 },
  { date: 'Mar 12', weight: 71.2, goal: 68 },
  { date: 'Mar 22', weight: 70.8, goal: 68 },
];

export const weightData1M: WeightDataPoint[] = weightData3M.slice(-5);

export const weightData6M: WeightDataPoint[] = [
  { date: 'Oct 1',  weight: 76.5, goal: 68 },
  { date: 'Oct 15', weight: 76.1, goal: 68 },
  { date: 'Nov 1',  weight: 75.8, goal: 68 },
  { date: 'Nov 15', weight: 75.4, goal: 68 },
  { date: 'Dec 1',  weight: 75.0, goal: 68 },
  { date: 'Dec 15', weight: 74.6, goal: 68 },
  ...weightData3M,
];

export const weightData1Y: WeightDataPoint[] = [
  { date: 'Apr 2025', weight: 78.2, goal: 68 },
  { date: 'May 2025', weight: 77.8, goal: 68 },
  { date: 'Jun 2025', weight: 77.5, goal: 68 },
  { date: 'Jul 2025', weight: 77.1, goal: 68 },
  { date: 'Aug 2025', weight: 76.8, goal: 68 },
  { date: 'Sep 2025', weight: 76.5, goal: 68 },
  ...weightData6M,
];

export const weightDataByRange: Record<TimeRange, WeightDataPoint[]> = {
  '1M': weightData1M,
  '3M': weightData3M,
  '6M': weightData6M,
  '1Y': weightData1Y,
};

export const workoutFrequencyData: WorkoutFrequencyPoint[] = [
  { week: 'W1 Jan', count: 2 },
  { week: 'W2 Jan', count: 3 },
  { week: 'W3 Jan', count: 4 },
  { week: 'W4 Jan', count: 2 },
  { week: 'W1 Feb', count: 3 },
  { week: 'W2 Feb', count: 3 },
  { week: 'W3 Feb', count: 4 },
  { week: 'W4 Feb', count: 3 },
  { week: 'W1 Mar', count: 2 },
  { week: 'W2 Mar', count: 4 },
  { week: 'W3 Mar', count: 3 },
  { week: 'W4 Mar', count: 3 },
];

export const bodyMeasurements: BodyMeasurement[] = [
  { id: 'weight',  label: 'Weight',   unit: 'kg', current: 70.8, starting: 74.2, isLowerBetter: true  },
  { id: 'bodyFat', label: 'Body Fat', unit: '%',  current: 24.2, starting: 27.1, isLowerBetter: true  },
  { id: 'chest',   label: 'Chest',    unit: 'cm', current: 88.0, starting: 90.5, isLowerBetter: true  },
  { id: 'waist',   label: 'Waist',    unit: 'cm', current: 72.0, starting: 77.0, isLowerBetter: true  },
  { id: 'hips',    label: 'Hips',     unit: 'cm', current: 95.0, starting: 98.5, isLowerBetter: true  },
  { id: 'arms',    label: 'Arms',     unit: 'cm', current: 29.5, starting: 28.0, isLowerBetter: false },
];

export const workoutHistory: WorkoutHistoryEntry[] = [
  { id: '1',  date: 'Mar 22, 2026', name: 'Full Body HIIT',      type: 'HIIT',     duration: 45, calories: 520, trainer: 'James Carter' },
  { id: '2',  date: 'Mar 20, 2026', name: 'Upper Body Strength', type: 'Strength', duration: 60, calories: 380, trainer: 'James Carter' },
  { id: '3',  date: 'Mar 18, 2026', name: 'Yoga Flow',           type: 'Yoga',     duration: 50, calories: 210, trainer: 'Coach Maria'  },
  { id: '4',  date: 'Mar 15, 2026', name: 'Spin Class',          type: 'Cycling',  duration: 45, calories: 480, trainer: 'Coach Ben'    },
  { id: '5',  date: 'Mar 13, 2026', name: 'Lower Body Strength', type: 'Strength', duration: 55, calories: 420, trainer: 'James Carter' },
  { id: '6',  date: 'Mar 11, 2026', name: 'Morning HIIT',        type: 'HIIT',     duration: 40, calories: 460, trainer: 'Coach Ben'    },
  { id: '7',  date: 'Mar 08, 2026', name: 'Full Body Strength',  type: 'Strength', duration: 65, calories: 510, trainer: 'James Carter' },
  { id: '8',  date: 'Mar 06, 2026', name: 'Yoga Flow',           type: 'Yoga',     duration: 50, calories: 200, trainer: 'Coach Maria'  },
  { id: '9',  date: 'Mar 04, 2026', name: 'Cardio Blast',        type: 'HIIT',     duration: 35, calories: 390, trainer: 'Coach Ben'    },
  { id: '10', date: 'Mar 01, 2026', name: 'Upper Body HIIT',     type: 'HIIT',     duration: 45, calories: 440, trainer: 'James Carter' },
];

export const workoutTypeBadge: Record<string, {
  bg: string; text: string; border: string;
}> = {
  HIIT:     { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  Yoga:     { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  Strength: { bg: 'bg-ghost',     text: 'text-primary',    border: 'border-stroke'     },
  Cycling:  { bg: 'bg-blue-50',   text: 'text-blue-700',   border: 'border-blue-200'   },
  Pilates:  { bg: 'bg-teal-50',   text: 'text-teal-700',   border: 'border-teal-200'   },
};
