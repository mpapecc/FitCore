using FitCore.Api.Application.Interfaces;
using FitCore.Api.Domain.Entites;
using FitCore.Api.Infrastructure.Settings;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace FitCore.Api.Application.Features.Auth.Commands
{
    public record RefreshTokenCommand(string RefreshToken) : IRequest<RefreshTokenResponse>;

    public record RefreshTokenResponse(string AccessToken, string NewRefreshToken);

    public class RefreshTokenHandler : IRequestHandler<RefreshTokenCommand, RefreshTokenResponse>
    {
        private readonly IBaseRepository<RefreshToken> _refreshTokenRepository;
        private readonly IBaseRepository<Member> _memberRepository;
        private readonly IBaseRepository<Trainer> _trainerRepository;
        private readonly IJwtService _jwtService;
        private readonly JwtSettings _jwtSettings;

        public RefreshTokenHandler(
            IBaseRepository<RefreshToken> refreshTokenRepository,
            IBaseRepository<Member> memberRepository,
            IBaseRepository<Trainer> trainerRepository,
            IJwtService jwtService,
            IOptions<JwtSettings> jwtSettings)
        {
            _refreshTokenRepository = refreshTokenRepository;
            _memberRepository = memberRepository;
            _trainerRepository = trainerRepository;
            _jwtService = jwtService;
            _jwtSettings = jwtSettings.Value;
        }

        public async Task<RefreshTokenResponse> Handle(RefreshTokenCommand request, CancellationToken ct)
        {
            var stored = await _refreshTokenRepository
                .Query()
                .FirstOrDefaultAsync(r => r.Token == request.RefreshToken, ct)
                ?? throw new Exception("Invalid refresh token");

            if (!stored.IsActive)
                throw new Exception("Refresh token is no longer active");

            // Re-derive role from DB so permission changes take effect immediately
            var role = await DeriveRoleAsync(stored.UserId, stored.TenantId, ct);

            // Rotate: revoke old, issue new
            var newRefreshTokenValue = _jwtService.GenerateRefreshToken();

            stored.RevokedOn = DateTime.UtcNow;
            stored.ReplacedByToken = newRefreshTokenValue;

            var newRefreshToken = new RefreshToken
            {
                Id = Guid.NewGuid(),
                UserId = stored.UserId,
                TenantId = stored.TenantId,
                Token = newRefreshTokenValue,
                CreatedOn = DateTime.UtcNow,
                ExpiresAt = DateTime.UtcNow.AddDays(_jwtSettings.RefreshTokenExpiryDays),
            };

            await _refreshTokenRepository.AddAsync(newRefreshToken);
            await _refreshTokenRepository.CommitAsync();

            var newAccessToken = _jwtService.GenerateAccessToken(stored.UserId, stored.TenantId, role);

            return new RefreshTokenResponse(newAccessToken, newRefreshTokenValue);
        }

        private async Task<string> DeriveRoleAsync(Guid userId, Guid tenantId, CancellationToken ct)
        {
            var isMember = await _memberRepository
                .Query()
                .AnyAsync(m => m.UserId == userId && m.TenantId == tenantId, ct);

            if (isMember) return "Member";

            var trainerData = await _trainerRepository
                .Query()
                .Where(t => t.UserId == userId && t.TenantId == tenantId)
                .Select(x => new { x.IsAdmin })
                .FirstOrDefaultAsync(ct)
                ?? throw new Exception("You do not have access to this gym");

            return trainerData.IsAdmin ? "Admin" : "Trainer";
        }
    }
}
