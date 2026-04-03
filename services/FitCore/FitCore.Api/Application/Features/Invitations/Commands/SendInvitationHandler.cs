using System;
using FitCore.Api.Application.Interfaces;
using FitCore.Api.Application.Interfaces.Repositories;
using FitCore.Api.Domain.Entites;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FitCore.Api.Application.Features.Invitations.Commands
{
    public record SendInvitationCommand(
    string Email,
    string FirstName,
    InvitationRole Role
    ) : IRequest<Guid>;

    public class SendInvitationHandler : IRequestHandler<SendInvitationCommand, Guid>
    {
        private readonly IEmailService _emailService;
        private readonly ICurrentUserService _currentUser;
        private readonly IBaseRepository<Tenant> tenantRepository;
        private readonly IBaseRepository<Invitation> invitationRepository;
        private readonly UserManager<User> userManager;

        public SendInvitationHandler(
            IEmailService emailService,
            ICurrentUserService currentUser,
            IBaseRepository<Tenant> tenantRepository,
            IBaseRepository<Invitation> invitationRepository,
            UserManager<User> userManager)
        {
            _emailService = emailService;
            _currentUser = currentUser;
            this.tenantRepository = tenantRepository;
            this.invitationRepository = invitationRepository;
            this.userManager = userManager;
        }

        public async Task<Guid> Handle(
            SendInvitationCommand request,
            CancellationToken ct)
        {
            // Only admins can send invitations
            if (_currentUser.Role != "Admin")
                throw new Exception("Only admins can send invitations");

            // Get tenant details for email
            var tenant = await this.tenantRepository
                .Query()
                .FirstOrDefaultAsync(t => t.Id == _currentUser.TenantId, ct)
                ?? throw new Exception("Tenant not found");

            var invitedBy = await userManager.FindByIdAsync(_currentUser.UserId.ToString())
                ?? throw new Exception("User not found");

            // Check no active invitation already exists for this email
            var existingInvitation = await this.invitationRepository
                .Query()
                .AnyAsync(i =>
                    i.Email == request.Email &&
                    i.TenantId == _currentUser.TenantId &&
                    i.Status == InvitationStatus.Pending &&
                    i.ExpiresAt > DateTime.UtcNow, ct);

            if (existingInvitation)
                throw new Exception(
                    "An active invitation already exists for this email");

            var user = await this.userManager.Users
                    .Where(u => u.Email == request.Email)
                    .Select(u => new { u.Id, u.FirstName, u.Members, u.Trainers })
                    .FirstOrDefaultAsync();

            // Generate secure invitation token
            var token = Convert.ToBase64String(Guid.NewGuid().ToByteArray())
                .Replace("/", "_")
                .Replace("+", "-")
                .Replace("=", "");

            var invitation = new Invitation
            {
                Id = Guid.NewGuid(),
                TenantId = _currentUser.TenantId,
                InvitedByUserId = _currentUser.UserId,
                Email = request.Email,
                Token = token,
                Role = request.Role,
                Status = InvitationStatus.Pending,
                ExpiresAt = DateTime.UtcNow.AddDays(7)
            };

            await _emailService.SendInvitationAsync(
                        request.Email,
                        tenant.Name,
                        $"{invitedBy.FirstName} {invitedBy.LastName}",
                        token,
                        isAlreadyRegistered: user != null,
                        ct);

            await this.invitationRepository.AddAsync(invitation);
            await this.invitationRepository.CommitAsync();

            return invitation.Id;
        }
    }
}
