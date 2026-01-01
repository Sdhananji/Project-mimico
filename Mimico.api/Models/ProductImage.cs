using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mimico.api.Models
{
    public class ProductImage
    {
        [Key]
        public int Id {get; set;}

        [Required]
        public int ProductId {get; set;}

       [Required]
        public string ImagePath {get; set;} = string.Empty;

        public bool IsPrimary {get; set;} = false;

        [ForeignKey(nameof(ProductId))]
        public Product Product {get; set;}
    }
}