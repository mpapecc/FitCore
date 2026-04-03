import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NutritionPlanHeader } from '../../components/member/nutrition/NutritionPlanHeader';
import { MacroTargets }        from '../../components/member/nutrition/MacroTargets';
import { DaySelector }         from '../../components/member/nutrition/DaySelector';
import { MealCard }            from '../../components/member/nutrition/MealCard';
import { HydrationTracker }    from '../../components/member/nutrition/HydrationTracker';
import {
  nutritionPlan,
  DAYS,
  TODAY_DAY,
  type DayOfWeek,
} from './nutrition/myNutritionData';

export default function MyNutritionPage() {
  const { t } = useTranslation('member');
  const [activeDay, setActiveDay] = useState<DayOfWeek>(TODAY_DAY);
  const [expandedMeals, setExpandedMeals] = useState<Set<string>>(
    new Set(['Breakfast', 'Lunch'])
  );

  const activeDayPlan = nutritionPlan.days.find(d => d.day === activeDay)
    ?? nutritionPlan.days[2];

  const handleToggleMeal = (mealType: string) => {
    setExpandedMeals(prev => {
      const next = new Set(prev);
      if (next.has(mealType)) next.delete(mealType);
      else next.add(mealType);
      return next;
    });
  };

  return (
    <div className="p-8">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary">{t('myNutritionPlan')}</h1>
        <p className="text-secondary text-sm mt-0.5">{t('myNutritionPlanDesc')}</p>
      </div>

      {/* Plan header card — dark navy */}
      <NutritionPlanHeader plan={nutritionPlan} />

      {/* Macro targets */}
      <div className="mt-4">
        <MacroTargets macros={nutritionPlan.macros} />
      </div>

      {/* Day selector */}
      <div className="mt-4">
        <DaySelector
          days={DAYS}
          activeDay={activeDay}
          today={TODAY_DAY}
          onSelect={setActiveDay}
        />
      </div>

      {/* Daily summary strip */}
      <div className="mt-4 bg-green/5 border border-green/20 rounded-xl px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-green font-semibold text-sm">
            {activeDay} · Total
          </span>
          <span className="text-primary font-black text-lg">
            {activeDayPlan.totalCalories} kcal
          </span>
        </div>
        <span className="text-secondary text-xs">
          Target: {nutritionPlan.calorieTarget} kcal
          {activeDayPlan.totalCalories < nutritionPlan.calorieTarget
            ? ` · ${nutritionPlan.calorieTarget - activeDayPlan.totalCalories} kcal remaining`
            : ' · Goal reached ✓'
          }
        </span>
      </div>

      {/* Meal cards */}
      <div className="mt-4 flex flex-col gap-3">
        {activeDayPlan.meals.map(meal => (
          <MealCard
            key={meal.type}
            meal={meal}
            isExpanded={expandedMeals.has(meal.type)}
            onToggle={() => handleToggleMeal(meal.type)}
          />
        ))}
      </div>

      {/* Hydration tracker */}
      <div className="mt-6">
        <HydrationTracker
          consumed={activeDayPlan.waterGlasses}
          target={activeDayPlan.waterTarget}
        />
      </div>

      {/* Trainer note */}
      <div className="mt-4 bg-ghost border border-stroke rounded-xl p-4 flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
          JC
        </div>
        <div>
          <p className="text-primary text-sm font-semibold">
            Note from James Carter
          </p>
          <p className="text-secondary text-xs mt-1 leading-relaxed">
            "Great progress, Sarah! Focus on hitting your protein targets —
            especially post-workout. Try to eat within 30 minutes after training
            for best muscle recovery results."
          </p>
        </div>
      </div>
    </div>
  );
}
