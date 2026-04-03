import { useState } from "react";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NutritionPlanList } from "../../components/nutrition/NutritionPlanList";
import { NutritionPlanDetail } from "../../components/nutrition/NutritionPlanDetail";
import { nutritionPlans } from "../../components/nutrition/nutritionData";

export default function NutritionPlansPage() {
  const { t } = useTranslation("admin");
  const [selectedPlanId, setSelectedPlanId] = useState<string>(
    nutritionPlans[0].id,
  );

  const selectedPlan =
    nutritionPlans.find((p) => p.id === selectedPlanId) ?? nutritionPlans[0];

  return (
    <div className="flex flex-col min-h-0 flex-1">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-primary">{t("nutrition")}</h1>
          <p className="text-secondary text-sm mt-0.5">{t("nutritionPlansDesc")}</p>
        </div>
        <button className="flex items-center gap-2 bg-green text-white font-semibold px-4 py-2 rounded-lg transition-all duration-DEFAULT active:scale-95 hover:bg-green-hover">
          <Plus size={16} />
          {t("createPlan")}
        </button>
      </div>

      {/* Two-panel layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 h-[calc(100vh-200px)]">
        <NutritionPlanList
          plans={nutritionPlans}
          selectedPlanId={selectedPlanId}
          onSelectPlan={setSelectedPlanId}
        />
        <NutritionPlanDetail
          plan={selectedPlan}
          onEdit={(id) => console.log("Edit plan", id)}
          onAssign={(id) => console.log("Assign plan", id)}
        />
      </div>
    </div>
  );
}
