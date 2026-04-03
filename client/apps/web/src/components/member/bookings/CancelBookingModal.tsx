import { AlertCircle, Loader2 } from "lucide-react";
import { type MyBooking } from "../../../pages/member/bookings/myBookingsData";

interface CancelBookingModalProps {
  booking: MyBooking | null;
  isOpen: boolean;
  isLoading: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function CancelBookingModal({
  booking,
  isOpen,
  isLoading,
  onConfirm,
  onClose,
}: CancelBookingModalProps) {
  if (!isOpen || !booking) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm z-50">
        {/* Header */}
        <div className="px-6 pt-6 pb-0 text-center">
          <div className="bg-error/10 rounded-full p-2.5 w-fit mx-auto mb-3">
            <AlertCircle className="w-12 h-12 text-error" />
          </div>
          <h2 className="text-xl font-bold text-primary">Cancel Booking?</h2>
          <p className="text-secondary text-sm mt-1">
            {booking.className} · {booking.date} at {booking.time}
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-4 text-center">
          <p className="text-secondary text-sm leading-relaxed">
            Are you sure you want to cancel this booking? This action cannot be
            undone.
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex flex-col gap-2.5">
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 bg-error text-white font-semibold w-full py-2.5 rounded-lg duration-DEFAULT active:scale-95 disabled:opacity-70"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Yes, Cancel Booking
          </button>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="border border-stroke text-primary hover:bg-ghost w-full py-2.5 rounded-lg duration-DEFAULT"
          >
            Keep My Booking
          </button>
        </div>
      </div>
    </div>
  );
}
