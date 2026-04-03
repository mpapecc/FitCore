using FitCore.Api.Application.Interfaces;
using FitCore.Api.Application.Interfaces.Repositories;
using FitCore.Api.Domain.Entites.BaseEntites;
using Microsoft.EntityFrameworkCore;

namespace FitCore.Api.Infrastructure.Persistance
{
    public class TenantRepository<T> : BaseRepository<T>, ITenantRepository<T> where T : TenantEntityWithChangeTracking
    {
        private readonly FitCoreContext context;
        private readonly ICurrentUserService currentUserService;

        public TenantRepository(
            FitCoreContext context, 
            ICurrentUserService currentUserService
            ) : base(context)
        {
            this.context = context;
            this.currentUserService = currentUserService;
        }

        public override IQueryable<T> Query()
        {
            return base.Query().Where(x => x.TenantId == currentUserService.TenantId);
        }

        public override Task AddAsync(T entity)
        {
            entity.TenantId = currentUserService.TenantId;
            return base.AddAsync(entity);
        }
    }
}
