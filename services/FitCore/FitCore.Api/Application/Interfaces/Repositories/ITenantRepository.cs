using FitCore.Api.Domain.Entites.BaseEntites;

namespace FitCore.Api.Application.Interfaces.Repositories
{
    public interface ITenantRepository<T> : IBaseRepository<T> where T : TenantEntityWithChangeTracking
    {
    }
}
