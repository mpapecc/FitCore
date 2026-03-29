using FitCore.Api.Application.Features.Auth.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace FitCore.Api.Presentation.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AuthController(IMediator mediator)
        {
            _mediator = mediator;
        }

        /// <summary>
        /// Step 1 of login — validates credentials, returns selector token and tenant list
        /// </summary>
        [HttpPost("login")]
        public async Task<IActionResult> Login(
            [FromBody] LoginCommand command,
            CancellationToken ct)
        {
            var result = await _mediator.Send(command, ct);
            return Ok(result);
        }

        /// <summary>
        /// Step 2 of login — selects a tenant, returns scoped JWT + refresh token
        /// </summary>
        [HttpPost("select-tenant")]
        public async Task<IActionResult> SelectTenant(
            [FromBody] SelectTenantCommand command,
            CancellationToken ct)
        {
            var result = await _mediator.Send(command, ct);
            return Ok(result);
        }

        /// <summary>
        /// Register a new user via invitation token
        /// </summary>
        [HttpPost("register")]
        public async Task<IActionResult> Register(
            [FromBody] RegisterCommand command,
            CancellationToken ct)
        {
            await _mediator.Send(command, ct);
            return Ok(new
            {
                success = true,
                message = "Registration successful. Please check your email to confirm your account."
            });
        }

        /// <summary>
        /// Confirm email address via token sent in email
        /// </summary>
        [HttpPost("confirm-email")]
        public async Task<IActionResult> ConfirmEmail(
            [FromBody] ConfirmEmailCommand command,
            CancellationToken ct)
        {
            await _mediator.Send(command, ct);
            return Ok(new
            {
                success = true,
                message = "Email confirmed successfully. You can now log in."
            });
        }

        /// <summary>
        /// Request a password reset email
        /// </summary>
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(
            [FromBody] ForgotPasswordCommand command,
            CancellationToken ct)
        {
            await _mediator.Send(command, ct);
            return Ok(new
            {
                success = true,
                message = "If an account exists with this email, a reset link has been sent."
            });
        }

        /// <summary>
        /// Reset password using token from email
        /// </summary>
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(
            [FromBody] ResetPasswordCommand command,
            CancellationToken ct)
        {
            await _mediator.Send(command, ct);
            return Ok(new
            {
                success = true,
                message = "Password reset successfully. You can now log in."
            });
        }
    }
}
