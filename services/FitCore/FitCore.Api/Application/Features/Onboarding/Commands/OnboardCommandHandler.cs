using FitCore.Api.Application.Interfaces;
using FitCore.Api.Application.Interfaces.Repositories;
using FitCore.Api.Domain.Entites;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FitCore.Api.Application.Features.Onboarding.Commands
{
    public record OnboardCommand(
        List<Guid> FitnessGoals,
        Guid ActivityLevel,
        int CurrentWeightKg,
        int HeightCm,
        string Token) : IRequest<Unit>;

    public class OnboardCommandHandler : IRequestHandler<OnboardCommand, Unit>
    {
        private readonly UserManager<User> userManager;
        private readonly IBaseRepository<Invitation> invitationRepository;
        private readonly IBaseRepository<Member> memberRepository;
        private readonly IBaseRepository<Trainer> trainerRepository;
        private readonly ICurrentUserService currentUserService;
        private readonly IEmailService emailService;

        public OnboardCommandHandler(
            UserManager<User> userManager,
            IBaseRepository<Invitation> invitationRepository,
            IBaseRepository<Member> memberRepository,
            IBaseRepository<Trainer> trainerRepository,
            ICurrentUserService currentUserService,
            IEmailService emailService)
        {
            this.userManager = userManager;
            this.invitationRepository = invitationRepository;
            this.memberRepository = memberRepository;
            this.trainerRepository = trainerRepository;
            this.currentUserService = currentUserService;
            this.emailService = emailService;
        }

        public async Task<Unit> Handle(OnboardCommand request, CancellationToken cancellationToken)
        {

            var user = await userManager.FindByIdAsync(currentUserService.UserId.ToString());

            if(user == null)
                throw new Exception("User not found.");

            if (currentUserService.Role == InvitationRole.Member.ToString())
            {
                var member = await this.memberRepository.Query().Where(x => x.UserId == user.Id).FirstOrDefaultAsync();

                if(member == null)
                {
                    // Create MemberProfile for this tenant
                    member = new Member
                    {
                        Id = Guid.NewGuid(),
                        UserId = user.Id,
                        TenantId = currentUserService.TenantId
                    };
                    await this.memberRepository.AddAsync(member);
                }
                member.CurrentWeight = request.CurrentWeightKg;
                member.CurrentHeight = request.HeightCm;
                member.ActivityLevelId = request.ActivityLevel;
            }
            else if (currentUserService.Role == InvitationRole.Trainer.ToString())
            {
                var trainer = await this.trainerRepository.Query().Where(x => x.UserId == user.Id).FirstOrDefaultAsync();
                
                if(trainer == null)
                {
                    // Create MemberProfile for this tenant
                    trainer = new Trainer
                    {
                        Id = Guid.NewGuid(),
                        UserId = user.Id,
                        Bio = string.Empty,
                        Sepcialization = string.Empty,
                        TenantId = currentUserService.TenantId
                    };
                }

                await this.trainerRepository.AddAsync(trainer);
            }

            await this.memberRepository.CommitAsync();

            await this.emailService.SendWelcomeEmailAsync(
                user.Email,
                user.FirstName);
            return Unit.Value;
        }
    }
}
