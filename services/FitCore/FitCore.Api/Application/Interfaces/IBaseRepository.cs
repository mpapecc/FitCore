using FitCore.Api.Domain.Entites.BaseEntites;

namespace FitCore.Api.Application.Interfaces
{
    public interface IBaseRepository<T> where T : IBaseEntity<Guid>
    {
        IQueryable<T> Query();
        Task<T?> GetByIdAsync(Guid id);
        Task AddAsync(T entity);
        Task CommitAsync();
    }
}
