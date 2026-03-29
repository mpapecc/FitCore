import { useState } from "react";
import { AlertCircle } from "lucide-react";
import GoalCard from "../GoalCard";
import OnboardingNav from "../OnboardingNav";

interface GoalsStepProps {
  selectedGoals: string[];
  onToggleGoal: (goal: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

const goals = [
  { id: "BuildMuscle", icon: "🏋️", label: "Build Muscle" },
  { id: "LoseWeight", icon: "🔥", label: "Lose Weight" },
  { id: "ImproveFlexibility", icon: "🧘", label: "Improve Flexibility" },
  { id: "ImproveCardio", icon: "❤️", label: "Improve Cardio" },
  { id: "TrainForEvent", icon: "🏃", label: "Train for an Event" },
  { id: "ReduceStress", icon: "😴", label: "Reduce Stress" },
];

export default function GoalsStep({
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
