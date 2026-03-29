import { Check } from "lucide-react";

interface GoalCardProps {
  id: string;
  icon: string;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function GoalCard({ id: _id, icon, label, isSelected, onClick }: GoalCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 cursor-pointer transition-all duration-DEFAULT select-none text-center hover:scale-[1.02] ${
        isSelected
          ? "border-green bg-green/5"
          : "border-stroke bg-white hover:border-green/40 hover:bg-green/5"
      }`}
    >
      <span className="text-4xl">{icon}</span>
      <span className={`text-sm font-semibold ${isSelected ? "text-green" : "text-primary"}`}>
        {label}
      </span>

      {isSelected && (
        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-green flex items-center justify-center">
          <Check className="w-3 h-3 text-white" />
        </div>
      )}
    </button>
  );
}
