using FitCore.Api.Domain.Entites.BaseEntites;

namespace FitCore.Api.Domain.Entites
{
    public class MembershipPlan : TenantEntityWithChangeTracking
    {
        public required string Name { get; set; }
        public int Price { get; set; }
        public string Description { get; set; } = string.Empty;
        public int DurationInDays { get; set; }
        public bool IsActive { get; set; }
    }
}
