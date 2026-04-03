import { type DayOfWeek } from '../../../pages/member/nutrition/myNutritionData';

interface DaySelectorProps {
  days: DayOfWeek[];
  activeDay: DayOfWeek;
  today: DayOfWeek;
  onSelect: (day: DayOfWeek) => void;
}

export function DaySelector({ days, activeDay, today, onSelect }: DaySelectorProps) {
  return (
    <div className="bg-white border border-stroke rounded-xl shadow-sm p-2 flex gap-1 overflow-x-auto">
      {days.map((day) => {
        const isActive = day === activeDay;
        const isToday  = day === today;

        return (
          <button
            key={day}
            onClick={() => onSelect(day)}
            className={`
              flex-1 min-w-[48px] flex flex-col items-center py-2.5 px-1
              rounded-lg text-center duration-DEFAULT cursor-pointer
              ${isActive ? 'bg-green' : isToday ? 'ring-1 ring-green/40' : ''}
            `}
          >
            {/* Today indicator dot */}
            <span className={`w-1.5 h-1.5 rounded-full mb-1 ${
              isActive && isToday ? 'bg-white' :
              isToday             ? 'bg-green/40' :
                                    'invisible'
            }`} />

            {/* Day label */}
            <span className={`text-sm ${
              isActive
                ? 'text-white font-semibold'
                : 'text-secondary hover:text-primary'
            }`}>
              {day}
            </span>
          </button>
        );
      })}
    </div>
  );
}
