using Mimico.Api.DTOs;
using Mimico.Api.Models;
using System.Threading.Tasks;

namespace Mimico.Api.Services
{
    public interface IAuthService
    {
        Task<string?> RegisterAsync(UserRegisterDto dto);
        Task<string?> LoginAsync (UserLoginDto dto);

        Task<UserProfileDto> GetCurrentUserAsync(int userId);


    }
}