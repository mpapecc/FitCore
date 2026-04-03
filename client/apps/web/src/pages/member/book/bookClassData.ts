export type ClassType = 'Yoga' | 'HIIT' | 'Pilates' | 'Cycling' | 'Strength';

export type ClassStatus =
  | 'Available'   // spots > 3
  | 'AlmostFull'  // 1-3 spots left
  | 'Full'        // 0 spots
  | 'Booked';     // member already booked

export interface BookableClass {
  id:        string;
  name:      string;
  type:      ClassType;
  trainer:   string;
  day:       'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  startTime: string;  // "07:00"
  duration:  number;  // minutes
  capacity:  number;
  spotsLeft: number;
  status:    ClassStatus;
}

export const classTypeColors: Record<ClassType, { bg: string; border: string; text: string; dot: string }> = {
  Yoga:     { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', dot: 'bg-purple-400' },
  HIIT:     { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', dot: 'bg-orange-400' },
  Pilates:  { bg: 'bg-teal-50',   border: 'border-teal-200',   text: 'text-teal-700',   dot: 'bg-teal-400'   },
  Cycling:  { bg: 'bg-blue-50',   border: 'border-blue-200',   text: 'text-blue-700',   dot: 'bg-blue-400'   },
  Strength: { bg: 'bg-ghost',     border: 'border-stroke',     text: 'text-primary',    dot: 'bg-navy'       },
};

export function getClassStatus(spotsLeft: number, isBooked: boolean): ClassStatus {
  if (isBooked) return 'Booked';
  if (spotsLeft === 0) return 'Full';
  if (spotsLeft <= 3) return 'AlmostFull';
  return 'Available';
}

export const bookableClasses: BookableClass[] = [
  // Monday
  { id: '1',  name: 'Morning HIIT',            type: 'HIIT',     trainer: 'James Carter', day: 'Mon', startTime: '07:00', duration: 45, capacity: 12, spotsLeft: 0,  status: 'Booked'     },
  { id: '2',  name: 'Yoga Flow',               type: 'Yoga',     trainer: 'Coach Maria',  day: 'Mon', startTime: '09:00', duration: 60, capacity: 15, spotsLeft: 8,  status: 'Available'  },
  // Tuesday
  { id: '3',  name: 'Spin Class',              type: 'Cycling',  trainer: 'Coach Ben',    day: 'Tue', startTime: '07:30', duration: 45, capacity: 12, spotsLeft: 2,  status: 'AlmostFull' },
  { id: '4',  name: 'Pilates Core',            type: 'Pilates',  trainer: 'Coach Maria',  day: 'Tue', startTime: '10:00', duration: 50, capacity: 10, spotsLeft: 5,  status: 'Available'  },
  // Wednesday
  { id: '5',  name: 'Strength & Conditioning', type: 'Strength', trainer: 'James Carter', day: 'Wed', startTime: '06:00', duration: 60, capacity: 12, spotsLeft: 4,  status: 'Available'  },
  { id: '6',  name: 'Evening HIIT',            type: 'HIIT',     trainer: 'Coach Ben',    day: 'Wed', startTime: '18:00', duration: 45, capacity: 12, spotsLeft: 0,  status: 'Full'       },
  // Thursday
  { id: '7',  name: 'Morning Yoga',            type: 'Yoga',     trainer: 'Coach Maria',  day: 'Thu', startTime: '08:00', duration: 60, capacity: 15, spotsLeft: 3,  status: 'AlmostFull' },
  { id: '8',  name: 'Cycling Blast',           type: 'Cycling',  trainer: 'Coach Ben',    day: 'Thu', startTime: '17:00', duration: 45, capacity: 12, spotsLeft: 0,  status: 'Full'       },
  // Friday
  { id: '9',  name: 'Full Body Strength',      type: 'Strength', trainer: 'James Carter', day: 'Fri', startTime: '07:00', duration: 60, capacity: 12, spotsLeft: 6,  status: 'Available'  },
  { id: '10', name: 'Pilates Stretch',         type: 'Pilates',  trainer: 'Coach Maria',  day: 'Fri', startTime: '10:00', duration: 50, capacity: 10, spotsLeft: 1,  status: 'AlmostFull' },
  // Saturday
  { id: '11', name: 'Weekend HIIT',            type: 'HIIT',     trainer: 'James Carter', day: 'Sat', startTime: '09:00', duration: 45, capacity: 12, spotsLeft: 7,  status: 'Available'  },
  // Sunday
  { id: '12', name: 'Sunday Yoga',             type: 'Yoga',     trainer: 'Coach Maria',  day: 'Sun', startTime: '10:00', duration: 60, capacity: 15, spotsLeft: 10, status: 'Available'  },
];

export const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;

export const timeSlots = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00',
];

// Week dates Mar 17-23
export const weekDates: Record<string, string> = {
  Mon: 'Mar 17', Tue: 'Mar 18', Wed: 'Mar 19',
  Thu: 'Mar 20', Fri: 'Mar 21', Sat: 'Mar 22', Sun: 'Mar 23',
};

// Today is Wednesday
export const TODAY_DAY = 'Wed';
