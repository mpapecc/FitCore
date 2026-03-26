using FitCore.Api.Application.Interfaces;
using FitCore.Api.Domain.Entites;
using FitCore.Api.Infrastructure.Persistance;
using Microsoft.EntityFrameworkCore;

namespace FitCore.Api.Infrastructure
{
    public static class InfrastructureIoc
    {
        public static void AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<FitCoreContext>(options => 
            options.UseNpgsql(configuration.GetConnectionString("DefaultConnection"))
            .UseSeeding((context, _) =>
            {
                var soloTrainerUserId = Guid.CreateVersion7();
                var gymOwnerTrainerUserId = Guid.CreateVersion7();
                var multiTrainerUserId = Guid.CreateVersion7();
                var memberOneUserId = Guid.CreateVersion7();

                context.Set<User>().AddRange(new List<User>()
                {
                    new User
                    {
                        Id = soloTrainerUserId,
                        FirstName = "Solo",
                        LastName = "Trainer",
                        Email = "solo@trainer.com"
                    },
                    new User
                    {
                        Id = gymOwnerTrainerUserId,
                        FirstName = "Gym",
                        LastName = "Owner",
                        Email = "gym@owner-trainer.com"
                    },
                    new User
                    {
                        Id = multiTrainerUserId,
                        FirstName = "Multi",
                        LastName = "Trainer",
                        Email = "multi@trainer.com"
                    },
                    new User
                    {
                        Id = memberOneUserId,
                        FirstName = "Member",
                        LastName = "1",
                        Email = "member@one.com"
                    }
                });

                var multiTrainerGymTenantId = Guid.CreateVersion7();
                var soloTrainerGymTenantId = Guid.CreateVersion7();

                context.Set<Tenant>().AddRange(new List<Tenant>()
                {
                    new Tenant
                    {
                        Id = multiTrainerGymTenantId,
                        Name = "Multi trainer gym",
                        Slug = "multi-trainer-gym",
                        CreatedOn = DateTime.UtcNow,
                        UpdatedOn = DateTime.UtcNow
                    },
                    new Tenant
                    {
                        Id = soloTrainerGymTenantId,
                        Name = "Solo trainer gym",
                        Slug = "solo-trainer-gym",
                        CreatedOn = DateTime.UtcNow,
                        UpdatedOn = DateTime.UtcNow
                    }
                });

                var memberOneSoloTrainerMemeberId = Guid.CreateVersion7();
                var memberOneMultiTrainerMemeberId = Guid.CreateVersion7();

                context.Set<Member>().AddRange(new List<Member>()
                {
                    new Member
                    {
                        Id = memberOneSoloTrainerMemeberId,
                        UserId = memberOneUserId,
                        TenantId = soloTrainerGymTenantId,
                        CreatedOn = DateTime.UtcNow,
                        UpdatedOn = DateTime.UtcNow
                    },
                    new Member
                    {
                        Id = memberOneMultiTrainerMemeberId,
                        UserId = memberOneUserId,
                        TenantId = multiTrainerGymTenantId,
                        CreatedOn = DateTime.UtcNow,
                        UpdatedOn = DateTime.UtcNow
                    }
                });

                var soloTrainerId = Guid.CreateVersion7();
                var gymOwnerTrainerId = Guid.CreateVersion7();
                var multiTrainerId = Guid.CreateVersion7();

                context.Set<Trainer>().AddRange(new List<Trainer>()
                {
                    new Trainer
                    {
                        Id = soloTrainerId,
                        UserId = soloTrainerUserId,
                        TenantId = soloTrainerGymTenantId,
                        Bio = "Solo trainer guy",
                        Sepcialization = "Individuia",
                        CreatedOn = DateTime.UtcNow,
                        UpdatedOn = DateTime.UtcNow,
                        IsAdmin = true
                    },
                    new Trainer
                    {
                        Id = gymOwnerTrainerId,
                        UserId = multiTrainerUserId,
                        TenantId = multiTrainerGymTenantId,
                        Bio = "Gym Owner Dude",
                        Sepcialization = "Boss",
                        CreatedOn = DateTime.UtcNow,
                        UpdatedOn = DateTime.UtcNow
                    },
                    new Trainer
                    {
                        Id = multiTrainerId,
                        UserId = multiTrainerUserId,
                        TenantId = multiTrainerGymTenantId,
                        Bio = "One of trainers",
                        Sepcialization = "Traiing",
                        CreatedOn = DateTime.UtcNow,
                        UpdatedOn = DateTime.UtcNow
                    }
                });
                context.SaveChanges();
            }));
            services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
        }
    }
}