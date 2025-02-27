using GaleriaDeFotosAPI.Data;
using GaleriaDeFotosAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.IO;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class FotosController : ControllerBase
{
    private readonly GaleriaDbContext _context;
    private readonly IWebHostEnvironment _env; // Permite acceder a la carpeta wwwroot

    public FotosController(GaleriaDbContext context, IWebHostEnvironment env)
    {
        _context = context;
        _env = env;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Foto>>> GetFotos()
    {
        try
        {
            // Obtener todas las fotos ordenadas por fecha de creación (más recientes primero)
            var fotos = await _context.Fotos
                .OrderByDescending(f => f.Id) // Asumiendo que Id es un valor autoincremental
                .ToListAsync();

            return fotos;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error al obtener las fotos: {ex.Message}");
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    [HttpPost]
    public async Task<ActionResult<Foto>> PostFoto([FromForm] IFormFile file) // Cambiado para aceptar archivos
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest("Debe subir una imagen.");
        }

        try
        {
            // Crear carpeta si no existe
            string uploadsFolder = Path.Combine(_env.WebRootPath, "uploads");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            // Crear nombre único para la imagen
            string fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            string filePath = Path.Combine(uploadsFolder, fileName);

            // Guardar archivo en el servidor
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Guardar en la base de datos
            var foto = new Foto
            {
                Name = file.FileName,
                Url = $"/uploads/{fileName}"
            };

            _context.Fotos.Add(foto);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetFotos), new { id = foto.Id }, foto);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error al subir la imagen: {ex.Message}");
        }
    }
}