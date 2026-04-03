import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CalendarX, History } from 'lucide-react';
import { CancellationBanner }  from '../../components/member/bookings/CancellationBanner';
import { UpcomingBookingCard } from '../../components/member/bookings/UpcomingBookingCard';
import { PastBookingCard }     from '../../components/member/bookings/PastBookingCard';
import { CancelBookingModal }  from '../../components/member/bookings/CancelBookingModal';
import {
  upcomingBookings,
  pastBookings,
  type MyBooking,
} from './bookings/myBookingsData';

type ActiveTab = 'Upcoming' | 'Past';

export default function MyBookingsPage() {
  const { t } = useTranslation('member');
  const navigate = useNavigate();
  const [activeTab, setActiveTab]       = useState<ActiveTab>('Upcoming');
  const [bookings, setBookings]         = useState(upcomingBookings);
  const [pastList, setPastList]         = useState(pastBookings);
  const [cancelTarget, setCancelTarget] = useState<MyBooking | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancelClick = (id: string) => {
    const booking = bookings.find(b => b.id === id);
    if (booking) setCancelTarget(booking);
  };

  const handleConfirmCancel = async () => {
    if (!cancelTarget) return;
    setIsCancelling(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setBookings(prev => prev.filter(b => b.id !== cancelTarget.id));
    setIsCancelling(false);
    setCancelTarget(null);
  };

  const handleRate = (id: string, rating: number) => {
    setPastList(prev =>
      prev.map(b => b.id === id ? { ...b, userRating: rating } : b)
    );
  };

  return (
    <div className="p-8">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary">{t('myBookings')}</h1>
        <p className="text-secondary text-sm mt-0.5">{t('myBookingsDesc')}</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stroke mb-6">
        {(['Upcoming', 'Past'] as ActiveTab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              px-6 py-3 text-sm font-medium border-b-2 duration-DEFAULT
              ${activeTab === tab
                ? 'border-green text-green'
                : 'border-transparent text-secondary hover:text-primary hover:border-stroke'
              }
            `}
          >
            {tab === 'Upcoming' ? t('upcoming') : t('past')}
            <span className={`
              ml-2 px-2 py-0.5 rounded-full text-xs font-bold
              ${activeTab === tab
                ? 'bg-green/10 text-green'
                : 'bg-ghost text-secondary'
              }
            `}>
              {tab === 'Upcoming' ? bookings.length : pastList.length}
            </span>
          </button>
        ))}
      </div>

      {/* Upcoming tab */}
      {activeTab === 'Upcoming' && (
        <div>
          <CancellationBanner />
          {bookings.length > 0 ? (
            <div className="flex flex-col gap-4">
              {bookings.map(booking => (
                <UpcomingBookingCard
                  key={booking.id}
                  booking={booking}
                  onCancel={handleCancelClick}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <CalendarX className="w-12 h-12 text-secondary/30 mb-4" />
              <p className="text-primary font-semibold text-lg">{t('noUpcomingBookings')}</p>
              <p className="text-secondary text-sm mt-1 mb-6">{t('bookClassToStart')}</p>
              <button
                onClick={() => navigate('/member/book')}
                className="bg-green text-white font-semibold px-6 py-2.5 rounded-lg duration-DEFAULT active:scale-95"
              >
                {t('browseClasses')}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Past tab */}
      {activeTab === 'Past' && (
        <div>
          {pastList.length > 0 ? (
            <div className="flex flex-col gap-4">
              {pastList.map(booking => (
                <PastBookingCard
                  key={booking.id}
                  booking={booking}
                  onRate={handleRate}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <History className="w-12 h-12 text-secondary/30 mb-4" />
              <p className="text-primary font-semibold">{t('noPastBookings')}</p>
              <p className="text-secondary text-sm mt-1">{t('completedClassesAppear')}</p>
            </div>
          )}
        </div>
      )}

      {/* Cancel modal */}
      <CancelBookingModal
        booking={cancelTarget}
        isOpen={!!cancelTarget}
        isLoading={isCancelling}
        onConfirm={handleConfirmCancel}
        onClose={() => !isCancelling && setCancelTarget(null)}
      />
    </div>
  );
}
