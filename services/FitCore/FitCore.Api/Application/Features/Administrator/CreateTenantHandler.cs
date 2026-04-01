using FitCore.Api.Application.Features.Trainers.Commnad;
using FitCore.Api.Application.Interfaces;
using FitCore.Api.Domain.Entites;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FitCore.Api.Application.Features.Administrator
{
    public record CreateTenantCommand(
        string Name, 
        string ?Slug,
        CreateUserCommand AdminUser
        ) : IRequest<CreateTenantResponse>;

    public record CreateTenantResponse(
        Guid TenantId,
        Guid AdmiUsernId,
        string AdminEmail
        );

    public class CreateTenantHandler : IRequestHandler<CreateTenantCommand, CreateTenantResponse>
    {
        private readonly IMediator mediator;
        private readonly IBaseRepository<Tenant> tenantRepository;

        public CreateTenantHandler(
            IMediator mediator,
            IBaseRepository<Tenant> tenantRepository
            )
        {
            this.mediator = mediator;
            this.tenantRepository = tenantRepository;
        }

        public async Task<CreateTenantResponse> Handle(CreateTenantCommand request, CancellationToken cancellationToken)
        {
            var tenantExists = await this.tenantRepository.Query().AnyAsync(x => x.Name == request.Name || x.Slug == request.Slug);
            
            if (tenantExists)
                throw new Exception("Tenant with same name or slug exists");

            var tenant = new Tenant() { Name = request.Name, Slug = request.Name.ToLower().Replace(" ", "-") };
            await this.tenantRepository.AddAsync(tenant);
            await this.tenantRepository.CommitAsync();

            var adminUserId = await this.mediator.Send(request.AdminUser, cancellationToken);

            var createTrainerCommnad = new CreateTrainerCommand(
                tenant.Id,
                request.AdminUser.Email,
                true,
                "Admin user",
                "Admin"
            );

            await this.mediator.Send(createTrainerCommnad, cancellationToken);

            return new CreateTenantResponse(tenant.Id, adminUserId, request.AdminUser.Email);
        }
    }
}
