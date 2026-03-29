import { ChevronLeft, Loader2 } from "lucide-react";

interface OnboardingNavProps {
  onBack?: () => void;
  onContinue: () => void;
  onSkip?: () => void;
  continueLabel?: string;
  isLoading?: boolean;
  showBack?: boolean;
}

export default function OnboardingNav({
  onBack,
  onContinue,
  onSkip,
  continueLabel = "Continue",
  isLoading = false,
  showBack = false,
}: OnboardingNavProps) {
  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-stroke">
      {/* Left — Back */}
      <div>
        {showBack && onBack && (
          <button
            type="button"
            onClick={onBack}
            className="border border-stroke text-primary hover:bg-ghost px-6 py-2.5 rounded-lg transition-all duration-DEFAULT flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
        )}
      </div>

      {/* Right — Skip + Continue */}
      <div className="flex items-center gap-3">
        {onSkip && (
          <button
            type="button"
            onClick={onSkip}
            className="text-secondary text-sm hover:text-primary transition-all duration-DEFAULT cursor-pointer"
          >
            Skip for now
          </button>
        )}
        <button
          type="button"
          onClick={onContinue}
          disabled={isLoading}
          className="bg-green hover:bg-green-hover text-white font-semibold px-6 py-2.5 rounded-lg transition-all duration-DEFAULT active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center gap-2"
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          {continueLabel}
        </button>
      </div>
    </div>
  );
}
