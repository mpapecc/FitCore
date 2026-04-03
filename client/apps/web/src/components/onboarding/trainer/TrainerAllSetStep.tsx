import { CheckCircle, Loader2 } from "lucide-react";

interface TrainerAllSetStepProps {
  trainerName: string;
  specializations: string[];
  bio: string;
  isLoading: boolean;
  onComplete: () => void;
}

const specializationLabels: Record<string, string> = {
  StrengthTraining:  'Strength Training',
  CardioEndurance:   'Cardio & Endurance',
  YogaFlexibility:   'Yoga & Flexibility',
  HIITBoxing:        'HIIT & Boxing',
  Swimming:          'Swimming',
  NutritionCoaching: 'Nutrition Coaching',
  MentalWellness:    'Mental Wellness',
  OlympicLifting:    'Olympic Lifting',
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export default function TrainerAllSetStep({
  trainerName,
  specializations,
  bio,
  isLoading,
  onComplete,
}: TrainerAllSetStepProps) {
  const visibleChips = specializations.slice(0, 4);
  const extraCount = specializations.length - visibleChips.length;

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
        Your profile is live, Coach {trainerName}!
      </h1>
      <p className="text-secondary text-lg mt-2">
        You're ready to start training your members.
      </p>

      {/* Profile preview card */}
      <div className="mt-6 w-full max-w-sm mx-auto text-left">
        <p className="text-secondary text-xs uppercase tracking-wide font-semibold mb-2">
          This is how members will see you
        </p>
        <div className="bg-ghost border border-stroke rounded-xl p-5">
          {/* Header row */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-navy text-white font-bold rounded-full flex items-center justify-center text-lg flex-shrink-0">
              {getInitials(trainerName)}
            </div>
            <div>
              <p className="text-primary font-bold">{trainerName}</p>
              <p className="text-secondary text-sm">Personal Trainer</p>
            </div>
          </div>

          {/* Bio preview */}
          {bio && (
            <p className="text-secondary text-sm mt-3 line-clamp-2">{bio}</p>
          )}

          {/* Specialization chips */}
          {specializations.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {visibleChips.map((id) => (
                <span
                  key={id}
                  className="bg-green/10 text-green border border-green/20 px-2.5 py-0.5 rounded-full text-xs font-medium"
                >
                  {specializationLabels[id] ?? id}
                </span>
              ))}
              {extraCount > 0 && (
                <span className="bg-green/10 text-green border border-green/20 px-2.5 py-0.5 rounded-full text-xs font-medium">
                  +{extraCount} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={onComplete}
        disabled={isLoading}
        className="w-full max-w-xs mx-auto mt-8 bg-green hover:bg-green-hover text-white font-semibold py-3 rounded-lg text-base transition-all duration-DEFAULT active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2"
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        Go to my dashboard
      </button>

      <p className="text-secondary text-xs mt-4">
        You can update your profile anytime in Settings.
      </p>
    </div>
  );
}
