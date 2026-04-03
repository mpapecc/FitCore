using FitCore.Api.Domain.Entites.BaseEntites;

namespace FitCore.Api.Application.Interfaces.Repositories
{
    public interface IBaseRepository<T> where T : IBaseEntity<Guid>
    {
        IQueryable<T> Query();
        Task AddAsync(T entity);
        Task CommitAsync();
    }
}
