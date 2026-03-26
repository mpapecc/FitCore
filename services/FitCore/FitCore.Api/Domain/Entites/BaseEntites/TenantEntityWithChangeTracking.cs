namespace FitCore.Api.Domain.Entites.BaseEntites
{
    public abstract class TenantEntityWithChangeTracking : BaseEntityWithChangeTracking
    {
        public required Guid TenantId { get; set; }
        public Tenant Tenant { get; set; }
    }
}
