using FitCore.Api.Application.Interfaces.Repositories;
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

        public virtual IQueryable<T> Query()
        {
            return context.Set<T>();
        }

        public virtual async Task AddAsync(T entity)
        {
            await context.Set<T>().AddAsync(entity);
        }

        public async Task CommitAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}
