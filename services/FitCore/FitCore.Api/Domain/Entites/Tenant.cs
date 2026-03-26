using FitCore.Api.Domain.Entites.BaseEntites;

namespace FitCore.Api.Domain.Entites
{
    public class Tenant : BaseEntityWithChangeTracking
    {
        public required string Name { get; set; }
        public required string Slug { get; set; }
    }
}
