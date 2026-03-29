using FitCore.Api.Application.Features.Invitations.Commands;
using FitCore.Api.Application.Features.Invitations.Queries;
using FitCore.Api.Domain.Entites;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FitCore.Api.Presentation.Controllers
{
    [ApiController]
    [Route("api/invitations")]
    public class InvitationsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public InvitationsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> SendInvitation(
            [FromBody] SendInvitationCommand command,
            CancellationToken ct)
        {
            var id = await _mediator.Send(command, ct);
            return Ok(new { success = true, data = new { id } });
        }

        [HttpGet]
        public async Task<IActionResult> GetInvitations(
            [FromQuery] InvitationStatus? status,
            CancellationToken ct)
        {
            var result = await _mediator.Send(
                new GetInvitationsQuery(status), ct);
            return Ok(new { success = true, data = result });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> CancelInvitation(
            Guid id,
            CancellationToken ct)
        {
            await _mediator.Send(new CancelInvitationCommand(id), ct);
            return Ok(new { success = true, message = "Invitation cancelled" });
        }
    }
}
