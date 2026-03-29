using Microsoft.AspNetCore.Mvc.RazorPages;

namespace FitCore.Api.Infrastructure.Services.Email.Templates.EmailConfirmation
{
    public class EmailConfirmationModel: PageModel
    {
        public string Name { get; set; } = string.Empty;
        public string ConfirmUrl { get; set; } = string.Empty;
    }
}
