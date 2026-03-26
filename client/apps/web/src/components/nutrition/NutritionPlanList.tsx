import { User, Users, Flame } from "lucide-react";
import type { NutritionPlan } from "@fit-core/shared";
import { goalColors } from "./nutritionData";

interface NutritionPlanListProps {
  plans: NutritionPlan[];
  selectedPlanId: string;
  onSelectPlan: (id: string) => void;
}

export function NutritionPlanList({
  plans,
  selectedPlanId,
  onSelectPlan,
}: NutritionPlanListProps) {
  return (
    <div className="bg-white border border-stroke rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-4 border-b border-stroke flex items-center">
        <span className="text-base font-semibold text-primary">All Plans</span>
        <span className="ml-2 bg-ghost text-secondary text-xs font-bold px-2 py-0.5 rounded-full">
          {plans.length}
        </span>
      </div>

      {/* Plan list */}
      <div className="overflow-y-auto flex-1">
        {plans.map((plan) => {
          const isSelected = plan.id === selectedPlanId;
          const goal = goalColors[plan.goal];
          return (
            <div
              key={plan.id}
              onClick={() => onSelectPlan(plan.id)}
              className={`relative px-5 py-4 border-b border-stroke cursor-pointer transition-all duration-DEFAULT border-l-4 ${
                isSelected
                  ? "bg-ghost border-l-green"
                  : "border-l-transparent hover:bg-ghost"
              }`}
            >
              {/* Row 1: name + goal badge */}
              <div className="flex items-center">
                <span className="text-primary font-semibold text-sm">
                  {plan.name}
                </span>
                <span
                  className={`ml-auto ${goal.bg} ${goal.border} ${goal.text} border rounded-full px-2 py-0.5 text-xs font-semibold whitespace-nowrap`}
                >
                  {plan.goal}
                </span>
              </div>

              {/* Row 2: trainer */}
              <div className="flex items-center gap-1 mt-1">
                <User size={12} className="text-secondary flex-shrink-0" />
                <span className="text-secondary text-xs">{plan.trainer}</span>
              </div>

              {/* Row 3: members + calories */}
              <div className="flex justify-between mt-2">
                <div className="flex items-center gap-1">
                  <Users size={12} className="text-secondary flex-shrink-0" />
                  <span className="text-secondary text-xs">
                    {plan.membersCount} members
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Flame size={12} className="text-secondary flex-shrink-0" />
                  <span className="text-secondary text-xs">
                    {plan.calorieTarget} kcal
                  </span>
                </div>
              </div>

              {/* Selected indicator dot */}
              {isSelected && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-green" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
