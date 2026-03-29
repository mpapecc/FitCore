using System.Text;
using FitCore.Api.Application.Interfaces;
using FitCore.Api.Domain.Entites;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;

namespace FitCore.Api.Application.Features.Auth.Commands
{
    public record ResetPasswordCommand(
    string Email,
    string Token,
    string NewPassword
) : IRequest<Unit>;

    public class ResetPasswordHandler : IRequestHandler<ResetPasswordCommand, Unit>
    {
        private readonly UserManager<User> _userManager;
        private readonly IBaseRepository<RefreshToken> refreshTokenRepository;

        public ResetPasswordHandler(UserManager<User> userManager, IBaseRepository<RefreshToken> refreshTokenRepository)
        {
            _userManager = userManager;
            this.refreshTokenRepository = refreshTokenRepository;
        }

        public async Task<Unit> Handle(
            ResetPasswordCommand request,
            CancellationToken ct)
        {
            var user = await _userManager.FindByEmailAsync(request.Email)
                ?? throw new Exception("User not found");

            var encodedToken = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(request.Token));

            var result = await _userManager
                .ResetPasswordAsync(user, encodedToken, request.NewPassword);

            if (!result.Succeeded)
            {
                var errors = string.Join(", ", result.Errors.Select(e => e.Description));
                throw new Exception(errors);
            }

            // Revoke all existing refresh tokens on password reset
            var activeTokens = await this.refreshTokenRepository
                .Query()
                .Where(t => t.UserId == user.Id && t.RevokedOn == null)
                .ToListAsync(ct);

            foreach (var token in activeTokens)
                token.RevokedOn = DateTime.UtcNow;

            await this.refreshTokenRepository.CommitAsync();

            return Unit.Value;
        }
    }
}
