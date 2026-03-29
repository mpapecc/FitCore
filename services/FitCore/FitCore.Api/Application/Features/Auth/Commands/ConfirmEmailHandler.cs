using System.Text;
using FitCore.Api.Application.Interfaces;
using FitCore.Api.Domain.Entites;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;

namespace FitCore.Api.Application.Features.Auth.Commands
{
    public record ConfirmEmailCommand(
    string Email,
    string Token
) : IRequest<Unit>;

    public class ConfirmEmailHandler : IRequestHandler<ConfirmEmailCommand, Unit>
    {
        private readonly UserManager<User> _userManager;
        private readonly IEmailService _emailService;

        public ConfirmEmailHandler(
            UserManager<User> userManager,
            IEmailService emailService)
        {
            _userManager = userManager;
            _emailService = emailService;
        }

        public async Task<Unit> Handle(
            ConfirmEmailCommand request,
            CancellationToken ct)
        {
            var user = await _userManager.FindByEmailAsync(request.Email)
                ?? throw new Exception("User not found");

            var decodedToken = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(request.Token));

            var result = await _userManager.ConfirmEmailAsync(user, decodedToken);
            if (!result.Succeeded)
                throw new Exception("Invalid or expired confirmation token");

            // Send welcome email after confirmation
            await _emailService.SendWelcomeEmailAsync(
                user.Email!, user.FirstName, ct);

            return Unit.Value;
        }
    }
}
