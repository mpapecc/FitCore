import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCompleteTrainerOnboarding,
  useSkipOnboarding,
  type TrainerOnboardingData,
  type TrainerSpecialization,
} from "@fit-core/shared";
import OnboardingProgress from "../../components/onboarding/OnboardingProgress";
import TrainerWelcomeStep from "../../components/onboarding/trainer/TrainerWelcomeStep";
import TrainerExpertiseStep from "../../components/onboarding/trainer/TrainerExpertiseStep";
import TrainerProfileStep from "../../components/onboarding/trainer/TrainerProfileStep";
import TrainerAllSetStep from "../../components/onboarding/trainer/TrainerAllSetStep";

const STEPS = [
  { number: 1, label: 'Welcome'      },
  { number: 2, label: 'Expertise'    },
  { number: 3, label: 'Your Profile' },
  { number: 4, label: 'All Set!'     },
];

export default function TrainerOnboardingPage() {
  const navigate = useNavigate();
  const completeMutation = useCompleteTrainerOnboarding();
  const skipMutation = useSkipOnboarding();

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSpecializations, setSelected] = useState<string[]>([]);
  const [profileData, setProfileData] = useState({
    bio:               '',
    yearsOfExperience: '',
    certifications:    '',
  });

  // TODO: get from session/auth context later
  const trainerName = 'Alex';

  const handleToggleSpecialization = (id: string) => {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(s => s !== id)
        : [...prev, id]
    );
  };

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleSkip = () => {
    skipMutation.mutate(undefined, {
      onSuccess: () => navigate('/dashboard', { replace: true }),
      onError:   () => navigate('/dashboard', { replace: true }),
    });
  };

  const handleComplete = () => {
    const data: TrainerOnboardingData = {
      specializations:   selectedSpecializations as TrainerSpecialization[],
      bio:               profileData.bio || null,
      yearsOfExperience: profileData.yearsOfExperience
                           ? parseInt(profileData.yearsOfExperience) : null,
      certifications:    profileData.certifications || null,
    };

    completeMutation.mutate(data, {
      onSuccess: () => navigate('/dashboard', { replace: true }),
      onError:   () => navigate('/dashboard', { replace: true }),
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
            <TrainerWelcomeStep
              trainerName={trainerName}
              onContinue={handleNext}
              onSkip={handleSkip}
            />
          )}
          {currentStep === 2 && (
            <TrainerExpertiseStep
              selected={selectedSpecializations}
              onToggle={handleToggleSpecialization}
              onBack={handleBack}
              onContinue={handleNext}
            />
          )}
          {currentStep === 3 && (
            <TrainerProfileStep
              data={profileData}
              onChange={handleProfileChange}
              onBack={handleBack}
              onContinue={handleNext}
              onSkip={handleSkip}
            />
          )}
          {currentStep === 4 && (
            <TrainerAllSetStep
              trainerName={trainerName}
              specializations={selectedSpecializations}
              bio={profileData.bio}
              isLoading={completeMutation.isPending || skipMutation.isPending}
              onComplete={handleComplete}
            />
          )}
        </div>
      </div>
    </div>
  );
}
