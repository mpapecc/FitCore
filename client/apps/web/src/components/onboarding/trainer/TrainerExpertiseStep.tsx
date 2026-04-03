import { useState } from "react";
import { AlertCircle } from "lucide-react";
import GoalCard from "../GoalCard";
import OnboardingNav from "../OnboardingNav";

interface TrainerExpertiseStepProps {
  selected: string[];
  onToggle: (id: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

const specializations = [
  { id: 'StrengthTraining',  icon: '💪', label: 'Strength Training'  },
  { id: 'CardioEndurance',   icon: '🏃', label: 'Cardio & Endurance' },
  { id: 'YogaFlexibility',   icon: '🧘', label: 'Yoga & Flexibility' },
  { id: 'HIITBoxing',        icon: '🥊', label: 'HIIT & Boxing'      },
  { id: 'Swimming',          icon: '🏊', label: 'Swimming'           },
  { id: 'NutritionCoaching', icon: '🍎', label: 'Nutrition Coaching' },
  { id: 'MentalWellness',    icon: '🧠', label: 'Mental Wellness'    },
  { id: 'OlympicLifting',    icon: '🏋️', label: 'Olympic Lifting'   },
];

export default function TrainerExpertiseStep({
  selected,
  onToggle,
  onBack,
  onContinue,
}: TrainerExpertiseStepProps) {
  const [attempted, setAttempted] = useState(false);

  const handleContinue = () => {
    if (selected.length === 0) {
      setAttempted(true);
      return;
    }
    onContinue();
  };

  return (
    <div className="py-6 px-4">
      <h2 className="text-2xl font-bold text-primary">What are your specializations?</h2>
      <p className="text-secondary text-sm mt-1 mb-6">Select all that apply</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {specializations.map((spec) => (
          <GoalCard
            key={spec.id}
            id={spec.id}
            icon={spec.icon}
            label={spec.label}
            isSelected={selected.includes(spec.id)}
            onClick={() => onToggle(spec.id)}
          />
        ))}
      </div>

      {attempted && selected.length === 0 && (
        <p className="text-error text-sm flex items-center gap-1 mt-3">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          Please select at least one specialization
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
