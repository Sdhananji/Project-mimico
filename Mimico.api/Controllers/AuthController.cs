using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc;
using Mimico.Api.DTOs;
using Mimico.Api.Services;

namespace Mimico.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _service;

        public AuthController (IAuthService service)
        {
            _service = service;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegisterDto dto)
        {
            var token = await _service.RegisterAsync(dto);
            if(token == null)
                return BadRequest("user already exists with that email");

            return Ok(new {token});
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDto dto)
        {
            var token = await _service.LoginAsync(dto);
            if (token == null) 
                return Unauthorized();

            return Ok( new {token});
        }
    }
}