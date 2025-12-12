using Microsoft.EntityFrameworkCore;
using Mimico.Api.Models;

namespace Mimico.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

    public DbSet<User> Users {get;set;}
        // Example table
        // public DbSet<Product> Products { get; set; }
    }
}
