using FitCore.Api.Domain.Entites.BaseEntites;

namespace FitCore.Api.Domain.Entites
{
    public enum Role
    {
        Admin = 1,
        Member = 2,
        Trainer = 3
    }

    public class User : BaseEntityWithChangeTracking 
    {
        public required string Email { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public string? EmergencyContact { get; set; }
        public bool IsActive { get; set; }
    }
}
