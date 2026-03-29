using FitCore.Api.Application.Interfaces;
using FitCore.Api.Domain.Entites;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FitCore.Api.Application.Features.Trainers.Commnad
{
    public record CreateTrainerCommand(Guid TenantId, string Email, bool IsAdmin, string Bio, string Specialization) : IRequest<Guid>;
    public class CreateTrainerHandler : IRequestHandler<CreateTrainerCommand, Guid>
    {
        private readonly IBaseRepository<Trainer> trainerRepository;
        private readonly UserManager<User> userManager;

        public CreateTrainerHandler(
            IBaseRepository<Trainer> trainerRepository,
            UserManager<User> userManager)
        {
            this.trainerRepository = trainerRepository;
            this.userManager = userManager;
        }
        public async Task<Guid> Handle(CreateTrainerCommand request, CancellationToken cancellationToken)
        {
            var user = await this.userManager.FindByEmailAsync(request.Email);

            if (user == null) 
                throw new Exception("User not found");

            var isTrainerInTenant = await this.trainerRepository
                .Query()
                .AnyAsync(x => x.UserId == user.Id && x.TenantId == request.TenantId);

            if (isTrainerInTenant)
                throw new Exception("Trainer already exists in tenant");

            var trainer = new Trainer
            {
                Id = Guid.NewGuid(),
                UserId = user.Id,
                TenantId = request.TenantId,
                IsAdmin = request.IsAdmin,
                Bio = request.Bio,
                Sepcialization = request.Specialization
            };

            await this.trainerRepository.AddAsync(trainer);
            await this.trainerRepository.CommitAsync();

            return trainer.Id;
        }
    }
}
