using FitCore.Api.Domain.Entites.BaseEntites;

namespace FitCore.Api.Domain.Entites
{
    public class RefreshToken : BaseEntityWithChangeTracking
    {
        public Guid UserId { get; set; }
        public Guid TenantId { get; set; }
        public string Token { get; set; } = string.Empty;
        public DateTime ExpiresAt { get; set; }
        public DateTime? RevokedOn { get; set; }
        public string? ReplacedByToken { get; set; }

        // Computed — not stored in DB
        public bool IsExpired => DateTime.UtcNow >= ExpiresAt;
        public bool IsRevoked => RevokedOn != null;
        public bool IsActive => !IsRevoked && !IsExpired;

        // Navigation
        public User User { get; set; } = null!;
    }
}
