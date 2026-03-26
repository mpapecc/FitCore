using FitCore.Api.Domain.Entites.BaseEntites;

namespace FitCore.Api.Domain.Entites
{
    public enum MembershipStatus
    {
        Active = 1,
        Inactive = 2,
        Expired = 3
    }

    public class MemberMembership : TenantEntityWithChangeTracking
    {
        public Guid MemberId { get; set; }
        public required Member Member { get; set; }
        public Guid MembershipPlanId { get; set; }
        public required MembershipPlan MembershipPlan { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public MembershipStatus Status { get; set; }
    }
}
