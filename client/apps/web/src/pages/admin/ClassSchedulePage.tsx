import { useState } from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import type { GymClass, ClassDay } from "@fit-core/shared";
import { days } from "@fit-core/shared";

import { ScheduleGrid } from "../../components/schedule/ScheduleGrid";
import { DayView } from "../../components/schedule/DayView";
import { ClassModal } from "../../components/schedule/ClassModal";
import { ScheduleFilterBar } from "../../components/schedule/ScheduleFilterBar";
import {
  weekClasses,
  classTypeColors,
} from "../../components/schedule/scheduleData";

const DAY_DATES: Record<string, { date: number; month: string }> = {
  Mon: { date: 17, month: "Mar" },
  Tue: { date: 18, month: "Mar" },
  Wed: { date: 19, month: "Mar" },
  Thu: { date: 20, month: "Mar" },
  Fri: { date: 21, month: "Mar" },
  Sat: { date: 22, month: "Mar" },
  Sun: { date: 23, month: "Mar" },
};

type ClassFormData = {
  name: string;
  type: GymClass["type"];
  trainer: string;
  day: string;
  startTime: string;
  duration: number;
  capacity: number;
};

type View = "Week" | "Day";

const CLASS_TYPES = Object.keys(classTypeColors) as GymClass["type"][];

export default function ClassSchedulePage() {
  const [classes, setClasses] = useState<GymClass[]>(weekClasses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<GymClass | null>(null);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [activeView, setActiveView] = useState<View>("Week");
  const [viewDay, setViewDay] = useState<string>("Wed");
  const [trainerFilter, setTrainerFilter] = useState("");
  const [classTypeFilter, setClassTypeFilter] = useState("");
  const [classNameSearch, setClassNameSearch] = useState("");

  // --- filter logic ---
  const filteredClasses = classes.filter((gymClass) => {
    const matchesTrainer =
      trainerFilter === "" || gymClass.trainer === trainerFilter;
    const matchesType =
      classTypeFilter === "" || gymClass.type === classTypeFilter;
    const matchesSearch =
      classNameSearch === "" ||
      gymClass.name.toLowerCase().includes(classNameSearch.toLowerCase()) ||
      gymClass.trainer.toLowerCase().includes(classNameSearch.toLowerCase());
    return matchesTrainer && matchesType && matchesSearch;
  });

  function handleClearFilters(): void {
    setTrainerFilter("");
    setClassTypeFilter("");
    setClassNameSearch("");
  }

  // --- handlers ---
  function handleEditClass(id: string): void {
    const found = classes.find((c) => c.id === id) ?? null;
    setSelectedClass(found);
    setIsModalOpen(true);
  }

  function handleDeleteClass(id: string): void {
    if (window.confirm("Are you sure you want to delete this class?")) {
      setClasses((prev) => prev.filter((c) => c.id !== id));
    }
  }

  function handleAddClass(day: string, time: string): void {
    setSelectedClass(null);
    setSelectedDay(day);
    setSelectedTime(time);
    setIsModalOpen(true);
  }

  function handleSubmit(data: ClassFormData): void {
    const day = data.day as ClassDay;
    if (selectedClass) {
      setClasses((prev) =>
        prev.map((c) =>
          c.id === selectedClass.id ? { ...c, ...data, day } : c,
        ),
      );
    } else {
      const newClass: GymClass = {
        ...data,
        id: String(Date.now()),
        booked: 0,
        day,
      };
      setClasses((prev) => [...prev, newClass]);
    }
    handleClose();
  }

  function handlePrevNav(): void {
    if (activeView === "Day") {
      const idx = days.indexOf(viewDay as ClassDay);
      if (idx > 0) setViewDay(days[idx - 1]);
    }
  }

  function handleNextNav(): void {
    if (activeView === "Day") {
      const idx = days.indexOf(viewDay as ClassDay);
      if (idx < days.length - 1) setViewDay(days[idx + 1]);
    }
  }

  function handleClose(): void {
    setSelectedClass(null);
    setSelectedDay("");
    setSelectedTime("");
    setIsModalOpen(false);
  }

  return (
    <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
      {/* Page header — fixed above grid */}
      <div className="shrink-0 flex items-center justify-between gap-4 flex-wrap pb-4 border-b border-stroke">
        {/* Left: navigation */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrevNav}
            disabled={activeView === "Day" && viewDay === days[0]}
            className="border border-stroke rounded-lg p-1.5 text-secondary hover:text-primary hover:bg-ghost transition-all duration-DEFAULT disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm font-semibold text-primary px-2">
            {activeView === "Week"
              ? "Mar 17 – 23, 2026"
              : `${DAY_DATES[viewDay].month} ${DAY_DATES[viewDay].date}, 2026`}
          </span>
          <button
            onClick={handleNextNav}
            disabled={activeView === "Day" && viewDay === days[days.length - 1]}
            className="border border-stroke rounded-lg p-1.5 text-secondary hover:text-primary hover:bg-ghost transition-all duration-DEFAULT disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Center: legend */}
        <div className="flex items-center gap-4 flex-wrap">
          {CLASS_TYPES.map((type) => (
            <div key={type} className="flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full ${classTypeColors[type].dot}`}
              />
              <span className="text-xs text-secondary">{type}</span>
            </div>
          ))}
        </div>

        {/* Right: view toggle + add button */}
        <div className="flex items-center gap-3">
          <div className="flex border border-stroke rounded-lg overflow-hidden">
            {(["Week", "Day"] as View[]).map((view) => (
              <button
                key={view}
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
                {view}
              </button>
            ))}
          </div>
          <button
            onClick={() => handleAddClass("", "")}
            className="flex items-center gap-2 bg-green text-white font-semibold px-4 py-2 rounded-lg transition-all duration-DEFAULT active:scale-95 hover:bg-green-hover"
          >
            <Plus size={16} />
            Add Class
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="shrink-0 pt-4">
        <ScheduleFilterBar
          trainerFilter={trainerFilter}
          onTrainerChange={setTrainerFilter}
          classTypeFilter={classTypeFilter}
          onClassTypeChange={setClassTypeFilter}
          classNameSearch={classNameSearch}
          onClassNameSearchChange={setClassNameSearch}
          onClearFilters={handleClearFilters}
        />
      </div>

      {/* Scrollable grid */}
      <div className="flex-1 min-h-0 overflow-auto pt-4">
        {filteredClasses.length === 0 ? (
          <div className="bg-white border border-stroke rounded-lg shadow-sm flex items-center justify-center py-20">
            <p className="text-secondary text-sm">No classes match your filters</p>
          </div>
        ) : (
          <div className="bg-white border border-stroke rounded-lg shadow-sm overflow-hidden">
            {activeView === "Week" ? (
              <ScheduleGrid
                classes={filteredClasses}
                onEditClass={handleEditClass}
                onDeleteClass={handleDeleteClass}
                onAddClass={handleAddClass}
              />
            ) : (
              <DayView
                day={viewDay}
                classes={filteredClasses}
                onEditClass={handleEditClass}
                onDeleteClass={handleDeleteClass}
                onAddClass={handleAddClass}
              />
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      <ClassModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        initialDay={selectedDay}
        initialTime={selectedTime}
        editClass={selectedClass}
      />
    </div>
  );
}
