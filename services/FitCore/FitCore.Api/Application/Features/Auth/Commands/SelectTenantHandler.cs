using System;
using System.Security.Claims;
using FitCore.Api.Application.Interfaces;
using FitCore.Api.Domain.Entites;
using FitCore.Api.Infrastructure.Settings;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.JsonWebTokens;

namespace FitCore.Api.Application.Features.Auth.Commands
{
    public record SelectTenantCommand(string SelectorToken, Guid TenantId) : IRequest<SelectTenantResponse>;

    public record SelectTenantResponse(string AccessToken, string RefreshToken, Guid UserId, Guid TenantId, string Role);

    public class SelectTenantHandler : IRequestHandler<SelectTenantCommand, SelectTenantResponse>
    {
        private readonly IBaseRepository<Tenant> tenantRepository;
        private readonly IBaseRepository<Trainer> trainerRepository;
        private readonly IBaseRepository<Member> memberRepository;
        private readonly ICurrentUserService currentUserService;
        private readonly IBaseRepository<RefreshToken> refreshTokenRepository;
        private readonly IJwtService jwtService;
        private readonly IConfiguration configuration;

        public SelectTenantHandler(
            IBaseRepository<Tenant> tenantRepository,
            IJwtService jwt,
            IConfiguration config,
            IBaseRepository<RefreshToken> refreshTokenRepository,
            IBaseRepository<Trainer> trainerRepository,
            IBaseRepository<Member> memberRepository,
            ICurrentUserService currentUserService)
        {
            this.tenantRepository = tenantRepository;
            this.jwtService = jwt;
            this.configuration = config;
            this.refreshTokenRepository = refreshTokenRepository;
            this.trainerRepository = trainerRepository;
            this.memberRepository = memberRepository;
            this.currentUserService = currentUserService;
        }

        public async Task<SelectTenantResponse> Handle(
            SelectTenantCommand request,
            CancellationToken ct)
        {
            // Validate selector token
            var principal = jwtService.ValidateToken(request.SelectorToken)
                ?? throw new Exception("Invalid or expired token");

            var userId = Guid.Parse(
                principal.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var tokenType = principal.FindFirstValue("type");
            if (tokenType != "selector")
                throw new Exception("Invalid token type");

            // Verify tenant exists
            var tenant = await this.tenantRepository
                .Query()
                .FirstOrDefaultAsync(t => t.Id == request.TenantId, ct)
                ?? throw new Exception("Tenant not found");

            // Derive role from data
            var role = await DeriveRoleAsync(userId, request.TenantId, ct);

            // Generate refresh token
            var refreshTokenValue = jwtService.GenerateRefreshToken();
            var jwtSettings = configuration.GetSection("JwtSettings").Get<JwtSettings>()!;

            var refreshToken = new RefreshToken
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                Token = refreshTokenValue,
                CreatedOn = DateTime.UtcNow,
                ExpiresAt = DateTime.UtcNow.AddDays(jwtSettings.RefreshTokenExpiryDays),
            };

            await this.refreshTokenRepository.AddAsync(refreshToken);
            await this.refreshTokenRepository.CommitAsync();

            // Generate scoped access token
            var accessToken = jwtService.GenerateAccessToken(userId, request.TenantId, role);

            return new SelectTenantResponse(
                accessToken,
                refreshTokenValue,
                userId,
                request.TenantId,
                role);
        }

        private async Task<string> DeriveRoleAsync(
            Guid userId,
            Guid tenantId,
            CancellationToken ct)
        {
            // Member check
            var isMember = await this.memberRepository
                .Query()
                .AnyAsync(m => m.UserId == userId && m.TenantId == tenantId, ct);

            if (isMember) return "Member";

            // Trainer check
            var ownerInfo = await this.trainerRepository
                .Query()
                .Where(t => t.UserId == userId && t.TenantId == tenantId)
                .Select(x => new { x.IsAdmin })
                .FirstOrDefaultAsync();

            if (ownerInfo == null)
                throw new Exception("You do not have access to this gym");

            if(ownerInfo.IsAdmin)
                return "Admin";

            return "Trainer";

        }
    }
}
