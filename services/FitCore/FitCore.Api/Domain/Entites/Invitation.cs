using FitCore.Api.Domain.Entites.BaseEntites;

namespace FitCore.Api.Domain.Entites
{
    public enum InvitationStatus
    {
        Pending,
        Accepted,
        Expired,
        Cancelled
    }

    public enum InvitationRole
    {
        Member,
        Trainer
    }

    public class Invitation : TenantEntityWithChangeTracking
    {
        public Guid InvitedByUserId { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Token { get; set; } = string.Empty;
        public InvitationRole Role { get; set; }
        public InvitationStatus Status { get; set; }
        public DateTime ExpiresAt { get; set; }
        public DateTime? AcceptedAt { get; set; }

        // Navigation
        public User InvitedBy { get; set; } = null!;
    }
}
