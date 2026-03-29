namespace FitCore.Api.Domain.Entites.BaseEntites
{
    public interface IChangeTrackingEntity
    {
        DateTime CreatedOn { get; set; }
        DateTime UpdatedOn { get; set; }
    }

    public abstract class BaseEntityWithChangeTracking : BaseEntity, IChangeTrackingEntity
    {
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
    }
}
