using System;
using FitCore.Api.Application.Interfaces;
using FitCore.Api.Domain.Entites;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FitCore.Api.Application.Features.Invitations.Queries
{
    public record GetInvitationsQuery(
    InvitationStatus? Status = null
) : IRequest<List<InvitationResponse>>;

    public record InvitationResponse(
    Guid Id,
    string Email,
    InvitationRole Role,
    InvitationStatus Status,
    DateTime ExpiresAt,
    DateTime CreatedOn,
    string InvitedByName
);

    public class GetInvitationsHandler
    : IRequestHandler<GetInvitationsQuery, List<InvitationResponse>>
    {
        private readonly ICurrentUserService _currentUser;
        private readonly IBaseRepository<Invitation> invitationRepository;

        public GetInvitationsHandler(
            ICurrentUserService currentUser,
            IBaseRepository<Invitation> invitationRepository)
        {
            _currentUser = currentUser;
            this.invitationRepository = invitationRepository;
        }

        public async Task<List<InvitationResponse>> Handle(
            GetInvitationsQuery request,
            CancellationToken ct)
        {
            if (_currentUser.Role != "Admin")
                throw new Exception("Only admins can view invitations");

            var query = this.invitationRepository
                .Query()
                .Include(i => i.InvitedBy)
                .AsQueryable();

            if (request.Status.HasValue)
                query = query.Where(i => i.Status == request.Status.Value);

            return await query
                .OrderByDescending(i => i.CreatedOn)
                .Select(i => new InvitationResponse(
                    i.Id,
                    i.Email,
                    i.Role,
                    i.Status,
                    i.ExpiresAt,
                    i.CreatedOn,
                    $"{i.InvitedBy.FirstName} {i.InvitedBy.LastName}"
                ))
                .ToListAsync(ct);
        }
    }
}
