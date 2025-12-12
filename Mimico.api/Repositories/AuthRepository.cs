using Microsoft.EntityFrameworkCore;
using Mimico.Api.Models;
using Mimico.Api.Data;

namespace Mimico.Api.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly AppDbContext _context;

        public AuthRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<User?> GetUserByEmailAsync(string Email)
        {
            return await _context.Users.FirstOrDefaultAsync(u =>u.Email == Email);
        }

        public async Task AddUserAsync(User user)
        {
            await _context.Users.AddAsync(user);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) >0;
        }
    }
}