using FitCore.Api.Domain.Entites;
using Microsoft.EntityFrameworkCore;

namespace FitCore.Api.Infrastructure.Persistance
{
    public class FitCoreContext : DbContext
    {
        public FitCoreContext(DbContextOptions options) : base(options)
        {
        }

        DbSet<User> Users { get; set; }
        DbSet<Tenant> Tenants { get; set; }
        DbSet<Member> Members { get; set; }
        DbSet<Trainer> Trainer { get; set; }
    }
}
