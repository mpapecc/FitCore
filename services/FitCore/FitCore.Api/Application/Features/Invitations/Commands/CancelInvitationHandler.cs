using System;
using FitCore.Api.Application.Interfaces;
using FitCore.Api.Domain.Entites;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FitCore.Api.Application.Features.Invitations.Commands
{
    public record CancelInvitationCommand(Guid InvitationId) : IRequest<Unit>;

    public class CancelInvitationHandler : IRequestHandler<CancelInvitationCommand, Unit>
    {
        private readonly ICurrentUserService _currentUser;
        private readonly IBaseRepository<Invitation> invitationRepository;

        public CancelInvitationHandler(
            ICurrentUserService currentUser,
            IBaseRepository<Invitation> invitationRepository)
        {
            _currentUser = currentUser;
            this.invitationRepository = invitationRepository;
        }

        public async Task<Unit> Handle(
            CancelInvitationCommand request,
            CancellationToken ct)
        {
            if (_currentUser.Role != "Admin")
                throw new Exception("Only admins can cancel invitations");

            var invitation = await this.invitationRepository
                .Query()
                .FirstOrDefaultAsync(i =>
                    i.Id == request.InvitationId &&
                    i.TenantId == _currentUser.TenantId, ct)
                ?? throw new Exception("Invitation not found");

            if (invitation.Status != InvitationStatus.Pending)
                throw new Exception("Only pending invitations can be cancelled");

            invitation.Status = InvitationStatus.Cancelled;
            invitation.UpdatedOn = DateTime.UtcNow;

            await this.invitationRepository.CommitAsync();

            return Unit.Value;
        }
    }
}
