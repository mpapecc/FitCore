using FitCore.Api.Domain.Entites.BaseEntites;

namespace FitCore.Api.Domain.Entites
{
    public enum ClassBookingStatus
    {
        Confirmed = 1,
        Cancelled = 2,
        Attended = 3
    }

    public class ClassBooking : TenantEntityWithChangeTracking
    {
        public required Guid ClassId { get; set; }
        public Class Class { get; set; }
        public required Guid MemberId { get; set; }
        public Member Member { get; set; }
        public ClassBookingStatus Status { get; set; }
    }
}
