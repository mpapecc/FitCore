namespace FitCore.Api.Infrastructure.Services.Email.Templates.PasswordReset
{
    public class PasswordResetModel
    {
        public string Name { get; set; } = string.Empty;
        public string ResetUrl { get; set; } = string.Empty;
    }
}
