using FitCore.Api.Domain.Entites.BaseEntites;

namespace FitCore.Api.Domain.Entites
{
    [Dictionary("MembershipPlans")]
    public class MembershipPlan : BaseDictionary
    {
        public required string Name { get; set; }
        public int Price { get; set; }
        public int DurationInDays { get; set; }
        public bool IsActive { get; set; }
    }
}
