using FitCore.Api.Application.Interfaces;
using FitCore.Api.Infrastructure.Services.Email.Templates.EmailConfirmation;
using FitCore.Api.Infrastructure.Services.Email.Templates.Invitation;
using FitCore.Api.Infrastructure.Services.Email.Templates.PasswordReset;
using FitCore.Api.Infrastructure.Services.Email.Templates.Welcome;
using FitCore.Api.Infrastructure.Settings;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace FitCore.Api.Infrastructure.Services.Email;

public class EmailService : IEmailService
{
    private readonly EmailSettings _settings;
    private readonly AppSettings _appSettings;
    private readonly RazorEngineService _razor;

    public EmailService(
        IOptions<EmailSettings> settings,
        IOptions<AppSettings> appSettings,
        RazorEngineService razor)
    {
        _settings = settings.Value;
        _appSettings = appSettings.Value;
        _razor = razor;
    }

    public async Task SendEmailConfirmationAsync(
        string email, string name, string token,
        CancellationToken ct = default)
    {
        var confirmUrl = BuildUrl("/confirm-email", token, email);
        var body = await _razor.RenderAsync("EmailConfirmation",
            new EmailConfirmationModel { Name = name, ConfirmUrl = confirmUrl });
        await SendAsync(email, name, "Confirm your FitCore email", body, ct);
    }

    public async Task SendPasswordResetAsync(
        string email, string name, string token,
        CancellationToken ct = default)
    {
        var resetUrl = BuildUrl("/reset-password", token, email);
        var body = await _razor.RenderAsync("PasswordReset",
            new PasswordResetModel { Name = name, ResetUrl = resetUrl });
        await SendAsync(email, name, "Reset your FitCore password", body, ct);
    }

    public async Task SendWelcomeEmailAsync(
        string email, string name,
        CancellationToken ct = default)
    {
        var body = await _razor.RenderAsync("Welcome",
            new WelcomeModel
            {
                Name = name,
                LoginUrl = $"{_appSettings.BaseUrl}/login"
            });
        await SendAsync(email, name, "Welcome to FitCore!", body, ct);
    }

    public async Task SendInvitationAsync(
        string email, string gymName, string invitedByName, string token,
        CancellationToken ct = default)
    {
        var registerUrl = BuildUrl("/register", token, email);
        var body = await _razor.RenderAsync("Invitation",
            new InvitationModel
            {
                GymName = gymName,
                InvitedByName = invitedByName,
                RegisterUrl = registerUrl
            });
        await SendAsync(email, email,
            $"You have been invited to join {gymName} on FitCore", body, ct);
    }

    private string BuildUrl(string path, string token, string email) =>
        $"{_appSettings.BaseUrl}{path}" +
        $"?token={Uri.EscapeDataString(token)}" +
        $"&email={Uri.EscapeDataString(email)}";

    private async Task SendAsync(
        string toEmail, string toName,
        string subject, string htmlBody,
        CancellationToken ct)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(_settings.SenderName, _settings.SenderEmail));
        message.To.Add(new MailboxAddress(toName, toEmail));
        message.Subject = subject;
        message.Body = new BodyBuilder { HtmlBody = htmlBody }.ToMessageBody();

        using var client = new SmtpClient();

        if (string.IsNullOrEmpty(_settings.Username))
            await client.ConnectAsync(_settings.SmtpHost, _settings.SmtpPort,
                SecureSocketOptions.None, ct);
        else
        {
            await client.ConnectAsync(_settings.SmtpHost, _settings.SmtpPort,
                SecureSocketOptions.StartTls, ct);
            await client.AuthenticateAsync(_settings.Username, _settings.Password, ct);
        }

        await client.SendAsync(message, ct);
        await client.DisconnectAsync(true, ct);
    }
}