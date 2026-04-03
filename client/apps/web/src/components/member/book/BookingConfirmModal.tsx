import { X, Calendar, Clock, User, Users, Info, Loader2 } from "lucide-react";
import type { BookableClass } from "../../../pages/member/book/bookClassData";
import { classTypeColors, weekDates } from "../../../pages/member/book/bookClassData";

interface BookingConfirmModalProps {
  gymClass:  BookableClass | null;
  isOpen:    boolean;
  isLoading: boolean;
  onConfirm: () => void;
  onClose:   () => void;
}

function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return m === 0 ? `${hour}:00 ${period}` : `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

export default function BookingConfirmModal({
  gymClass,
  isOpen,
  isLoading,
  onConfirm,
  onClose,
}: BookingConfirmModalProps) {
  if (!isOpen || !gymClass) return null;

  const colors = classTypeColors[gymClass.type];
  const isAlmostFull = gymClass.status === "AlmostFull";

  return (
    <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
      <div
        className={`bg-white rounded-2xl shadow-2xl w-full max-w-md z-50 transition-all duration-DEFAULT ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex justify-between items-start">
          <h2 className="text-xl font-bold text-primary">Confirm Booking</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-secondary hover:text-primary transition-all duration-DEFAULT"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Class details card */}
        <div className="mx-6 mb-5 bg-ghost border border-stroke rounded-xl p-4">
          {/* Top row */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${colors.dot}`} />
              <p className="font-bold text-primary truncate">{gymClass.name}</p>
            </div>
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border flex-shrink-0 ${colors.bg} ${colors.text} ${colors.border}`}>
              {gymClass.type}
            </span>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="flex items-start gap-2">
              <Calendar className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-secondary text-xs">Date</p>
                <p className="text-primary text-sm font-medium">
                  {weekDates[gymClass.day]} · {gymClass.day}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-secondary text-xs">Time</p>
                <p className="text-primary text-sm font-medium">
                  {formatTime(gymClass.startTime)} · {gymClass.duration} min
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <User className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-secondary text-xs">Trainer</p>
                <p className="text-primary text-sm font-medium">{gymClass.trainer}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Users className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-secondary text-xs">Spots</p>
                <p className={`text-sm font-medium ${isAlmostFull ? "text-warning" : "text-primary"}`}>
                  {gymClass.spotsLeft} spots remaining
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cancellation policy */}
        <div className="mx-6 mb-5 bg-warning/5 border border-warning/20 rounded-lg p-3 flex items-start gap-2">
          <Info className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
          <p className="text-secondary text-xs leading-relaxed">
            You can cancel up to 2 hours before the class starts.
            Late cancellations cannot be refunded.
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="w-full bg-green hover:bg-green-hover text-white font-semibold py-3 rounded-lg transition-all duration-DEFAULT active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            Confirm Booking
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full border border-stroke text-primary hover:bg-ghost font-semibold py-3 rounded-lg transition-all duration-DEFAULT"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
