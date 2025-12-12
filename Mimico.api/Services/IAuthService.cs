using Mimico.Api.DTOs;
using System.Threading.Tasks;

namespace Mimico.Api.Services
{
    public interface IAuthService
    {
        Task<string?> RegisterAsync(UserRegisterDto dto);
        Task<string?> LoginAsync (UserLoginDto dto);

    }
}