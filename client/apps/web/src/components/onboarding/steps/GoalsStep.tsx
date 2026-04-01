import { useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import GoalCard from "../GoalCard";
import OnboardingNav from "../OnboardingNav";

export interface GoalOption {
  id: string;
  icon: string;
  label: string;
}

interface GoalsStepProps {
  goals: GoalOption[];
  isLoading: boolean;
  isError: boolean;
  selectedGoals: string[];
  onToggleGoal: (goal: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

export default function GoalsStep({
  goals,
  isLoading,
  isError,
  selectedGoals,
  onToggleGoal,
  onBack,
  onContinue,
}: GoalsStepProps) {
  const [attempted, setAttempted] = useState(false);

  const handleContinue = () => {
    if (selectedGoals.length === 0) {
      setAttempted(true);
      return;
    }
    onContinue();
  };

  return (
    <div className="py-6 px-4">
      <h2 className="text-2xl font-bold text-primary">What are your fitness goals?</h2>
      <p className="text-secondary text-sm mt-1 mb-6">Select all that apply</p>

      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-green animate-spin" />
        </div>
      )}

      {isError && (
        <div className="bg-error/10 border border-error/20 text-error text-sm rounded-lg px-4 py-3 flex items-center gap-2 mb-4">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          Failed to load goals. Please try again.
        </div>
      )}

      {!isLoading && !isError && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              id={goal.id}
              icon={goal.icon}
              label={goal.label}
              isSelected={selectedGoals.includes(goal.id)}
              onClick={() => onToggleGoal(goal.id)}
            />
          ))}
        </div>
      )}

      {attempted && selectedGoals.length === 0 && (
        <p className="text-error text-sm flex items-center gap-1 mt-3">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          Please select at least one goal
        </p>
      )}

      <OnboardingNav
        showBack
        onBack={onBack}
        onContinue={handleContinue}
        continueLabel="Continue"
      />
    </div>
  );
}
