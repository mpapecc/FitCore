import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { ClassType, GymClass } from "@fit-core/shared";
import { classTypeColors } from "./scheduleData";

interface ClassFormData {
  name: string;
  type: ClassType;
  trainer: string;
  day: string;
  startTime: string;
  duration: number;
  capacity: number;
}

interface ClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ClassFormData) => void;
  initialDay?: string;
  initialTime?: string;
  editClass?: GymClass | null;
}

const CLASS_TYPES: ClassType[] = ["Yoga", "HIIT", "Pilates", "Cycling", "Strength"];
const TRAINERS = ["James Carter", "Coach Maria", "Coach Ben"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DURATIONS = [30, 45, 60, 90];
const HOURS = Array.from({ length: 16 }, (_, i) => String(i + 6).padStart(2, "0"));
const MINUTES = ["00", "15", "30", "45"];

function formatHour(h: string): string {
  const n = parseInt(h, 10);
  if (n === 12) return "12 PM";
  return n > 12 ? `${n - 12} PM` : `${n} AM`;
}

const DEFAULT_FORM: ClassFormData = {
  name: "",
  type: "HIIT",
  trainer: "",
  day: "",
  startTime: "",
  duration: 45,
  capacity: 12,
};

const INPUT_CLASS =
  "w-full border border-stroke rounded-lg px-3 py-2.5 text-primary focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent transition-all duration-DEFAULT";

export function ClassModal({
  isOpen,
  onClose,
  onSubmit,
  initialDay,
  initialTime,
  editClass,
}: ClassModalProps) {
  const [form, setForm] = useState<ClassFormData>(DEFAULT_FORM);

  useEffect(() => {
    if (!isOpen) {
      setForm(DEFAULT_FORM);
      return;
    }
    if (editClass) {
      setForm({
        name:      editClass.name,
        type:      editClass.type,
        trainer:   editClass.trainer,
        day:       editClass.day,
        startTime: editClass.startTime,
        duration:  editClass.duration,
        capacity:  editClass.capacity,
      });
    } else {
      setForm({
        ...DEFAULT_FORM,
        day:       initialDay  ?? "",
        startTime: initialTime ?? "",
      });
    }
  }, [isOpen, editClass, initialDay, initialTime]);

  function set<K extends keyof ClassFormData>(field: K, value: ClassFormData[K]): void {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const isEditing = Boolean(editClass);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-DEFAULT ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col transition-transform duration-DEFAULT ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-stroke flex justify-between items-center shrink-0">
          <h2 className="text-primary font-semibold text-lg">
            {isEditing ? "Edit Class" : "Add Class"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded text-secondary hover:text-primary hover:bg-ghost transition-all duration-DEFAULT"
            aria-label="Close panel"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 flex flex-col gap-5 overflow-y-auto flex-1">

          {/* Class Name */}
          <div>
            <label className="text-sm font-medium text-primary mb-1.5 block">Class Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="e.g. Morning HIIT"
              className={INPUT_CLASS}
            />
          </div>

          {/* Class Type */}
          <div>
            <label className="text-sm font-medium text-primary mb-1.5 block">Class Type</label>
            <div className="relative flex items-center">
              {/* Colored dot reflecting current selection */}
              <span
                className={`absolute left-3 w-2 h-2 rounded-full shrink-0 ${classTypeColors[form.type].dot}`}
              />
              <select
                value={form.type}
                onChange={(e) => set("type", e.target.value as ClassType)}
                className={`${INPUT_CLASS} pl-8`}
              >
                {CLASS_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Trainer */}
          <div>
            <label className="text-sm font-medium text-primary mb-1.5 block">Trainer</label>
            <select
              value={form.trainer}
              onChange={(e) => set("trainer", e.target.value)}
              className={INPUT_CLASS}
            >
              <option value="">Select a trainer</option>
              {TRAINERS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Day */}
          <div>
            <label className="text-sm font-medium text-primary mb-1.5 block">Day</label>
            <select
              value={form.day}
              onChange={(e) => set("day", e.target.value)}
              className={INPUT_CLASS}
            >
              <option value="">Select a day</option>
              {DAYS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Start Time */}
          <div>
            <label className="text-sm font-medium text-primary mb-1.5 block">Start Time</label>
            {(() => {
              const [tHour, tMin] = form.startTime
                ? form.startTime.split(":")
                : ["", "00"];
              return (
                <div className="flex gap-2">
                  <select
                    value={tHour}
                    onChange={(e) => {
                      const h = e.target.value;
                      set("startTime", h ? `${h}:${tMin || "00"}` : "");
                    }}
                    className={`${INPUT_CLASS} flex-1`}
                  >
                    <option value="">Hour</option>
                    {HOURS.map((h) => (
                      <option key={h} value={h}>{formatHour(h)}</option>
                    ))}
                  </select>
                  <select
                    value={tMin || "00"}
                    onChange={(e) => {
                      const m = e.target.value;
                      set("startTime", tHour ? `${tHour}:${m}` : "");
                    }}
                    className={`${INPUT_CLASS} w-20`}
                  >
                    {MINUTES.map((m) => (
                      <option key={m} value={m}>:{m}</option>
                    ))}
                  </select>
                </div>
              );
            })()}
          </div>

          {/* Duration */}
          <div>
            <label className="text-sm font-medium text-primary mb-1.5 block">Duration</label>
            <select
              value={form.duration}
              onChange={(e) => set("duration", Number(e.target.value))}
              className={INPUT_CLASS}
            >
              {DURATIONS.map((d) => (
                <option key={d} value={d}>{d} min</option>
              ))}
            </select>
          </div>

          {/* Capacity */}
          <div>
            <label className="text-sm font-medium text-primary mb-1.5 block">Capacity</label>
            <input
              type="number"
              min={1}
              max={30}
              value={form.capacity}
              onChange={(e) => set("capacity", Number(e.target.value))}
              className={INPUT_CLASS}
            />
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stroke flex gap-3 justify-end shrink-0">
          <button
            onClick={onClose}
            className="border border-stroke text-primary hover:bg-ghost px-4 py-2 rounded-lg transition-all duration-DEFAULT"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit(form)}
            className="bg-green text-white font-semibold px-4 py-2 rounded-lg transition-all duration-DEFAULT active:scale-95 hover:bg-green-hover"
          >
            {isEditing ? "Save Changes" : "Add Class"}
          </button>
        </div>
      </div>
    </>
  );
}
