using FitCore.Api.Domain.Entites.BaseEntites;
using Microsoft.AspNetCore.Identity;

namespace FitCore.Api.Domain.Entites
{
    public enum Role
    {
        Admin = 1,
        Member = 2,
        Trainer = 3
    }

    public class User : IdentityUser<Guid> , IBaseEntity<Guid>, IChangeTrackingEntity
    {
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public string? Address { get; set; }
        public string? EmergencyContact { get; set; }
        public bool IsActive { get; set; }
        public DateTime? LastLoginOn { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }

        // Navigation
        public ICollection<Member> Members { get; set; }
        public ICollection<Trainer> Trainers { get; set; }
        public ICollection<RefreshToken> RefreshTokens { get; set; }
    }
}
