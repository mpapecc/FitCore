using FitCore.Api.Application.Features.Administrator;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace FitCore.Api.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdministratorController : ControllerBase
    {
        private readonly IMediator mediator;

        public AdministratorController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpPost(nameof(CreateTenant))]
        public async Task CreateTenant([FromBody] CreateTenantCommand createTenant, CancellationToken ct)
        {
            var result = await this.mediator.Send(createTenant, ct);
        }

        [HttpPost(nameof(CreateUser))]
        public async Task CreateUser([FromBody] CreateUserCommand createUser, CancellationToken ct)
        {
            var userId = await this.mediator.Send(createUser, ct);
        }
    }
}
