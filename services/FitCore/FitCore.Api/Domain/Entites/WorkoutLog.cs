using FitCore.Api.Domain.Entites.BaseEntites;

namespace FitCore.Api.Domain.Entites
{
    public enum WorkoutLogType
    {
        Strength = 1,
        Cardio = 2,
        Flexibility = 3,
        HIIT = 4
    }

    public class WorkoutLog : TenantEntityWithChangeTracking
    {
        public Guid TrainerId { get; set; }
        public required Trainer Trainer { get; set; }
        public Guid MemberId { get; set; }
        public required Member Member { get; set; }
        //we could save exercise details as JSON so that we spare a join and have snapshot of the workout at the time of logging??
        public int DurationInMinutes { get; set; }
        public int CaloriesBurnt { get; set; }
        public string TrainerNotes { get; set; }
    }
}
