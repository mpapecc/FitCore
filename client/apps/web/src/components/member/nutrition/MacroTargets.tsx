import { type NutritionPlan } from '../../../pages/member/nutrition/myNutritionData';

interface MacroTargetsProps {
  macros: NutritionPlan['macros'];
}

const macroLabels = ['Protein', 'Carbs', 'Fat'] as const;

export function MacroTargets({ macros }: MacroTargetsProps) {
  const rows = [
    { label: 'Protein', ...macros.protein },
    { label: 'Carbs',   ...macros.carbs   },
    { label: 'Fat',     ...macros.fat     },
  ];

  return (
    <div className="bg-white border border-stroke rounded-xl shadow-sm p-6">
      <p className="text-base font-semibold text-primary mb-5">Macro Targets</p>

      <div className="flex flex-col gap-4">
        {rows.map(({ label, grams, percentage, color }) => (
          <div key={label}>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-sm font-medium text-primary">{label}</span>
              <span className="text-sm text-secondary">{grams}g · {percentage}%</span>
            </div>

            <div className="w-full h-3 bg-ghost rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full duration-500 ease-out ${color}`}
                style={{ width: `${percentage}%` }}
              />
            </div>

            <div className="flex justify-between text-xs text-secondary mt-1">
              <span>0g</span>
              <span>{grams}g target</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

