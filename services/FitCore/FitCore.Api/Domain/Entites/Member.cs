using FitCore.Api.Domain.Entites.BaseEntites;

namespace FitCore.Api.Domain.Entites
{
    public class Member : TenantEntityWithChangeTracking
    {
        public required Guid UserId { get; set; }
        public User User { get; set; }
    }
}
