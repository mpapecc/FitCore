using System.Reflection;
using FitCore.Api.Application.Interfaces;
using FitCore.Api.Domain;
using FitCore.Api.Domain.Entites.BaseEntites;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Org.BouncyCastle.Security;

namespace FitCore.Api.Infrastructure.Services
{
    public class DictionaryDto
    {
        public Guid Id { get; set; }
        public string Label { get; set; }
        public string Description { get; set; }
    }

    public class DictionaryService
    {
        private readonly IMemoryCache cache;
        private readonly ICurrentUserService currentUserService;
        private readonly IServiceScopeFactory scopeFactory;

        public DictionaryService(
            IMemoryCache cache,
            ICurrentUserService currentUserService,
            IServiceScopeFactory scopeFactory)
        {
            this.cache = cache;
            this.currentUserService = currentUserService;
            this.scopeFactory = scopeFactory;
        }

        public async Task<List<DictionaryDto>?> GetDictionaryItems<T>(T type,TimeSpan? absoluteExpirationRelativeToNow = null)
            where T : BaseDictionary
        {
            return await GetDictionaryItems<T>(absoluteExpirationRelativeToNow);
        }

        public async Task<List<DictionaryDto>?> GetDictionaryItems<T>(TimeSpan? absoluteExpirationRelativeToNow = null)
            where T : BaseDictionary
        {
            var key = $"{currentUserService.TenantId}_{typeof(T).Name}";

            if (cache.TryGetValue(key, out List<DictionaryDto>? cachedValue))
                return cachedValue;

            using (var scope = scopeFactory.CreateScope())
            {
                var dictionaryRepository = scope.ServiceProvider.GetRequiredService<IBaseRepository<T>>();
                var values = await dictionaryRepository
                    .Query()
                    .Where(x => x.TenantId == currentUserService.TenantId || x.TenantId == PrimordialTenantContants.Id)
                    .Select(x => new DictionaryDto
                    {
                        Id = x.Id,
                        Label = x.Label,
                        Description = x.Description
                    })
                    .ToListAsync();

                var cacheEntryOptions = new MemoryCacheEntryOptions()
                // Set priority to NeverRemove
                .SetPriority(CacheItemPriority.NeverRemove);

                cache.Set(key, values, cacheEntryOptions);

                return values;
            }
        }
    }
}
