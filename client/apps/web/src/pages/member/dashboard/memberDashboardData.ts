export interface UpcomingClass {
  id:        string;
  name:      string;
  date:      string;
  time:      string;
  trainer:   string;
  type:      'HIIT' | 'Yoga' | 'Strength' | 'Cycling' | 'Pilates';
  spotsLeft: number;
}

export interface RecentWorkout {
  id:       string;
  name:     string;
  date:     string;
  duration: number;  // minutes
  calories: number;
  trainer:  string;
  type:     string;
}

export interface WeeklyActivity {
  day:      string;
  duration: number;  // minutes, 0 if no workout
}

export const upcomingClasses: UpcomingClass[] = [
  { id: '1', name: 'Morning HIIT',            date: 'Today',     time: '07:00 AM', trainer: 'James Carter', type: 'HIIT',     spotsLeft: 2 },
  { id: '2', name: 'Yoga Flow',               date: 'Tomorrow',  time: '09:30 AM', trainer: 'Coach Maria',  type: 'Yoga',     spotsLeft: 5 },
  { id: '3', name: 'Strength & Conditioning', date: 'Wed Mar 26', time: '06:00 PM', trainer: 'James Carter', type: 'Strength', spotsLeft: 4 },
  { id: '4', name: 'Spin Class',              date: 'Thu Mar 27', time: '07:30 AM', trainer: 'Coach Ben',    type: 'Cycling',  spotsLeft: 1 },
];

export const recentWorkouts: RecentWorkout[] = [
  { id: '1', name: 'Full Body HIIT',      date: 'Mar 22, 2026', duration: 45, calories: 520, trainer: 'James Carter', type: 'HIIT'     },
  { id: '2', name: 'Yoga Flow',           date: 'Mar 20, 2026', duration: 50, calories: 210, trainer: 'Coach Maria',  type: 'Yoga'     },
  { id: '3', name: 'Upper Body Strength', date: 'Mar 18, 2026', duration: 60, calories: 380, trainer: 'James Carter', type: 'Strength' },
];

export const weeklyActivity: WeeklyActivity[] = [
  { day: 'Mon', duration: 45 },
  { day: 'Tue', duration: 0  },
  { day: 'Wed', duration: 60 },
  { day: 'Thu', duration: 50 },
  { day: 'Fri', duration: 0  },
  { day: 'Sat', duration: 45 },
  { day: 'Sun', duration: 0  },
];

export const memberStats = {
  workoutsThisMonth: 12,
  currentStreak:     5,
  nextClass: {
    name: 'Morning HIIT',
    time: '07:00 AM',
    date: 'Today',
  },
};

export const classTypeColors: Record<string, { bg: string; text: string; dot: string }> = {
  HIIT:     { bg: 'bg-orange-50', text: 'text-orange-600', dot: 'bg-orange-400' },
  Yoga:     { bg: 'bg-purple-50', text: 'text-purple-600', dot: 'bg-purple-400' },
  Strength: { bg: 'bg-navy/5',    text: 'text-navy',       dot: 'bg-navy'       },
  Cycling:  { bg: 'bg-blue-50',   text: 'text-blue-600',   dot: 'bg-blue-400'   },
  Pilates:  { bg: 'bg-teal-50',   text: 'text-teal-600',   dot: 'bg-teal-400'   },
};
