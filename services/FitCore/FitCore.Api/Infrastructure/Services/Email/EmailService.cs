using System.Text;
using FitCore.Api.Application.Interfaces;
using FitCore.Api.Domain.Entites;
using FitCore.Api.Infrastructure.Services.Email.Templates.EmailConfirmation;
using FitCore.Api.Infrastructure.Services.Email.Templates.Invitation;
using FitCore.Api.Infrastructure.Services.Email.Templates.PasswordReset;
using FitCore.Api.Infrastructure.Services.Email.Templates.Welcome;
using FitCore.Api.Infrastructure.Settings;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Options;
using MimeKit;

namespace FitCore.Api.Infrastructure.Services.Email;

public class EmailService : IEmailService
{
    private readonly EmailSettings _settings;
    private readonly AppSettings _appSettings;
    private readonly RazorEngineService _razor;
    private readonly UserManager<User> userManager;

    public EmailService(
        IOptions<EmailSettings> settings,
        IOptions<AppSettings> appSettings,
        RazorEngineService razor,
        UserManager<User> userManager)
    {
        _settings = settings.Value;
        _appSettings = appSettings.Value;
        _razor = razor;
        this.userManager = userManager;
    }

    public async Task SendEmailConfirmationAsync(
        User user,
        CancellationToken ct = default)
    {
        // Send email confirmation
        var confirmToken = await this.userManager.GenerateEmailConfirmationTokenAsync(user);
        var encodedToken = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(confirmToken));
        var confirmUrl = BuildEmalAndTokenUrl("/confirm-email", encodedToken, user.Email!);

        var body = await _razor.RenderAsync("EmailConfirmation",
            new EmailConfirmationModel { Name = user.FirstName, ConfirmUrl = confirmUrl });
        await SendAsync(user.Email!, user.FirstName, "Confirm your FitCore email", body, ct);
    }

    public async Task SendPasswordResetAsync(
        string email, string name, string token,
        CancellationToken ct = default)
    {
        var resetUrl = BuildEmalAndTokenUrl("/reset-password", token, email);
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
        string email, string gymName, string invitedByName, string token,bool isAlreadyRegistered,
        CancellationToken ct = default)
    {
        var registerUrl = isAlreadyRegistered ? BuildEmailTokenUrl("/onboarding", token) : BuildEmalAndTokenUrl("/register", token, email);
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

    private string BuildEmalAndTokenUrl(string path, string token, string email) =>
        BuildEmailTokenUrl(path, token) + 
        $"&email={Uri.EscapeDataString(email)}";

    private string BuildEmailTokenUrl(string path, string token) =>
        $"{_appSettings.BaseUrl}{path}" +
        $"?token={Uri.EscapeDataString(token)}";

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