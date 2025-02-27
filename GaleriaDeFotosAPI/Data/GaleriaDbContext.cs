using Microsoft.EntityFrameworkCore;
using GaleriaDeFotosAPI.Models;

namespace GaleriaDeFotosAPI.Data
{
    public class GaleriaDbContext : DbContext
    {
        public GaleriaDbContext(DbContextOptions<GaleriaDbContext> options) : base(options) { }

        public DbSet<Foto> Fotos { get; set; }
    }
}