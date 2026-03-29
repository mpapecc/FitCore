import { Check } from "lucide-react";

interface Step {
  label: string;
  number: number;
}

interface OnboardingProgressProps {
  steps: Step[];
  currentStep: number;
}

export default function OnboardingProgress({ steps, currentStep }: OnboardingProgressProps) {
  return (
    <div className="w-full px-8 py-6 bg-white border-b border-stroke">
      <div className="flex items-center justify-center gap-0">
        {steps.map((step, index) => {
          const isCompleted = step.number < currentStep;
          const isActive = step.number === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.number} className="flex items-center">
              {/* Step */}
              <div className="flex flex-col items-center">
                {isCompleted ? (
                  <div className="w-9 h-9 rounded-full bg-green flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                ) : isActive ? (
                  <div className="w-9 h-9 rounded-full bg-green flex items-center justify-center ring-4 ring-green/20">
                    <span className="text-white font-bold text-sm">{step.number}</span>
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-full bg-ghost border-2 border-stroke flex items-center justify-center">
                    <span className="text-secondary font-medium text-sm">{step.number}</span>
                  </div>
                )}
                <span
                  className={`text-xs mt-1.5 ${
                    isCompleted
                      ? "font-semibold text-green"
                      : isActive
                        ? "font-semibold text-primary"
                        : "text-secondary"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector */}
              {!isLast && (
                <div
                  className={`flex-1 h-0.5 mx-2 w-16 mb-5 ${
                    step.number < currentStep ? "bg-green" : "bg-stroke"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
