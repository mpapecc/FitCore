using FitCore.Api.Application.Interfaces;
using FitCore.Api.Domain.Entites.BaseEntites;

namespace FitCore.Api.Infrastructure.Persistance
{
    public class BaseRepository<T> : IBaseRepository<T> where T : BaseEntity
    {
        private readonly FitCoreContext context;

        public BaseRepository(FitCoreContext context)
        {
            this.context = context;
        }

        public IQueryable<T> Query()
        {
            return context.Set<T>();
        }

        public async Task AddAsync(T entity)
        {
            await context.Set<T>().AddAsync(entity);
        }

        public async Task<T?> GetByIdAsync(Guid id)
        {
            return await context.Set<T>().FindAsync(id);
        }

        public async Task CommitAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}
