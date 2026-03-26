using FitCore.Api.Domain.Entites.BaseEntites;

namespace FitCore.Api.Domain.Entites
{
    public enum InvoiceStatus
    {
        Paid = 1,
        Pending = 2,
        Overdue = 3
    }

    public class Invoice : TenantEntityWithChangeTracking
    {
        public required Guid MemberId { get; set; }
        public Member Member { get; set; }
        public Guid MembershipPlanId { get; set; }
        public MembershipPlan MembershipPlan { get; set; }
        public string InvoiceNumber { get; set; }
        public decimal Amount { get; set; }
        public DateTime IssueDate { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime? PaidOn { get; set; }
        public InvoiceStatus Status { get; set; }
    }
}
