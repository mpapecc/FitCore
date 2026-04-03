import { type NutritionPlan } from '../../../pages/member/nutrition/myNutritionData';

interface NutritionPlanHeaderProps {
  plan: NutritionPlan;
}

export function NutritionPlanHeader({ plan }: NutritionPlanHeaderProps) {
  return (
    <div className="bg-navy rounded-xl p-6 text-white">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left side */}
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">{plan.name}</h2>
          <span className="inline-block mt-2 bg-white/10 border border-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {plan.goal}
          </span>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-white/50 text-xs">Assigned by</span>
            <div className="w-6 h-6 rounded-full bg-green text-white text-xs font-semibold flex items-center justify-center">
              {plan.assignedByInitials}
            </div>
            <span className="text-white/80 text-sm font-medium">{plan.assignedBy}</span>
          </div>
        </div>

        {/* Right side */}
        <div className="md:text-right">
          <p className="text-white/50 text-xs uppercase tracking-wide">Daily Target</p>
          <p className="text-4xl font-black text-white">
            {plan.calorieTarget.toLocaleString()}
            <span className="text-white/70 text-xl ml-1">kcal</span>
          </p>
        </div>
      </div>
    </div>
  );
}
