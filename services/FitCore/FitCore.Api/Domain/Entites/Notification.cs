using FitCore.Api.Domain.Entites.BaseEntites;

namespace FitCore.Api.Domain.Entites
{
    public enum NotificationType
    {
        ClassReminder = 1,
        MembershipExpiry = 2,
        InvoiceDue = 3,
        General = 4
    }

    public class Notification : TenantEntityWithChangeTracking
    {
        public Guid SenderId { get; set; }
        public Guid RecipientId { get; set; }
        public string Message { get; set; }
        public string Title { get; set; }
        public NotificationType Type { get; set; }
        public bool IsRead { get; set; }
        public DateTime SentOn { get; set; }
    }
}
