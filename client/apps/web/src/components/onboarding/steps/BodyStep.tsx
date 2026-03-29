import { Info } from "lucide-react";
import OnboardingNav from "../OnboardingNav";

interface BodyStepProps {
  data: {
    currentWeightKg: string;
    heightCm: string;
    dateOfBirth: string;
    activityLevel: string;
  };
  onChange: (field: string, value: string) => void;
  onBack: () => void;
  onContinue: () => void;
  onSkip: () => void;
}

const inputClass =
  "border border-stroke rounded-lg px-3 py-3 text-primary w-full focus:ring-2 focus:ring-green focus:border-transparent transition-all duration-DEFAULT outline-none placeholder:text-secondary bg-white";

export default function BodyStep({ data, onChange, onBack, onContinue, onSkip }: BodyStepProps) {
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

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-primary mb-1.5">
            Date of Birth
          </label>
          <input
            type="date"
            value={data.dateOfBirth}
            onChange={(e) => onChange("dateOfBirth", e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Activity Level */}
        <div>
          <label className="block text-sm font-medium text-primary mb-1.5">
            Activity Level
          </label>
          <select
            value={data.activityLevel}
            onChange={(e) => onChange("activityLevel", e.target.value)}
            className={inputClass}
          >
            <option value="">Select your activity level</option>
            <option value="Sedentary">Sedentary (little to no exercise)</option>
            <option value="LightlyActive">Lightly Active (1-3 days/week)</option>
            <option value="ModeratelyActive">Moderately Active (3-5 days/week)</option>
            <option value="VeryActive">Very Active (6-7 days/week)</option>
            <option value="ExtraActive">Extra Active (physical job + exercise)</option>
          </select>
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
