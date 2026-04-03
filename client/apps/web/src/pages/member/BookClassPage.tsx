import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { days } from "@fit-core/shared";
import type { ClassDay } from "@fit-core/shared";
import BookClassFilterBar  from "../../components/member/book/BookClassFilterBar";
import BookClassGrid       from "../../components/member/book/BookClassGrid";
import BookDayView         from "../../components/member/book/BookDayView";
import BookingConfirmModal from "../../components/member/book/BookingConfirmModal";
import {
  bookableClasses,
  classTypeColors,
  type BookableClass,
  type ClassType,
} from "./book/bookClassData";

const DAY_DATES: Record<string, { date: number; month: string }> = {
  Mon: { date: 17, month: "Mar" }, Tue: { date: 18, month: "Mar" },
  Wed: { date: 19, month: "Mar" }, Thu: { date: 20, month: "Mar" },
  Fri: { date: 21, month: "Mar" }, Sat: { date: 22, month: "Mar" },
  Sun: { date: 23, month: "Mar" },
};

type View = "Week" | "Day";

export default function BookClassPage() {
  const { t } = useTranslation('member');
  const [search, setSearch]               = useState('');
  const [typeFilter, setTypeFilter]       = useState('');
  const [trainerFilter, setTrainerFilter] = useState('');
  const [dateFilter, setDateFilter]       = useState('');
  const [selectedClass, setSelectedClass] = useState<BookableClass | null>(null);
  const [isModalOpen, setIsModalOpen]     = useState(false);
  const [isBooking, setIsBooking]         = useState(false);
  const [classes, setClasses]             = useState(bookableClasses);
  const [activeView, setActiveView]       = useState<View>("Week");
  const [viewDay, setViewDay]             = useState<string>("Wed");

  const filteredClasses = classes.filter((c) => {
    const matchesSearch  = search === '' ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.trainer.toLowerCase().includes(search.toLowerCase());
    const matchesType    = typeFilter === '' || c.type === typeFilter;
    const matchesTrainer = trainerFilter === '' || c.trainer === trainerFilter;
    return matchesSearch && matchesType && matchesTrainer;
  });

  const handleBook = (gymClass: BookableClass) => {
    setSelectedClass(gymClass);
    setIsModalOpen(true);
  };

  const handleConfirmBooking = async () => {
    if (!selectedClass) return;
    setIsBooking(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setClasses((prev) =>
      prev.map((c) =>
        c.id === selectedClass.id
          ? { ...c, status: 'Booked' as const, spotsLeft: c.spotsLeft - 1 }
          : c,
      ),
    );
    setIsBooking(false);
    setIsModalOpen(false);
    setSelectedClass(null);
  };

  const handleCloseModal = () => {
    if (isBooking) return;
    setIsModalOpen(false);
    setTimeout(() => setSelectedClass(null), 200);
  };

  const handleClearFilters = () => {
    setSearch('');
    setTypeFilter('');
    setTrainerFilter('');
    setDateFilter('');
  };

  const handlePrevDay = () => {
    const idx = days.indexOf(viewDay as ClassDay);
    if (idx > 0) setViewDay(days[idx - 1]);
  };

  const handleNextDay = () => {
    const idx = days.indexOf(viewDay as ClassDay);
    if (idx < days.length - 1) setViewDay(days[idx + 1]);
  };

  const navLabel = activeView === "Week"
    ? "Mar 17 – 23, 2026"
    : `${DAY_DATES[viewDay].month} ${DAY_DATES[viewDay].date}, 2026`;

  return (
    <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
      {/* Page header */}
      <div className="shrink-0 flex items-center justify-between gap-4 flex-wrap pb-4 border-b border-stroke">
        {/* Left: title + nav */}
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-primary">{t('bookClass')}</h1>
            <p className="text-secondary text-sm mt-0.5">{t('bookClassDesc')}</p>
          </div>
        </div>

        {/* Center: nav arrows + date */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrevDay}
            disabled={activeView === "Day" && viewDay === days[0]}
            className="p-1.5 border border-stroke rounded-lg hover:bg-ghost transition-all duration-DEFAULT text-secondary disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-semibold text-primary px-2">{navLabel}</span>
          <button
            type="button"
            onClick={handleNextDay}
            disabled={activeView === "Day" && viewDay === days[days.length - 1]}
            className="p-1.5 border border-stroke rounded-lg hover:bg-ghost transition-all duration-DEFAULT text-secondary disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right: view toggle */}
        <div className="flex border border-stroke rounded-lg overflow-hidden">
          {(["Week", "Day"] as View[]).map((view) => (
            <button
              key={view}
              type="button"
              onClick={() => {
                setActiveView(view);
                if (view === "Day") setViewDay("Wed");
              }}
              className={`px-4 py-2 text-sm font-medium transition-all duration-DEFAULT ${
                activeView === view
                  ? "bg-navy text-white"
                  : "bg-white text-secondary hover:bg-ghost"
              }`}
            >
              {view === "Week" ? t("week", { ns: "admin" }) : t("day", { ns: "admin" })}
            </button>
          ))}
        </div>
      </div>

      {/* Filter bar */}
      <div className="shrink-0 pt-4">
        <BookClassFilterBar
          search={search}
          onSearchChange={setSearch}
          typeFilter={typeFilter}
          onTypeChange={setTypeFilter}
          trainerFilter={trainerFilter}
          onTrainerChange={setTrainerFilter}
          dateFilter={dateFilter}
          onDateChange={setDateFilter}
          onClearFilters={handleClearFilters}
        />
      </div>

      {/* Legends */}
      <div className="shrink-0 flex flex-wrap gap-x-6 gap-y-2 mb-4">
        <div className="flex gap-4 flex-wrap">
          {(['Yoga', 'HIIT', 'Pilates', 'Cycling', 'Strength'] as ClassType[]).map((type) => (
            <div key={type} className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${classTypeColors[type].dot}`} />
              <span className="text-xs text-secondary">{type}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-4 flex-wrap text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-green/20 border border-green/40 inline-block" />
            <span className="text-secondary">{t('booked')}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-warning/20 border border-warning/40 inline-block" />
            <span className="text-secondary">{t('almostFull')}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-ghost border border-stroke opacity-60 inline-block" />
            <span className="text-secondary">{t('full')}</span>
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 min-h-0 overflow-auto">
        <div className="bg-white border border-stroke rounded-xl shadow-sm overflow-hidden">
          {activeView === "Week" ? (
            <BookClassGrid classes={filteredClasses} onBook={handleBook} />
          ) : (
            <BookDayView day={viewDay} classes={filteredClasses} onBook={handleBook} />
          )}
        </div>
      </div>

      {/* Booking confirmation modal */}
      <BookingConfirmModal
        gymClass={selectedClass}
        isOpen={isModalOpen}
        isLoading={isBooking}
        onConfirm={handleConfirmBooking}
        onClose={handleCloseModal}
      />
    </div>
  );
}
