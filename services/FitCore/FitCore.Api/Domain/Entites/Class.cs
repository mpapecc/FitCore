using FitCore.Api.Domain.Entites.BaseEntites;

namespace FitCore.Api.Domain.Entites
{
    public enum ClassType
    {
        Yoga = 1,
        Pilates = 2,
        HIIT = 3,
        Cycling = 4,
        Strength = 5
    }

    public class Class : TenantEntityWithChangeTracking
    {
        public string Name { get; set; }
        public Guid TrainerId { get; set; }
        public required Trainer Trainer { get; set; }
        public ClassType Type { get; set; }
        public int DurationInMinutes { get; set; }
        public int Capacity { get; set; }
        public DateTime StartDate { get; set; }
        public bool IsRecurring { get; set; }
    }
}
