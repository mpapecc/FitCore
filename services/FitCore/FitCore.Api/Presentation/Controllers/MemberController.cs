using FitCore.Api.Application.Features.Members.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace FitCore.Api.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberController : ControllerBase
    {
        private readonly IMediator _mediator;
        public MemberController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllMembers()
        {
            var result = await _mediator.Send(new GetMembersQuery(Guid.NewGuid()));
            return Ok(result);
        }
    }
}
