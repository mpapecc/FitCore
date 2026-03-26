import { Pencil, UserPlus, Sun, Cloud, Moon, Utensils } from "lucide-react";
import type { NutritionPlan, Meal } from "@fit-core/shared";
import { goalColors, macroColors } from "./nutritionData";

interface NutritionPlanDetailProps {
  plan: NutritionPlan;
  onEdit: (id: string) => void;
  onAssign: (id: string) => void;
}

const MEAL_ICONS: Record<Meal["name"], React.ReactNode> = {
  Breakfast: <Sun size={15} className="text-warning flex-shrink-0" />,
  Lunch:     <Cloud size={15} className="text-blue-400 flex-shrink-0" />,
  Dinner:    <Moon size={15} className="text-secondary flex-shrink-0" />,
  Snacks:    <Utensils size={15} className="text-success flex-shrink-0" />,
};

export function NutritionPlanDetail({
  plan,
  onEdit,
  onAssign,
}: NutritionPlanDetailProps) {
  const goal = goalColors[plan.goal];

  return (
    <div className="bg-white border border-stroke rounded-lg shadow-sm overflow-y-auto flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-5 border-b border-stroke">
        <div className="flex justify-between items-start">
          {/* Left: name + goal badge */}
          <div>
            <h2 className="text-xl font-bold text-primary">{plan.name}</h2>
            <span
              className={`${goal.bg} ${goal.border} ${goal.text} border rounded-full px-3 py-1 text-xs font-semibold mt-1.5 inline-block`}
            >
              {plan.goal}
            </span>
          </div>

          {/* Right: actions */}
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(plan.id)}
              className="flex items-center gap-1.5 border border-stroke text-primary hover:bg-ghost px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-DEFAULT"
            >
              <Pencil size={14} />
              Edit Plan
            </button>
            <button
              onClick={() => onAssign(plan.id)}
              className="flex items-center gap-1.5 bg-green text-white px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-DEFAULT active:scale-95 hover:bg-green-hover"
            >
              <UserPlus size={14} />
              Assign to Member
            </button>
          </div>
        </div>

        {/* Calorie target */}
        <div className="mt-4">
          <span className="text-4xl font-black text-primary tracking-tight">
            {plan.calorieTarget.toLocaleString()}
          </span>
          <span className="text-secondary text-sm ml-1">kcal / day</span>
        </div>
      </div>

      {/* Macro Targets */}
      <div className="px-6 py-5 border-b border-stroke">
        <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-4">
          Macro Targets
        </p>

        {(["protein", "carbs", "fat"] as const).map((macro) => {
          const { grams, percentage } = plan.macros[macro];
          const colors = macroColors[macro];
          return (
            <div key={macro}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-primary capitalize">
                  {macro}
                </span>
                <span className="text-sm text-secondary">
                  {grams}g · {percentage}%
                </span>
              </div>
              <div className="w-full bg-ghost rounded-full h-2 mb-3">
                <div
                  className={`${colors.bar} rounded-full h-2 transition-all duration-DEFAULT`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Daily Meal Plan */}
      <div className="px-6 py-5 border-b border-stroke">
        <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-4">
          Daily Meal Plan
        </p>

        {plan.meals.length === 0 ? (
          <p className="text-secondary text-sm py-8 text-center">
            No meal details available
          </p>
        ) : (
          plan.meals.map((meal) => (
            <div key={meal.name} className="bg-ghost rounded-lg p-3 mb-3">
              {/* Meal header */}
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  {MEAL_ICONS[meal.name]}
                  <span className="text-sm font-semibold text-primary ml-2">
                    {meal.name}
                  </span>
                </div>
                <span className="text-sm font-semibold text-secondary">
                  {meal.totalCalories} kcal
                </span>
              </div>

              {/* Food items */}
              {meal.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center py-2 border-b border-stroke last:border-0"
                >
                  <div>
                    <span className="text-sm text-primary">{item.name}</span>
                    <span className="text-xs text-secondary ml-1">
                      {item.portion}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-secondary">
                    {item.calories} kcal
                  </span>
                </div>
              ))}
            </div>
          ))
        )}
      </div>

      {/* Assigned Members */}
      <div className="px-6 py-5">
        <div className="flex justify-between items-center mb-3">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide">
            Assigned Members
          </p>
          <span className="bg-ghost text-secondary text-xs font-bold px-2 py-0.5 rounded-full">
            {plan.assignedMembers.length}
          </span>
        </div>

        {plan.assignedMembers.length === 0 ? (
          <p className="text-secondary text-sm">No members assigned yet</p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {plan.assignedMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-2 bg-ghost rounded-lg px-3 py-2"
              >
                <div className="w-7 h-7 rounded-full bg-navy text-white text-xs font-semibold flex items-center justify-center flex-shrink-0">
                  {member.avatarInitials}
                </div>
                <span className="text-sm text-primary font-medium">
                  {member.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
