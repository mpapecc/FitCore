using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using FitCore.Api.Application.Interfaces;
using FitCore.Api.Domain.Entites;
using FitCore.Api.Infrastructure.Identity;
using FitCore.Api.Infrastructure.Persistance;
using FitCore.Api.Infrastructure.Services;
using FitCore.Api.Infrastructure.Services.Email;
using FitCore.Api.Infrastructure.Settings;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace FitCore.Api.Infrastructure
{
    public static class InfrastructureIoc
    {
        public static void AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddIdentity<User, IdentityRole<Guid>>(options =>
            {
                // Password rules
                options.Password.RequiredLength = 8;
                options.Password.RequireDigit = true;
                options.Password.RequireUppercase = true;
                options.Password.RequireNonAlphanumeric = false;

                // Lockout
                options.Lockout.MaxFailedAccessAttempts = 5;
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(15);

                // Email confirmation required
                options.SignIn.RequireConfirmedEmail = true;

                // User settings
                options.User.RequireUniqueEmail = true;
            })
            .AddEntityFrameworkStores<FitCoreContext>()
            .AddDefaultTokenProviders();

            services.AddDbContext<FitCoreContext>(options => 
            options.UseNpgsql(configuration.GetConnectionString("DefaultConnection"))
            .UseSeeding((context, _) =>
            {
                if (context.Set<User>().Any())
                    return;

                var soloTrainerUserId = Guid.CreateVersion7();
                var gymOwnerTrainerUserId = Guid.CreateVersion7();
                var multiTrainerUserId = Guid.CreateVersion7();
                var memberOneUserId = Guid.CreateVersion7();
                var user = new User
                {
                    Id = soloTrainerUserId,
                    FirstName = "Solo",
                    LastName = "Trainer",
                    Email = "solo@trainer.com"
                };
                user.PasswordHash = new PasswordHasher<User>().HashPassword(user, "Password123!");
                user.NormalizedEmail = user.Email.ToUpper();

                var user1 = new User
                {
                    Id = gymOwnerTrainerUserId,
                    FirstName = "Gym",
                    LastName = "Owner",
                    Email = "gym@owner-trainer.com"
                };
                user1.PasswordHash = new PasswordHasher<User>().HashPassword(user1, "Password123!");
                user1.NormalizedEmail = user1.Email.ToUpper();

                var user2 = new User
                {
                    Id = multiTrainerUserId,
                    FirstName = "Multi",
                    LastName = "Trainer",
                    Email = "multi@trainer.com"
                };
                user2.PasswordHash = new PasswordHasher<User>().HashPassword(user2, "Password123!");
                user2.NormalizedEmail = user2.Email.ToUpper();

                var user3 = new User
                {
                    Id = memberOneUserId,
                    FirstName = "Member",
                    LastName = "1",
                    Email = "member@one.com",
                    PasswordHash = new PasswordHasher<User>().HashPassword(null!, "Password123!")
                };
                user3.PasswordHash = new PasswordHasher<User>().HashPassword(user3, "Password123!");
                user3.NormalizedEmail = user3.Email.ToUpper();

                context.Set<User>().AddRange(new List<User>()
                {
                    user,
                    user1,
                    user2,
                    user3
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
                        UpdatedOn = DateTime.UtcNow,
                        IsAdmin = true
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

            services.Configure<JwtSettings>(configuration.GetSection("JwtSettings"));
            services.Configure<EmailSettings>(configuration.GetSection("EmailSettings"));
            services.Configure<AppSettings>(configuration.GetSection("AppSettings"));

            var jwtSettings = configuration.GetSection("JwtSettings").Get<JwtSettings>()!;
            var key = Encoding.UTF8.GetBytes(jwtSettings.SecretKey);

            //JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidIssuer = jwtSettings.Issuer,
                    ValidateAudience = true,
                    ValidAudience = jwtSettings.Audience,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero,
                };
            });

            services.AddAuthorization();

            // --- FluentValidation ---
            services.AddValidatorsFromAssembly(typeof(Program).Assembly);

            // --- RazorLight ---
            services.AddSingleton<RazorEngineService>();

            services.AddHttpContextAccessor();
            services.AddScoped<ICurrentUserService, CurrentUserService>();
            services.AddScoped<IJwtService, JwtService>();
            services.AddScoped<IEmailService, EmailService>();
        }
    }
}