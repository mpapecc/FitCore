export type BookingStatus = 'Upcoming' | 'Completed' | 'Cancelled';

export interface MyBooking {
  id: string;
  classId: string;
  className: string;
  classType: 'Yoga' | 'HIIT' | 'Pilates' | 'Cycling' | 'Strength';
  date: string;
  time: string;
  duration: number;       // minutes
  trainer: string;
  trainerInitials: string;
  room: string;
  spotsBooked: number;
  capacity: number;
  status: BookingStatus;
  canCancel: boolean;     // false if within 2 hours of class
  userRating?: number;    // 1-5, only for past bookings
}

export const classTypeBorderColors: Record<string, string> = {
  Yoga:     'bg-purple-400',
  HIIT:     'bg-orange-400',
  Pilates:  'bg-teal-400',
  Cycling:  'bg-blue-400',
  Strength: 'bg-navy',
};

export const classTypeBadgeColors: Record<string, {
  bg: string; text: string; border: string;
}> = {
  Yoga:     { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  HIIT:     { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  Pilates:  { bg: 'bg-teal-50',   text: 'text-teal-700',   border: 'border-teal-200'   },
  Cycling:  { bg: 'bg-blue-50',   text: 'text-blue-700',   border: 'border-blue-200'   },
  Strength: { bg: 'bg-ghost',     text: 'text-primary',    border: 'border-stroke'     },
};

export const upcomingBookings: MyBooking[] = [
  {
    id: '1', classId: '1',
    className: 'Morning HIIT', classType: 'HIIT',
    date: 'Today, Mar 22', time: '07:00 AM', duration: 45,
    trainer: 'James Carter', trainerInitials: 'JC',
    room: 'Studio A', spotsBooked: 10, capacity: 12,
    status: 'Upcoming', canCancel: false,   // within 2 hours — too late
  },
  {
    id: '2', classId: '2',
    className: 'Yoga Flow', classType: 'Yoga',
    date: 'Tomorrow, Mar 23', time: '09:30 AM', duration: 60,
    trainer: 'Coach Maria', trainerInitials: 'CM',
    room: 'Wellness Room', spotsBooked: 8, capacity: 15,
    status: 'Upcoming', canCancel: true,
  },
  {
    id: '3', classId: '5',
    className: 'Strength & Conditioning', classType: 'Strength',
    date: 'Wed, Mar 24', time: '06:00 PM', duration: 60,
    trainer: 'James Carter', trainerInitials: 'JC',
    room: 'Weight Room', spotsBooked: 9, capacity: 12,
    status: 'Upcoming', canCancel: true,
  },
  {
    id: '4', classId: '7',
    className: 'Morning Yoga', classType: 'Yoga',
    date: 'Thu, Mar 25', time: '08:00 AM', duration: 60,
    trainer: 'Coach Maria', trainerInitials: 'CM',
    room: 'Wellness Room', spotsBooked: 12, capacity: 15,
    status: 'Upcoming', canCancel: true,
  },
  {
    id: '5', classId: '11',
    className: 'Weekend HIIT', classType: 'HIIT',
    date: 'Sat, Mar 27', time: '09:00 AM', duration: 45,
    trainer: 'James Carter', trainerInitials: 'JC',
    room: 'Studio A', spotsBooked: 7, capacity: 12,
    status: 'Upcoming', canCancel: true,
  },
];

export const pastBookings: MyBooking[] = [
  {
    id: '6', classId: '10',
    className: 'Full Body HIIT', classType: 'HIIT',
    date: 'Sat, Mar 15', time: '07:00 AM', duration: 45,
    trainer: 'James Carter', trainerInitials: 'JC',
    room: 'Studio A', spotsBooked: 12, capacity: 12,
    status: 'Completed', canCancel: false, userRating: 5,
  },
  {
    id: '7', classId: '9',
    className: 'Yoga Flow', classType: 'Yoga',
    date: 'Thu, Mar 13', time: '09:30 AM', duration: 60,
    trainer: 'Coach Maria', trainerInitials: 'CM',
    room: 'Wellness Room', spotsBooked: 10, capacity: 15,
    status: 'Completed', canCancel: false, userRating: 4,
  },
  {
    id: '8', classId: '8',
    className: 'Spin Class', classType: 'Cycling',
    date: 'Tue, Mar 11', time: '07:30 AM', duration: 45,
    trainer: 'Coach Ben', trainerInitials: 'CB',
    room: 'Cycling Studio', spotsBooked: 12, capacity: 12,
    status: 'Completed', canCancel: false, userRating: undefined,
  },
];
