using System.Security.Claims;

namespace FitCore.Api.Application.Interfaces
{
    public interface IJwtService
    {
        string GenerateSelectorToken(Guid userId);
        string GenerateAccessToken(Guid userId, Guid tenantId, string role);
        string GenerateRefreshToken();
        ClaimsPrincipal? ValidateToken(string token);
    }
}
