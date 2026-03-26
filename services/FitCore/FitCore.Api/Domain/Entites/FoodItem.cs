using FitCore.Api.Domain.Entites.BaseEntites;

namespace FitCore.Api.Domain.Entites
{
    public class FoodItem : TenantEntityWithChangeTracking
    {
        public Guid MealId { get; set; }
        public Meal Meal { get; set; }
        public string Name { get; set; }
        public int Portion { get; set; }
        public int Calories { get; set; }
        public int ProteinGrams { get; set; }
        public int CarbGrams { get; set; }
        public int FatGrams { get; set; }
    }
}
