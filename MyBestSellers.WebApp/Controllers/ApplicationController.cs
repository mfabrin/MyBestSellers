using Microsoft.AspNetCore.Mvc;
using MyBestSellers.Application.Services;

namespace MyBestSellers.WebApp.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ApplicationController : ControllerBase
    {
        private readonly ApplicationService _appService;

        public ApplicationController(ApplicationService appService)
        {
            _appService = appService;
        }


        [HttpGet]
        public async Task<IActionResult> GetData()
        {
            var response = await _appService.GetApplicationData();
            return Ok(response);
        }
    }
}
