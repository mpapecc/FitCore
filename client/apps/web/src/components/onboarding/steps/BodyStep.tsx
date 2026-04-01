import { Info, Loader2 } from "lucide-react";
import type { DictionaryItem } from "@fit-core/shared";
import OnboardingNav from "../OnboardingNav";

interface BodyStepProps {
  data: {
    currentWeightKg: string;
    heightCm: string;
    activityLevel: string;
  };
  activityLevels: DictionaryItem[];
  activityLevelsLoading: boolean;
  onChange: (field: string, value: string) => void;
  onBack: () => void;
  onContinue: () => void;
  onSkip: () => void;
}

const inputClass =
  "border border-stroke rounded-lg px-3 py-3 text-primary w-full focus:ring-2 focus:ring-green focus:border-transparent transition-all duration-DEFAULT outline-none placeholder:text-secondary bg-white";

export default function BodyStep({
  data,
  activityLevels,
  activityLevelsLoading,
  onChange,
  onBack,
  onContinue,
  onSkip,
}: BodyStepProps) {
  return (
    <div className="py-6 px-4">
      <h2 className="text-2xl font-bold text-primary">Tell us about yourself</h2>
      <p className="text-secondary text-sm mt-1 mb-6">
        This helps us personalise your fitness plan.
      </p>

      <div className="flex flex-col gap-5">
        {/* Weight */}
        <div>
          <label className="block text-sm font-medium text-primary mb-1.5">
            Current Weight
          </label>
          <div className="flex gap-3">
            <input
              type="number"
              min="20"
              max="300"
              step="0.1"
              placeholder="e.g. 75"
              value={data.currentWeightKg}
              onChange={(e) => onChange("currentWeightKg", e.target.value)}
              className={`${inputClass} flex-1`}
            />
            <div className="bg-ghost border border-stroke rounded-lg px-4 py-3 text-secondary text-sm font-medium flex-shrink-0">
              kg
            </div>
          </div>
        </div>

        {/* Height */}
        <div>
          <label className="block text-sm font-medium text-primary mb-1.5">
            Height
          </label>
          <div className="flex gap-3">
            <input
              type="number"
              min="100"
              max="250"
              step="1"
              placeholder="e.g. 175"
              value={data.heightCm}
              onChange={(e) => onChange("heightCm", e.target.value)}
              className={`${inputClass} flex-1`}
            />
            <div className="bg-ghost border border-stroke rounded-lg px-4 py-3 text-secondary text-sm font-medium flex-shrink-0">
              cm
            </div>
          </div>
        </div>

        {/* Activity Level */}
        <div>
          <label className="block text-sm font-medium text-primary mb-1.5">
            Activity Level
          </label>
          {activityLevelsLoading ? (
            <div className="flex items-center gap-2 border border-stroke rounded-lg px-3 py-3">
              <Loader2 className="w-4 h-4 text-green animate-spin" />
              <span className="text-secondary text-sm">Loading...</span>
            </div>
          ) : (
            <select
              value={data.activityLevel}
              onChange={(e) => onChange("activityLevel", e.target.value)}
              className={inputClass}
            >
              <option value="">Select your activity level</option>
              {activityLevels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.label + ` (${level.description})`}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Info note */}
        <div className="bg-green/5 border border-green/20 rounded-lg p-3 flex items-start gap-2 mt-2">
          <Info className="w-4 h-4 text-green mt-0.5 flex-shrink-0" />
          <p className="text-secondary text-xs">
            All fields are optional. You can update these anytime in your profile.
          </p>
        </div>
      </div>

      <OnboardingNav
        showBack
        onBack={onBack}
        onContinue={onContinue}
        onSkip={onSkip}
        continueLabel="Almost done!"
      />
    </div>
  );
}
