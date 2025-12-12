using Mimico.Api.Models;
using System.Threading.Tasks;

namespace Mimico.Api.Repositories
{
    public interface IAuthRepository
    {
        Task<User?> GetUserByEmailAsync(string email);
        Task AddUserAsync( User user);
        Task <bool> SaveChangesAsync();
    }
}