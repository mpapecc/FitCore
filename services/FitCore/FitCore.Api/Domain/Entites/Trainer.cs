using FitCore.Api.Domain.Entites.BaseEntites;

namespace FitCore.Api.Domain.Entites
{
    public class Trainer : TenantEntityWithChangeTracking
    {
        public required Guid UserId { get; set; }
        public User User { get; set; }
        public string Bio { get; set; }
        public string Sepcialization { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsOnboardingCompleted { get; set; } = false;
    }
}
