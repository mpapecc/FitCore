using FitCore.Api.Application.Interfaces;
using FitCore.Api.Domain.Entites;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace FitCore.Api.Application.Features.Members.Commands
{
    public record CreateMemberCommand(Guid TenantId, string Email) : IRequest<Guid>;
    public class CreateMemberHandler : IRequestHandler<CreateMemberCommand, Guid>
    {
        private readonly UserManager<User> userManager;
        private readonly IBaseRepository<Member> memberRepository;

        public CreateMemberHandler(
            UserManager<User> userManager,
            IBaseRepository<Member> memberRepository)
        {
            this.userManager = userManager;
            this.memberRepository = memberRepository;
        }

        public async Task<Guid> Handle(CreateMemberCommand request, CancellationToken cancellationToken)
        {
            var user = await userManager.FindByEmailAsync(request.Email);
            
            if(user == null)
                throw new Exception("User not suplied email not found");

            var member = new Member() { TenantId = request.TenantId, UserId = user.Id };

            // maybe we can add record to userrole table
            await memberRepository.AddAsync(member);
            await memberRepository.CommitAsync();
            return user.Id;
        }
    }
}
