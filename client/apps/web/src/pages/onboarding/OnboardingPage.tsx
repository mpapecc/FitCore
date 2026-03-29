import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCompleteOnboarding,
  useSkipOnboarding,
  type OnboardingData,
  type FitnessGoal,
  type ActivityLevel,
} from "@fit-core/shared";
import OnboardingProgress from "../../components/onboarding/OnboardingProgress";
import WelcomeStep from "../../components/onboarding/steps/WelcomeStep";
import GoalsStep from "../../components/onboarding/steps/GoalsStep";
import BodyStep from "../../components/onboarding/steps/BodyStep";
import AllSetStep from "../../components/onboarding/steps/AllSetStep";

const STEPS = [
  { number: 1, label: "Welcome" },
  { number: 2, label: "Your Goals" },
  { number: 3, label: "Your Body" },
  { number: 4, label: "All Set!" },
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const completeMutation = useCompleteOnboarding();
  const skipMutation = useSkipOnboarding();
  const [currentStep, setCurrentStep] = useState(1);

  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [bodyData, setBodyData] = useState({
    currentWeightKg: "",
    heightCm: "",
    dateOfBirth: "",
    activityLevel: "",
  });

  // TODO: get from session/auth context later
  const memberName = "Sarah";

  const handleToggleGoal = (goalId: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goalId) ? prev.filter((g) => g !== goalId) : [...prev, goalId],
    );
  };

  const handleBodyChange = (field: string, value: string) => {
    setBodyData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleSkip = () => {
    skipMutation.mutate(undefined, {
      onSuccess: () => navigate("/dashboard", { replace: true }),
      onError: () => navigate("/dashboard", { replace: true }),
    });
  };

  const handleComplete = () => {
    const data: OnboardingData = {
      goals: selectedGoals as FitnessGoal[],
      currentWeightKg: bodyData.currentWeightKg ? parseFloat(bodyData.currentWeightKg) : null,
      heightCm: bodyData.heightCm ? parseFloat(bodyData.heightCm) : null,
      dateOfBirth: bodyData.dateOfBirth || null,
      activityLevel: (bodyData.activityLevel || null) as ActivityLevel | null,
    };

    completeMutation.mutate(data, {
      onSuccess: () => navigate("/dashboard", { replace: true }),
      onError: () => navigate("/dashboard", { replace: true }),
    });
  };

  return (
    <div className="min-h-screen bg-ghost flex flex-col">
      {/* Sticky progress bar */}
      <div className="bg-white border-b border-stroke sticky top-0 z-10">
        <OnboardingProgress steps={STEPS} currentStep={currentStep} />
      </div>

      {/* Step content */}
      <div className="flex-1 flex items-start justify-center py-8 px-4">
        <div className="w-full max-w-2xl bg-white rounded-xl border border-stroke shadow-sm overflow-hidden">
          {currentStep === 1 && (
            <WelcomeStep
              memberName={memberName}
              onContinue={handleNext}
              onSkip={handleSkip}
            />
          )}
          {currentStep === 2 && (
            <GoalsStep
              selectedGoals={selectedGoals}
              onToggleGoal={handleToggleGoal}
              onBack={handleBack}
              onContinue={handleNext}
            />
          )}
          {currentStep === 3 && (
            <BodyStep
              data={bodyData}
              onChange={handleBodyChange}
              onBack={handleBack}
              onContinue={handleNext}
              onSkip={handleSkip}
            />
          )}
          {currentStep === 4 && (
            <AllSetStep
              memberName={memberName}
              selectedGoals={selectedGoals}
              isLoading={completeMutation.isPending || skipMutation.isPending}
              onComplete={handleComplete}
            />
          )}
        </div>
      </div>
    </div>
  );
}
