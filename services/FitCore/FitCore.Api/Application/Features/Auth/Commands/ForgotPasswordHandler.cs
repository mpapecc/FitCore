using System.Text;
using FitCore.Api.Application.Interfaces;
using FitCore.Api.Domain.Entites;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;

namespace FitCore.Api.Application.Features.Auth.Commands
{
    public record ForgotPasswordCommand(string Email) : IRequest<Unit>;
    public class ForgotPasswordHandler : IRequestHandler<ForgotPasswordCommand, Unit>
    {
        private readonly UserManager<User> _userManager;
        private readonly IEmailService _emailService;

        public ForgotPasswordHandler(
            UserManager<User> userManager,
            IEmailService emailService)
        {
            _userManager = userManager;
            _emailService = emailService;
        }

        public async Task<Unit> Handle(
            ForgotPasswordCommand request,
            CancellationToken ct)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);

            // Always return success even if user not found
            // This prevents email enumeration attacks
            if (user == null || !user.EmailConfirmed)
                return Unit.Value;

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var encodedToken = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));
            await _emailService.SendPasswordResetAsync(
                user.Email!, user.FirstName, encodedToken, ct);

            return Unit.Value;
        }
    }
}
