import { ChevronDown } from 'lucide-react';
import { type Meal, mealIcons, mealTimeMap } from '../../../pages/member/nutrition/myNutritionData';

interface MealCardProps {
  meal: Meal;
  isExpanded?: boolean;
  onToggle: () => void;
}

export function MealCard({ meal, isExpanded = false, onToggle }: MealCardProps) {
  return (
    <div className="bg-white border border-stroke rounded-xl shadow-sm overflow-hidden">
      {/* Meal header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-ghost duration-DEFAULT text-left"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{mealIcons[meal.type]}</span>
          <div>
            <p className="text-primary font-bold text-base">{meal.type}</p>
            <p className="text-secondary text-xs mt-0.5">{mealTimeMap[meal.type]}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-primary font-semibold">{meal.totalCalories} kcal</span>
          <div className="flex gap-3 text-xs hidden sm:flex">
            <span className="text-blue-600">P: {meal.totalProtein}g</span>
            <span className="text-warning">C: {meal.totalCarbs}g</span>
            <span className="text-pink-500">F: {meal.totalFat}g</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-secondary duration-DEFAULT ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {/* Food items */}
      {isExpanded && (
        <>
          <div className="border-t border-stroke">
            {meal.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between px-5 py-3 border-b border-stroke last:border-0 hover:bg-ghost/50 duration-DEFAULT"
              >
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-green flex-shrink-0" />
                  <span className="text-primary text-sm font-medium">{item.name}</span>
                  <span className="text-secondary text-xs">({item.portion})</span>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="text-primary font-semibold">{item.calories} kcal</span>
                  <span className="text-secondary hidden sm:block">
                    P:{item.protein}g · C:{item.carbs}g · F:{item.fat}g
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Meal footer */}
          <div className="px-5 py-3 bg-ghost border-t border-stroke flex items-center justify-between text-xs">
            <span className="text-primary font-semibold">Total: {meal.totalCalories} kcal</span>
            <span className="text-secondary">
              P: {meal.totalProtein}g · C: {meal.totalCarbs}g · F: {meal.totalFat}g
            </span>
          </div>
        </>
      )}
    </div>
  );
}
