using FitCore.Api.Domain.Entites;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FitCore.Api.Application.Features.Administrator
{
    public record CreateUserCommand(
        string FirstName, 
        string LastName, 
        string Email, 
        string Password,
        string? Address,
        string? EmergencyContact,
        string Phone
        ) : IRequest<Guid>;

    public class CreateUserHandler : IRequestHandler<CreateUserCommand, Guid>
    {
        private readonly UserManager<User> userManager;

        public CreateUserHandler(UserManager<User> userManager)
        {
            this.userManager = userManager;
        }

        public async Task<Guid> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            var isExistingEmail = await this.userManager.Users.AnyAsync(x => x.NormalizedEmail == request.Email.ToUpper());

            if (isExistingEmail)
                throw new Exception("User with same email exists");

            var user = new User()
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                UserName = request.Email,
                Address = request.Address,
                EmergencyContact = request.EmergencyContact,
                PhoneNumber = request.Phone
            };

            user.PasswordHash = this.userManager.PasswordHasher.HashPassword(user, request.Password);

            var result = await this.userManager.CreateAsync(user);

            if (!result.Succeeded)
                throw new Exception(string.Join(", ", result.Errors.Select(x => x.Description)));

            return user.Id;
        }
    }
}
