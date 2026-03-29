namespace FitCore.Api.Domain.Entites.BaseEntites
{
    public abstract class BaseDictionary : TenantEntityWithChangeTracking
    {
        public required string Name { get; set; }
    }
}
