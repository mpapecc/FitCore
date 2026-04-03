
using FitCore.Api.Application.Interfaces;
using FitCore.Api.Application.Interfaces.Repositories;
using FitCore.Api.Domain.Entites;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FitCore.Api.Application.Features.Auth.Commands
{
    public record LoginCommand(string Email, string Password) : IRequest<LoginResponse>;
    public record TenantInfo(Guid Id, string Name);
    public record LoginResponse(string SelectorToken, List<TenantInfo> Tenants);

    public class LoginHandler : IRequestHandler<LoginCommand, LoginResponse>
    {
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly IJwtService jwtService;
        private readonly IBaseRepository<Member> memberRepository;
        private readonly IBaseRepository<Trainer> trainerRepository;
        private readonly IBaseRepository<Tenant> tenantRepository;

        public LoginHandler(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IJwtService jwtService,
            IBaseRepository<Member> memberRepository,
            IBaseRepository<Trainer> trainerRepository,
            IBaseRepository<Tenant> tenantRepository)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.jwtService = jwtService;
            this.memberRepository = memberRepository;
            this.trainerRepository = trainerRepository;
            this.tenantRepository = tenantRepository;
        }

        public async Task<LoginResponse> Handle(
            LoginCommand request,
            CancellationToken ct)
        {
            // Find user
            var user = await userManager.FindByEmailAsync(request.Email)
                ?? throw new Exception("Invalid email or password");

            // Check email confirmed
            if (!user.EmailConfirmed)
                throw new Exception("Please confirm your email before logging in");

            // Check password
            var result = await signInManager.CheckPasswordSignInAsync(
                user, request.Password, lockoutOnFailure: true);

            if (result.IsLockedOut)
                throw new Exception("Account locked. Try again in 15 minutes");

            if (!result.Succeeded)
                throw new Exception("Invalid email or password");

            // Update last login
            user.LastLoginOn = DateTime.UtcNow;
            await userManager.UpdateAsync(user);

            // Get all tenants this user belongs to
            // Check MemberProfiles + TrainerProfiles + owned tenants
            var memberTenantIds = await this.memberRepository
                .Query()
                .Where(m => m.UserId == user.Id)
                .Select(m => m.TenantId)
                .ToListAsync(ct);

            var trainerTenantIds = await this.trainerRepository
                .Query()
                .Where(t => t.UserId == user.Id)
                .Select(t => t.TenantId)
                .ToListAsync(ct);

            // Combine and deduplicate all tenant IDs
            var allTenantIds = memberTenantIds
                .Union(trainerTenantIds)
                .Distinct()
                .ToList();

            if (!allTenantIds.Any())
                throw new Exception("No gym memberships found for this account");

            // Fetch tenant details
            var tenants = await this.tenantRepository
                .Query()
                .Where(t => allTenantIds.Contains(t.Id))
                .Select(t => new TenantInfo(t.Id, t.Name))
                .ToListAsync(ct);

            // Generate short-lived selector token
            var selectorToken = jwtService.GenerateSelectorToken(user.Id);

            return new LoginResponse(selectorToken, tenants);
        }
    }
}
