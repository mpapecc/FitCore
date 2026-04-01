using FitCore.Api.Application.Features.Members.Commands;
using FitCore.Api.Application.Features.Members.Queries;
using FitCore.Api.Application.Features.Onboarding.Commands;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FitCore.Api.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class MemberController : ControllerBase
    {
        private readonly IMediator mediator;
        public MemberController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllMembers()
        {
            var result = await this.mediator.Send(new GetMembersQuery(Guid.NewGuid()));
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateMember(CreateMemberCommand createMember, CancellationToken ct)
        {
            var memberId = await this.mediator.Send(createMember,ct);
            return Ok(memberId);
        }
        
        [HttpPost(nameof(Onboard))]
        [Authorize]
        public async Task<IActionResult> Onboard(OnboardCommand createMember, CancellationToken ct)
        {
            var memberId = await this.mediator.Send(createMember, ct);
            return Ok(memberId);
        }
    }
}
