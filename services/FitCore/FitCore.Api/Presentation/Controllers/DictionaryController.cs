using FitCore.Api.Domain.Entites.BaseEntites;
using FitCore.Api.Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FitCore.Api.Presentation.Controllers
{
    [Route("api")]
    [ApiController]
    [Authorize]
    public class DictionaryController<T> : ControllerBase where T : BaseDictionary
    {
        private readonly DictionaryService dictionaryService;

        public DictionaryController(DictionaryService dictionaryService)
        {
            this.dictionaryService = dictionaryService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetDictionary()
        {
            var result = await this.dictionaryService.GetDictionaryItems<T>();
            return Ok(result);
        }
    }
}
