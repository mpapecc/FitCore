namespace FitCore.Api.Application.Interfaces
{
    public interface IEmailService
    {
        Task SendEmailConfirmationAsync(
            string email,
            string name,
            string token,
            CancellationToken ct = default);

        Task SendPasswordResetAsync(
            string email,
            string name,
            string token,
            CancellationToken ct = default);

        Task SendWelcomeEmailAsync(
            string email,
            string name,
            CancellationToken ct = default);

        Task SendInvitationAsync(
            string email,
            string gymName,
            string invitedByName,
            string token,
            CancellationToken ct = default);
    }
}
