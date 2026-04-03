using FitCore.Api.Domain.Entites.BaseEntites;
using FitCore.Api.Domain.Entites.Dictionaries;

namespace FitCore.Api.Domain.Entites
{
    public enum MemberStatus
    {
        Inactive,
        Active,
        Overdue
    }

    public class Member : TenantEntityWithChangeTracking
    {
        public int? CurrentWeight { get; set; }
        public int? CurrentHeight { get; set; }
        public bool IsOnboardingCompleted { get; set; } = false;
        public MemberStatus MemberStatus { get; set; }
        public required Guid UserId { get; set; }
        public User User { get; set; }
        public ICollection<MemberFitnessGoal> MemberFitnessGoals { get; set; }
        public Guid? ActivityLevelId { get; set; }
        public ActivityLevel? ActivityLevel { get; set; }
    }
}
