using FitCore.Api.Domain.Entites.BaseEntites;
using FitCore.Api.Domain.Entites.Dictionaries;

namespace FitCore.Api.Domain.Entites
{
    public class MemberFitnessGoal : TenantEntityWithChangeTracking
    {
        public required Guid MemberId { get; set; }
        public Member Member { get; set; }
        public required Guid FitnessGoalId { get; set; }
        public FitnessGoal FitnessGoal { get; set; }
    }
}
