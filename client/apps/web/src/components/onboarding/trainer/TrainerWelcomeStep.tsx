import { Star, User, Users } from "lucide-react";

interface TrainerWelcomeStepProps {
  trainerName: string;
  onContinue: () => void;
  onSkip: () => void;
}

export default function TrainerWelcomeStep({ trainerName, onContinue, onSkip }: TrainerWelcomeStepProps) {
  return (
    <div className="flex flex-col items-center text-center py-8 px-4">
      <div className="text-6xl mb-6">💼</div>

      <h1 className="text-3xl font-black text-primary tracking-tight">
        Welcome to FitCore, Coach {trainerName}!
      </h1>
      <p className="text-secondary text-lg mt-3 mb-2">
        Let's set up your trainer profile.
      </p>
      <p className="text-secondary text-sm mt-1 mb-10">
        A complete profile helps your members know what to expect from their sessions.
      </p>

      {/* Feature rows */}
      <div className="w-full max-w-xs text-left">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-green/10 flex items-center justify-center flex-shrink-0">
            <Star className="w-5 h-5 text-green" />
          </div>
          <div>
            <p className="text-primary font-medium">Your expertise</p>
            <p className="text-secondary text-sm">Showcase your specializations</p>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-green/10 flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-green" />
          </div>
          <div>
            <p className="text-primary font-medium">Your profile</p>
            <p className="text-secondary text-sm">Bio, experience and certifications</p>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-green/10 flex items-center justify-center flex-shrink-0">
            <Users className="w-5 h-5 text-green" />
          </div>
          <div>
            <p className="text-primary font-medium">Your members</p>
            <p className="text-secondary text-sm">Start managing your clients right away</p>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="w-full max-w-xs mx-auto mt-8 bg-green hover:bg-green-hover text-white font-semibold py-3 rounded-lg text-base transition-all duration-DEFAULT active:scale-95"
      >
        Get Started
      </button>

      <button
        type="button"
        onClick={onSkip}
        className="text-secondary text-sm hover:text-primary transition-all duration-DEFAULT cursor-pointer mt-3"
      >
        Skip setup
      </button>
    </div>
  );
}
