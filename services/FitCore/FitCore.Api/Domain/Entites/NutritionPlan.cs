using FitCore.Api.Domain.Entites.BaseEntites;

namespace FitCore.Api.Domain.Entites
{
    public enum NutritionPlanGoal
    {
        WeightLoss = 1,
        MuscleGain = 2,
        Maintenance = 3
    }

    public class NutritionPlan : TenantEntityWithChangeTracking
    {
        public Guid TrainerId { get; set; }
        public Trainer Trainer { get; set; }
        public string Name { get; set; }
        public NutritionPlanGoal Goal { get; set; }
        public int CalorieTarget { get; set; }
        public int ProteinGrams { get; set; }
        public int CarbGrams { get; set; }
        public int FatGrams { get; set; }
    }
}
