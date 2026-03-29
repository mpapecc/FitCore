using FitCore.Api.Application.Interfaces;
using FitCore.Api.Domain.Entites;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FitCore.Api.Application.Features.Administrator
{
    public record CreateTenantCommand(string Name, string ?Slug): IRequest<Unit>;
    public class CreateTenantHandler : IRequestHandler<CreateTenantCommand, Unit>
    {
        private readonly IBaseRepository<Tenant> tenantRepository;
        private readonly UserManager<User> userManager;

        public CreateTenantHandler(
           IBaseRepository<Tenant> tenantRepository,
           UserManager<User> userManager)
        {
            this.tenantRepository = tenantRepository;
            this.userManager = userManager;
        }

        public async Task<Unit> Handle(CreateTenantCommand request, CancellationToken cancellationToken)
        {
            var tenantExists = await this.tenantRepository.Query().AnyAsync(x => x.Name == request.Name || x.Slug == request.Slug);
            
            if (tenantExists)
                throw new Exception("Tenant with same name or slug exists");

            var tenant = new Tenant() { Name = request.Name, Slug = request.Name.ToLower().Replace(" ", "-") };
            await this.tenantRepository.AddAsync(tenant);
            await this.tenantRepository.CommitAsync();

            return Unit.Value;
        }
    }
}
