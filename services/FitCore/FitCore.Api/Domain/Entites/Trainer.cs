using FitCore.Api.Domain.Entites.BaseEntites;

namespace FitCore.Api.Domain.Entites
{
    public class Trainer : TenantEntityWithChangeTracking
    {
        public required Guid UserId { get; set; }
        public User User { get; set; }
        public required string Bio { get; set; }
        public required string Sepcialization { get; set; }
        public bool IsAdmin { get; set; }
    }
}
