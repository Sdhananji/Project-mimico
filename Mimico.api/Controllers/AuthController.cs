using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc;
using Mimico.Api.DTOs;
using Mimico.Api.Services;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

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

        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> GetMe()
        {
            var userIdClaim = User.Claims.FirstOrDefault(c =>c.Type=="UserId");

            if (userIdClaim == null)
                return Unauthorized(new { message = "User ID claim missing from token" });

            if (!int.TryParse(userIdClaim.Value, out int userId))
                return BadRequest("Invalid User ID format in token");

            // 2. Added 'await' to get the actual result from the service
            var user = await _service.GetCurrentUserAsync(userId);
    
            if (user == null)
                return NotFound(new { message = "User no longer exists in database" });

            return Ok(user);
        }
    }
}