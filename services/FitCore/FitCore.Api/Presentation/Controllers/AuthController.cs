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
        private const string RefreshTokenCookie = "refresh_token";

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
        /// Step 2 of login — selects a tenant, returns scoped JWT; sets refresh token as HttpOnly cookie
        /// </summary>
        [HttpPost("select-tenant")]
        public async Task<IActionResult> SelectTenant(
            [FromBody] SelectTenantCommand command,
            CancellationToken ct)
        {
            var result = await _mediator.Send(command, ct);

            SetRefreshTokenCookie(result.RefreshToken);

            return Ok(new SelectTenantClientResponse(
                result.AccessToken,
                result.UserId,
                result.TenantId,
                result.Role,
                result.IsOnboardingCompleted));
        }

        /// <summary>
        /// Refresh access token.
        /// Web: refresh token is read from the HttpOnly cookie (body is empty).
        /// Mobile: refresh token is passed in the request body.
        /// </summary>
        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh(
            [FromBody] RefreshRequest? body,
            CancellationToken ct)
        {
            // Cookie takes precedence (web); fall back to body field (mobile)
            var refreshToken = Request.Cookies[RefreshTokenCookie]
                ?? body?.RefreshToken;

            if (string.IsNullOrWhiteSpace(refreshToken))
                return Unauthorized(new { message = "Missing refresh token" });

            var result = await _mediator.Send(new RefreshTokenCommand(refreshToken), ct);

            // Set rotated cookie for web clients; mobile reads the token from the response body
            SetRefreshTokenCookie(result.NewRefreshToken);

            return Ok(new { accessToken = result.AccessToken, refreshToken = result.NewRefreshToken });
        }

        public record RefreshRequest(string? RefreshToken);

        /// <summary>
        /// Logout — clears the refresh token cookie
        /// </summary>
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete(RefreshTokenCookie, new CookieOptions { SameSite = SameSiteMode.Strict });
            return Ok(new { success = true });
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

        private void SetRefreshTokenCookie(string token)
        {
            Response.Cookies.Append(RefreshTokenCookie, token, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTimeOffset.UtcNow.AddDays(30),
                Path = "/api/auth",  // only sent to auth endpoints
            });
        }
    }
}
