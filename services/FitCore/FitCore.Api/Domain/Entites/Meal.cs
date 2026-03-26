using FitCore.Api.Domain.Entites.BaseEntites;

namespace FitCore.Api.Domain.Entites
{
    public enum MealType
    {
        Breakfast = 1,
        Lunch = 2,
        Dinner = 3,
        Snack = 4
    }

    public class Meal : TenantEntityWithChangeTracking
    {
        public Guid NutritionPlanId { get; set; }
        public NutritionPlan NutritionPlan { get; set; }
        public MealType MealType { get; set; }
        public int TotalCalories { get; set; }
        public int ProteinGrams { get; set; }
        public int CarbGrams { get; set; }
        public int FatGrams { get; set; }
    }
}
