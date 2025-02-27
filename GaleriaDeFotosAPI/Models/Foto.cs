using System;
using System.ComponentModel.DataAnnotations;

namespace GaleriaDeFotosAPI.Models
{
    public class Foto
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]

        public string Url { get; set; }

        [Required]

        public DateTime date { get; set; } = DateTime.Now;

    }
}