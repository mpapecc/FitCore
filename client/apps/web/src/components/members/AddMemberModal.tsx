import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface NewMemberFormData {
  name: string;
  email: string;
  phone: string;
  plan: string;
  assignedTrainer: string;
}

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: NewMemberFormData) => void;
}

const EMPTY_FORM: NewMemberFormData = {
  name: "",
  email: "",
  phone: "",
  plan: "",
  assignedTrainer: "",
};

const INPUT_CLASS =
  "w-full border border-stroke rounded-lg px-3 py-2.5 text-primary focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent transition-all duration-DEFAULT";

export function AddMemberModal({ isOpen, onClose, onSubmit }: AddMemberModalProps) {
  const [form, setForm] = useState<NewMemberFormData>(EMPTY_FORM);

  useEffect(() => {
    if (!isOpen) setForm(EMPTY_FORM);
  }, [isOpen]);

  function handleChange(field: keyof NewMemberFormData, value: string): void {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(): void {
    onSubmit(form);
  }

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
        <div className="px-6 py-4 border-b border-stroke flex justify-between items-center">
          <h2 className="text-primary font-semibold text-lg">Add New Member</h2>
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
          {/* Full Name */}
          <div>
            <label className="text-sm font-medium text-primary mb-1.5 block">
              Full Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="e.g. Marcus Johnson"
              className={INPUT_CLASS}
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-primary mb-1.5 block">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="e.g. marcus@email.com"
              className={INPUT_CLASS}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-primary mb-1.5 block">
              Phone
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="e.g. +1 (555) 012-3456"
              className={INPUT_CLASS}
            />
          </div>

          {/* Plan */}
          <div>
            <label className="text-sm font-medium text-primary mb-1.5 block">
              Plan
            </label>
            <select
              value={form.plan}
              onChange={(e) => handleChange("plan", e.target.value)}
              className={INPUT_CLASS}
            >
              <option value="">Select a plan</option>
              <option value="Basic">Basic</option>
              <option value="Pro">Pro</option>
              <option value="Elite">Elite</option>
              <option value="Student">Student</option>
            </select>
          </div>

          {/* Assigned Trainer */}
          <div>
            <label className="text-sm font-medium text-primary mb-1.5 block">
              Assigned Trainer
            </label>
            <select
              value={form.assignedTrainer}
              onChange={(e) => handleChange("assignedTrainer", e.target.value)}
              className={INPUT_CLASS}
            >
              <option value="">Select a trainer</option>
              <option value="coach-alex">Coach Alex</option>
              <option value="coach-maria">Coach Maria</option>
              <option value="coach-ben">Coach Ben</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stroke flex gap-3 justify-end mt-auto">
          <button
            onClick={onClose}
            className="border border-stroke text-primary hover:bg-ghost px-4 py-2 rounded-lg transition-all duration-DEFAULT"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green text-white font-semibold px-4 py-2 rounded-lg transition-all duration-DEFAULT active:scale-95"
          >
            Add Member
          </button>
        </div>
      </div>
    </>
  );
}
