using FitCore.Api.Domain.Entites.BaseEntites;

namespace FitCore.Api.Domain.Entites
{
    public class MemberNutritionPlan : TenantEntityWithChangeTracking
    {
        public Guid MemberId { get; set; }
        public Member Member { get; set; }
        public Guid NutritionPlanId { get; set; }
        public NutritionPlan NutritionPlan { get; set; }
        public DateTime AssignedOn { get; set; }
    }
}
