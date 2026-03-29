import { Activity, Sparkles, Target } from "lucide-react";

interface WelcomeStepProps {
  memberName: string;
  onContinue: () => void;
  onSkip: () => void;
}

export default function WelcomeStep({ memberName, onContinue, onSkip }: WelcomeStepProps) {
  return (
    <div className="flex flex-col items-center text-center py-8 px-4">
      <div className="text-6xl mb-6">🎉</div>

      <h1 className="text-3xl font-black text-primary tracking-tight">
        Welcome to FitCore, {memberName}!
      </h1>
      <p className="text-secondary text-lg mt-3 mb-2">
        Let's set up your profile in just a few steps.
      </p>
      <p className="text-secondary text-sm mt-1 mb-10">
        It only takes 2 minutes and helps us personalise your experience.
      </p>

      {/* Feature rows */}
      <div className="w-full max-w-xs text-left">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-green/10 flex items-center justify-center flex-shrink-0">
            <Target className="w-5 h-5 text-green" />
          </div>
          <div>
            <p className="text-primary font-medium">Your fitness goals</p>
            <p className="text-secondary text-sm">Tell us what you want to achieve</p>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-green/10 flex items-center justify-center flex-shrink-0">
            <Activity className="w-5 h-5 text-green" />
          </div>
          <div>
            <p className="text-primary font-medium">Your body stats</p>
            <p className="text-secondary text-sm">Weight, height and activity level</p>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-green/10 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-green" />
          </div>
          <div>
            <p className="text-primary font-medium">Personalised experience</p>
            <p className="text-secondary text-sm">Get recommendations tailored to you</p>
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
