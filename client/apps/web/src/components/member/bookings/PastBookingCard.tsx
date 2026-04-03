import { useState } from "react";
import { Calendar, Clock, MapPin, CheckCircle, Star } from "lucide-react";
import {
  type MyBooking,
  classTypeBorderColors,
  classTypeBadgeColors,
} from "../../../pages/member/bookings/myBookingsData";

interface PastBookingCardProps {
  booking: MyBooking;
  onRate: (id: string, rating: number) => void;
}

export function PastBookingCard({ booking, onRate }: PastBookingCardProps) {
  const [hovered, setHovered] = useState(0);
  const borderColor = classTypeBorderColors[booking.classType];
  const badge = classTypeBadgeColors[booking.classType];

  return (
    <div className="flex bg-white border border-stroke rounded-xl shadow-sm overflow-hidden hover:shadow-md duration-DEFAULT">
      {/* Left color bar */}
      <div className={`w-1.5 flex-shrink-0 ${borderColor}`} />

      {/* Main content */}
      <div className="flex-1 p-5">
        {/* Row 1: name + badge / completed badge */}
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

          <span className="flex items-center gap-1 bg-success/10 text-success border border-success/30 rounded-full px-3 py-1 text-xs font-bold uppercase">
            <CheckCircle className="w-3.5 h-3.5" />
            Completed
          </span>
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

        {/* Row 3: trainer + star rating */}
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

          {/* Star rating */}
          <div className="flex items-center">
            {booking.userRating != null ? (
              <>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${star <= booking.userRating! ? "text-warning fill-warning" : "text-secondary/20"}`}
                  />
                ))}
                <span className="text-secondary text-xs ml-1">
                  Rated {booking.userRating}/5
                </span>
              </>
            ) : (
              <>
                <span className="text-secondary text-xs mr-1">
                  Rate this class:
                </span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => onRate(booking.id, star)}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                    className="p-0.5"
                  >
                    <Star
                      className={`w-4 h-4 duration-DEFAULT ${
                        star <= hovered
                          ? "text-warning fill-warning"
                          : "text-secondary/30"
                      }`}
                    />
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
