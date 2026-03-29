using FitCore.Api.Application.Features.Trainers.Commnad;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace FitCore.Api.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainerController : ControllerBase
    {
        private readonly IMediator mediator;

        public TrainerController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpPost(nameof(CreateTrainer))]
        public async Task<IActionResult> CreateTrainer([FromBody] CreateTrainerCommand createTrainer, CancellationToken ct)
        {
            var trainerId = await this.mediator.Send(createTrainer, ct);
            return Ok(trainerId);
        }
    }
}
