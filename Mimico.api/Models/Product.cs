using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mimico.api.Models
{
    public class Product
    {
        [Key]
        public int Id{get; set;}

        [Required]
        [MaxLength(150)]
        public string Name {get; set;}

        [MaxLength(500)]
        public string Description {get; set;} = string.Empty;

        [Column(TypeName = "decimal(10,2)")]
        public decimal Price {get; set;}

        [MaxLength(100)]
        public string Category {get; set;} = string.Empty;

        public bool IsActive {get; set;} = true;

        public DateTime CreatedAt {get; set;} = DateTime.UtcNow;

        public ICollection<ProductImage> Images {get; set;} = new List<ProductImage>();




    }
}