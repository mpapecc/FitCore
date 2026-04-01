import { CheckCircle, Loader2 } from "lucide-react";
import type { GoalOption } from "./GoalsStep";

interface AllSetStepProps {
  memberName: string;
  selectedGoals: string[];
  goalOptions: GoalOption[];
  isLoading: boolean;
  onComplete: () => void;
}

export default function AllSetStep({
  memberName,
  selectedGoals,
  goalOptions,
  isLoading,
  onComplete,
}: AllSetStepProps) {
  const goalLabelMap = Object.fromEntries(goalOptions.map((g) => [g.id, g.label]));
  return (
    <div className="flex flex-col items-center text-center py-8 px-4">
      {/* Confetti dots */}
      <div className="relative w-24 h-8 mb-2">
        <div className="absolute top-0 left-4 w-3 h-3 rounded-full bg-green animate-bounce" style={{ animationDelay: "0ms" }} />
        <div className="absolute top-1 left-1/2 w-2 h-2 rounded-full bg-warning animate-bounce" style={{ animationDelay: "150ms" }} />
        <div className="absolute top-0 right-4 w-4 h-4 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>

      {/* Checkmark circle */}
      <div className="w-24 h-24 rounded-full bg-green/10 border-4 border-green flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-12 h-12 text-green" />
      </div>

      <h1 className="text-3xl font-black text-primary tracking-tight">
        You're all set, {memberName}!
      </h1>
      <p className="text-secondary text-lg mt-2">Your FitCore profile is ready.</p>

      {/* Goals summary */}
      {selectedGoals.length > 0 && (
        <div className="mt-6">
          <p className="text-sm font-semibold text-primary mb-3">Your goals:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {selectedGoals.map((goal) => (
              <span
                key={goal}
                className="bg-green/10 text-green border border-green/20 px-3 py-1 rounded-full text-sm font-medium"
              >
                {goalLabelMap[goal] ?? goal}
              </span>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={onComplete}
        disabled={isLoading}
        className="w-full max-w-xs mx-auto mt-8 bg-green hover:bg-green-hover text-white font-semibold py-3 rounded-lg text-base transition-all duration-DEFAULT active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2"
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        Let's go to your dashboard!
      </button>

      <p className="text-secondary text-xs mt-4">
        You can update your profile anytime in settings.
      </p>
    </div>
  );
}
