using System;
using System.Text;
using FitCore.Api.Application.Interfaces;
using FitCore.Api.Domain.Entites;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;

namespace FitCore.Api.Application.Features.Auth.Commands
{
    public record RegisterCommand(string FirstName, string LastName, string Email, string Password, string InvitationToken) : IRequest<Unit>;
    public class RegisterHandler : IRequestHandler<RegisterCommand, Unit>
    {
        private readonly UserManager<User> _userManager;
        private readonly IEmailService _emailService;
        private readonly IBaseRepository<Invitation> invitationRepository;
        private readonly IBaseRepository<Member> memberRepository;
        private readonly IBaseRepository<Trainer> trainerRepository;

        public RegisterHandler(
            UserManager<User> userManager,
            IEmailService emailService,
            IBaseRepository<Invitation> invitationRepository,
            IBaseRepository<Member> memberRepository,
            IBaseRepository<Trainer> trainerRepository)
        {
            _userManager = userManager;
            _emailService = emailService;
            this.invitationRepository = invitationRepository;
            this.memberRepository = memberRepository;
            this.trainerRepository = trainerRepository;
        }

        public async Task<Unit> Handle(
            RegisterCommand request,
            CancellationToken ct)
        {
            // Check email not already registered
            var existingUser = await _userManager.FindByEmailAsync(request.Email);
            if (existingUser != null)
                throw new Exception("An account with this email already exists");

            // Create user
            var user = new User
            {
                Id = Guid.NewGuid(),
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                UserName = request.Email,
                IsActive = true
            };

            var result = await _userManager.CreateAsync(user, request.Password);
            if (!result.Succeeded)
            {
                var errors = string.Join(", ", result.Errors.Select(e => e.Description));
                throw new Exception(errors);
            }

            //Validate invitation token
           var invitation = await this.invitationRepository
               .Query()
               .Include(i => i.Tenant)
               .FirstOrDefaultAsync(i =>
                   i.Token == request.InvitationToken &&
                   i.Email == request.Email &&
                   i.Status == InvitationStatus.Pending &&
                   i.ExpiresAt > DateTime.UtcNow, ct)
               ?? throw new Exception("Invalid or expired invitation");

            if (invitation.Role == InvitationRole.Member)
            {
                // Create MemberProfile for this tenant
                var memberProfile = new Member
                {
                    UserId = user.Id,
                    TenantId = invitation.TenantId
                };

                await this.memberRepository.AddAsync(memberProfile);
            }
            else if (invitation.Role == InvitationRole.Trainer)
            {
                // Create MemberProfile for this tenant
                var trainerProfile = new Trainer
                {
                    UserId = user.Id,
                    Bio = string.Empty,
                    Sepcialization = string.Empty,
                    TenantId = invitation.TenantId
                };

                await this.trainerRepository.AddAsync(trainerProfile);
            }

            // Mark invitation as accepted
            invitation.Status = InvitationStatus.Accepted;
            invitation.AcceptedAt = DateTime.UtcNow;

            await this.memberRepository.CommitAsync();

            await _emailService.SendEmailConfirmationAsync(user, ct);

            return Unit.Value;
        }
    }
}
