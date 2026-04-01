using FitCore.Api.Application.Features.Administrator;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FitCore.Api.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdministratorController : ControllerBase
    {
        private readonly IMediator mediator;

        public AdministratorController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpPost(nameof(CreateTenant))]
        public async Task<IActionResult> CreateTenant([FromBody] CreateTenantCommand createTenant, CancellationToken ct)
        {
            var result = await this.mediator.Send(createTenant, ct);
            return Ok(result);
        }

        [HttpPost(nameof(CreateUser))]
        public async Task CreateUser([FromBody] CreateUserCommand createUser, CancellationToken ct)
        {
            var userId = await this.mediator.Send(createUser, ct);
        }
    }
}
