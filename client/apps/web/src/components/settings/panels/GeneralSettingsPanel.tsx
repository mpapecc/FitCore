import { Save, UploadCloud } from "lucide-react";
import { useState } from "react";

const defaultData = {
  gymName: "FitCore Gym & Wellness",
  address: "142 Harbour Street, Sydney NSW 2000",
  phone: "+61 2 9876 5432",
  email: "admin@fitcoregym.com.au",
  hours: [
    { day: "Monday",    open: "06:00", close: "22:00", active: true  },
    { day: "Tuesday",   open: "06:00", close: "22:00", active: true  },
    { day: "Wednesday", open: "06:00", close: "22:00", active: true  },
    { day: "Thursday",  open: "06:00", close: "22:00", active: true  },
    { day: "Friday",    open: "06:00", close: "21:00", active: true  },
    { day: "Saturday",  open: "07:00", close: "18:00", active: true  },
    { day: "Sunday",    open: "08:00", close: "14:00", active: false },
  ],
  cancellationWindow: 2,
  maxBookingsPerWeek: 5,
  allowWaitlist: true,
};

function Toggle({ active, onToggle }: { active: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative w-10 h-5 rounded-full transition-all duration-DEFAULT flex-shrink-0 ${
        active ? "bg-green" : "bg-stroke"
      }`}
    >
      <span
        className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-DEFAULT ${
          active ? "left-5" : "left-0.5"
        }`}
      />
    </button>
  );
}

export function GeneralSettingsPanel() {
  const [gymName, setGymName] = useState(defaultData.gymName);
  const [address, setAddress] = useState(defaultData.address);
  const [phone, setPhone] = useState(defaultData.phone);
  const [email, setEmail] = useState(defaultData.email);
  const [hours, setHours] = useState(defaultData.hours);
  const [cancellationWindow, setCancellationWindow] = useState(defaultData.cancellationWindow);
  const [maxBookingsPerWeek, setMaxBookingsPerWeek] = useState(defaultData.maxBookingsPerWeek);
  const [allowWaitlist, setAllowWaitlist] = useState(defaultData.allowWaitlist);

  const inputClass =
    "border border-stroke rounded-lg px-3 py-2.5 text-primary focus:ring-2 focus:ring-green focus:border-transparent transition-all duration-DEFAULT outline-none";

  function toggleDay(index: number) {
    setHours((prev) =>
      prev.map((h, i) => (i === index ? { ...h, active: !h.active } : h))
    );
  }

  function updateHour(index: number, field: "open" | "close", value: string) {
    setHours((prev) =>
      prev.map((h, i) => (i === index ? { ...h, [field]: value } : h))
    );
  }

  return (
    <div className="bg-white border border-stroke rounded-lg shadow-sm">
      {/* Section 1 — Gym Information */}
      <div className="px-6 py-4 border-b border-stroke">
        <p className="text-base font-semibold text-primary">Gym Information</p>
        <p className="text-sm text-secondary mt-0.5">Basic details about your gym</p>
      </div>
      <div className="px-6 py-6 border-b border-stroke">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Gym Name */}
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-medium text-primary">Gym Name</label>
            <input
              type="text"
              value={gymName}
              onChange={(e) => setGymName(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Address */}
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-medium text-primary">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-primary">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-primary">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Logo Upload */}
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-medium text-primary">Gym Logo</label>
            <label className="border-2 border-dashed border-stroke rounded-lg p-6 hover:border-green transition-all duration-DEFAULT cursor-pointer flex flex-col items-center gap-2 text-center">
              <UploadCloud className="w-8 h-8 text-secondary/50" />
              <span className="text-sm text-secondary">Click to upload or drag and drop</span>
              <span className="text-xs text-secondary/70">PNG, JPG up to 2MB</span>
              <input type="file" accept="image/png,image/jpeg" className="hidden" />
            </label>
          </div>
        </div>
      </div>

      {/* Section 2 — Business Hours */}
      <div className="px-6 py-4 border-b border-stroke">
        <p className="text-base font-semibold text-primary">Business Hours</p>
        <p className="text-sm text-secondary mt-0.5">Set your gym's opening hours for each day</p>
      </div>
      <div className="px-6 py-6 border-b border-stroke">
        <div className="divide-y divide-stroke">
          {hours.map((day, index) => (
            <div key={day.day} className="flex items-center gap-4 py-3">
              <span className="w-28 text-sm font-medium text-primary flex-shrink-0">
                {day.day}
              </span>
              <Toggle active={day.active} onToggle={() => toggleDay(index)} />
              {day.active ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-secondary">Open</span>
                  <input
                    type="time"
                    value={day.open}
                    onChange={(e) => updateHour(index, "open", e.target.value)}
                    className="border border-stroke rounded-lg px-2.5 py-1.5 text-sm text-primary focus:ring-2 focus:ring-green focus:border-transparent transition-all duration-DEFAULT outline-none"
                  />
                  <span className="text-secondary">–</span>
                  <span className="text-xs text-secondary">Close</span>
                  <input
                    type="time"
                    value={day.close}
                    onChange={(e) => updateHour(index, "close", e.target.value)}
                    className="border border-stroke rounded-lg px-2.5 py-1.5 text-sm text-primary focus:ring-2 focus:ring-green focus:border-transparent transition-all duration-DEFAULT outline-none"
                  />
                </div>
              ) : (
                <span className="text-xs text-secondary italic ml-2">Closed</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Section 3 — Booking Rules */}
      <div className="px-6 py-4 border-b border-stroke">
        <p className="text-base font-semibold text-primary">Booking Rules</p>
        <p className="text-sm text-secondary mt-0.5">Configure how members can book classes</p>
      </div>
      <div className="px-6 py-6">
        <div className="flex flex-col gap-6">
          {/* Cancellation Window */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-primary">Cancellation Window</p>
              <p className="text-xs text-secondary mt-0.5">Hours before class a member can cancel</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                value={cancellationWindow}
                onChange={(e) => setCancellationWindow(Number(e.target.value))}
                className="w-20 border border-stroke rounded-lg px-3 py-2 text-center text-primary font-semibold focus:ring-2 focus:ring-green focus:border-transparent outline-none transition-all duration-DEFAULT"
              />
              <span className="text-sm text-secondary">hours</span>
            </div>
          </div>

          {/* Max Bookings Per Week */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-primary">Max Bookings Per Week</p>
              <p className="text-xs text-secondary mt-0.5">Maximum classes a member can book each week</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                value={maxBookingsPerWeek}
                onChange={(e) => setMaxBookingsPerWeek(Number(e.target.value))}
                className="w-20 border border-stroke rounded-lg px-3 py-2 text-center text-primary font-semibold focus:ring-2 focus:ring-green focus:border-transparent outline-none transition-all duration-DEFAULT"
              />
              <span className="text-sm text-secondary">classes</span>
            </div>
          </div>

          {/* Allow Waitlist */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-primary">Allow Waitlist</p>
              <p className="text-xs text-secondary mt-0.5">Members can join a waitlist for full classes</p>
            </div>
            <Toggle active={allowWaitlist} onToggle={() => setAllowWaitlist((v) => !v)} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-stroke flex justify-end items-center gap-3">
        <span className="text-xs text-secondary mr-auto">Last saved: just now</span>
        <button
          type="button"
          className="border border-stroke text-primary px-4 py-2 rounded-lg hover:bg-ghost transition-all duration-DEFAULT text-sm"
        >
          Cancel
        </button>
        <button
          type="button"
          className="flex items-center gap-2 bg-green text-white font-semibold px-5 py-2 rounded-lg transition-all duration-DEFAULT active:scale-95"
        >
          <Save size={15} />
          Save Changes
        </button>
      </div>
    </div>
  );
}
