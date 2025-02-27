using GaleriaDeFotosAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Agregar contexto de base de datos
builder.Services.AddDbContext<GaleriaDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Agregar controladores
builder.Services.AddControllers();

// Configurar CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});

var app = builder.Build();

// Configurar pipeline HTTP
if (app.Environment.IsDevelopment())
{
    // Desarrollo
}

app.UseHttpsRedirection();

// Importante: habilitar CORS antes de la autorización y el mapeo de controladores
app.UseCors("AllowAll");

app.UseAuthorization();

// Servir archivos estáticos para poder acceder a la carpeta uploads
app.UseStaticFiles();

app.MapControllers();

app.Run();