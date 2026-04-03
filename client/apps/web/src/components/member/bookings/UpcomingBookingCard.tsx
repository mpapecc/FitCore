import { Calendar, Clock, MapPin, X } from "lucide-react";
import {
  type MyBooking,
  classTypeBorderColors,
  classTypeBadgeColors,
} from "../../../pages/member/bookings/myBookingsData";

interface UpcomingBookingCardProps {
  booking: MyBooking;
  onCancel: (id: string) => void;
}

export function UpcomingBookingCard({
  booking,
  onCancel,
}: UpcomingBookingCardProps) {
  const borderColor = classTypeBorderColors[booking.classType];
  const badge = classTypeBadgeColors[booking.classType];
  const spotsPercent = (booking.spotsBooked / booking.capacity) * 100;

  return (
    <div className="flex bg-white border border-stroke rounded-xl shadow-sm overflow-hidden hover:shadow-md duration-DEFAULT">
      {/* Left color bar */}
      <div className={`w-1.5 flex-shrink-0 ${borderColor}`} />

      {/* Main content */}
      <div className="flex-1 p-5">
        {/* Row 1: name + badge / cancel */}
        <div className="flex items-start justify-between">
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-primary font-bold text-base">
              {booking.className}
            </span>
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border ${badge.bg} ${badge.text} ${badge.border}`}
            >
              {booking.classType}
            </span>
          </div>

          {booking.canCancel ? (
            <button
              onClick={() => onCancel(booking.id)}
              className="flex items-center gap-1.5 border border-error/30 text-error text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-error/5 duration-DEFAULT"
            >
              <X className="w-3.5 h-3.5" />
              Cancel Booking
            </button>
          ) : (
            <span className="text-secondary text-xs italic">Cannot cancel</span>
          )}
        </div>

        {/* Row 2: detail chips */}
        <div className="flex items-center gap-4 mt-3 flex-wrap">
          <span className="flex items-center gap-1.5 text-secondary text-sm">
            <Calendar className="w-4 h-4" />
            {booking.date}
          </span>
          <span className="flex items-center gap-1.5 text-secondary text-sm">
            <Clock className="w-4 h-4" />
            {booking.time} · {booking.duration} min
          </span>
          <span className="flex items-center gap-1.5 text-secondary text-sm">
            <MapPin className="w-4 h-4" />
            {booking.room}
          </span>
        </div>

        {/* Row 3: trainer + spots */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-stroke">
          {/* Trainer */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-navy text-white text-xs font-semibold flex items-center justify-center">
              {booking.trainerInitials}
            </div>
            <span className="text-primary text-sm font-medium">
              {booking.trainer}
            </span>
          </div>

          {/* Spots indicator */}
          <div className="flex items-center gap-2">
            <div className="w-24 h-1.5 bg-ghost rounded-full">
              <div
                className="bg-green h-1.5 rounded-full"
                style={{ width: `${spotsPercent}%` }}
              />
            </div>
            <span className="text-secondary text-xs">
              {booking.spotsBooked}/{booking.capacity}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
