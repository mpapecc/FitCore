using FitCore.Api.Application.Interfaces;
using FitCore.Api.Domain.Entites;
using MediatR;
using Microsoft.EntityFrameworkCore;


namespace FitCore.Api.Application.Features.Members.Queries
{
    public record GetMembersQuery(Guid TenantId) : IRequest<List<MemberResponse>>;

    public record MemberResponse(
    Guid Id,
    Guid UserId,
    Guid TenantId,
    string FirstName,
    string LastName,
    string Email,
    string AvatarInitials,
    string? Phone,
    string JoinDate,
    DateTime CreatedOn,
    DateTime UpdatedOn
    );

    public class GetMembersHandler : IRequestHandler<GetMembersQuery, List<MemberResponse>>
    {
        private readonly IBaseRepository<Member> memberRepository;

        public GetMembersHandler(IBaseRepository<Member> memberRepository)
        {
            this.memberRepository = memberRepository;
        }

        public async Task<List<MemberResponse>> Handle(
            GetMembersQuery request,
            CancellationToken ct)
        {
            var members = memberRepository.Query().Select(x => new MemberResponse
            (
                x.Id,
                x.UserId,
                x.TenantId,
                x.User.FirstName,
                x.User.LastName,
                x.User.Email,
                $"{x.User.FirstName[0]}{x.User.LastName[0]}",
                x.User.PhoneNumber,
                x.CreatedOn.ToString("MMMM dd, yyyy"),
                x.CreatedOn,
                x.UpdatedOn

            )).ToListAsync(ct);
            return await members;
        }
    }
}
