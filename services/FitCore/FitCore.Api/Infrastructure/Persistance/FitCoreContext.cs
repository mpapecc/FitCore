using FitCore.Api.Domain.Entites;
using FitCore.Api.Domain.Entites.BaseEntites;
using FitCore.Api.Domain.Entites.Dictionaries;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FitCore.Api.Infrastructure.Persistance
{
    public class FitCoreContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
    {

        public FitCoreContext(DbContextOptions options) : base(options)
        {
        }

        DbSet<Tenant> Tenants { get; set; }
        DbSet<Member> Members { get; set; }
        DbSet<Trainer> Trainers { get; set; }
        DbSet<RefreshToken> RefreshTokens { get; set; }
        DbSet<Invitation> Invitations { get; set; }
        DbSet<FitnessGoal> FitnessGoals { get; set; }
        DbSet<MemberFitnessGoal> MemberFitnessGoals { get; set; }
        DbSet<MembershipPlan> MembershipPlans { get; set; }
        DbSet<ActivityLevel> ActivityLevels { get; set; }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var entites = this.ChangeTracker.Entries<IChangeTrackingEntity>();

            foreach (var entity in entites)
            {
                switch (entity.State)
                {
                    case EntityState.Added:
                        entity.Entity.CreatedOn = DateTime.UtcNow;
                        entity.Entity.UpdatedOn = DateTime.UtcNow;
                        break;
                    case EntityState.Modified:
                        entity.Entity.UpdatedOn = DateTime.UtcNow;
                        break;
                }
            }

            return base.SaveChangesAsync(cancellationToken);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<RefreshToken>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Token).IsRequired().HasMaxLength(500);
                entity.HasIndex(e => e.Token).IsUnique();
                entity.HasOne(e => e.User)
                      .WithMany(u => u.RefreshTokens)
                      .HasForeignKey(e => e.UserId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            builder.Entity<Invitation>(entity =>
            {
                entity.HasOne(e => e.InvitedBy)
                      .WithMany()
                      .HasForeignKey(e => e.InvitedByUserId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            builder.Entity<FitnessGoal>(entity =>
            {
                entity.HasIndex(e => new { e.Label, e.TenantId }).IsUnique();
            });
        }
    }
}
