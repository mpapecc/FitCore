using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace FitCore.Api.Infrastructure.Services.Email.Templates.Invitation
{
    public class InvitationModel : PageModel
    {
        public string GymName { get; set; } = string.Empty;
        public string InvitedByName { get; set; } = string.Empty;
        public string RegisterUrl { get; set; } = string.Empty;
        public void OnGet()
        {
        }
    }
}
