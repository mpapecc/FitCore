using System.Security.Claims;
using FitCore.Api.Application.Interfaces;

namespace FitCore.Api.Infrastructure.Services
{
    public class CurrentUserService : ICurrentUserService
    {
        private readonly IHttpContextAccessor _httpContext;

        public CurrentUserService(IHttpContextAccessor httpContext)
        {
            _httpContext = httpContext;
        }

        public Guid UserId =>
            Guid.Parse(_httpContext.HttpContext!.User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        public Guid TenantId =>
            Guid.Parse(_httpContext.HttpContext!.User.FindFirstValue("tenantId")!);

        public string Role =>
            _httpContext.HttpContext!.User.FindFirstValue(ClaimTypes.Role) ?? string.Empty;

        public bool IsAuthenticated =>
            _httpContext.HttpContext?.User.Identity?.IsAuthenticated ?? false;
    }
}
