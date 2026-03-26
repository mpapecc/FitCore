namespace FitCore.Api.Domain.Entites.BaseEntites
{
    public abstract class BaseEntityWithChangeTracking : BaseEntity
    {
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
    }
}
