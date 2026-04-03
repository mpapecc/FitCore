import { Info } from "lucide-react";
import OnboardingNav from "../OnboardingNav";

interface TrainerProfileStepProps {
  data: {
    bio: string;
    yearsOfExperience: string;
    certifications: string;
  };
  onChange: (field: string, value: string) => void;
  onBack: () => void;
  onContinue: () => void;
  onSkip: () => void;
}

const inputClass =
  "border border-stroke rounded-lg px-3 py-3 text-primary w-full focus:ring-2 focus:ring-green focus:border-transparent transition-all duration-DEFAULT outline-none placeholder:text-secondary bg-white";

export default function TrainerProfileStep({
  data,
  onChange,
  onBack,
  onContinue,
  onSkip,
}: TrainerProfileStepProps) {
  return (
    <div className="py-6 px-4">
      <h2 className="text-2xl font-bold text-primary">Tell us about yourself</h2>
      <p className="text-secondary text-sm mt-1 mb-6">
        This is what your members will see on your profile.
      </p>

      <div className="flex flex-col gap-5">
        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-primary mb-1.5">
            Short Bio
          </label>
          <textarea
            value={data.bio}
            onChange={(e) => onChange("bio", e.target.value)}
            maxLength={500}
            placeholder="e.g. Certified personal trainer with 8 years experience specialising in strength and conditioning..."
            className={`${inputClass} resize-none h-28`}
          />
          <p className="text-secondary text-xs text-right mt-1">
            {data.bio.length}/500
          </p>
        </div>

        {/* Years of Experience */}
        <div>
          <label className="block text-sm font-medium text-primary mb-1.5">
            Years of Experience
          </label>
          <div className="flex gap-3">
            <input
              type="number"
              min="0"
              max="50"
              placeholder="e.g. 5"
              value={data.yearsOfExperience}
              onChange={(e) => onChange("yearsOfExperience", e.target.value)}
              className={`${inputClass} w-32`}
            />
            <span className="text-secondary text-sm self-center">years</span>
          </div>
        </div>

        {/* Certifications */}
        <div>
          <label className="block text-sm font-medium text-primary mb-1.5">
            Certifications
          </label>
          <input
            type="text"
            placeholder="e.g. ACE, NASM, CrossFit L2, RYT-200"
            value={data.certifications}
            onChange={(e) => onChange("certifications", e.target.value)}
            className={inputClass}
          />
          <p className="text-secondary text-xs mt-1">
            Separate multiple certifications with commas
          </p>
        </div>

        {/* Info note */}
        <div className="bg-green/5 border border-green/20 rounded-lg p-3 flex items-start gap-2 mt-2">
          <Info className="w-4 h-4 text-green mt-0.5 flex-shrink-0" />
          <p className="text-secondary text-xs">
            All fields are optional. You can update your profile anytime in settings.
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
