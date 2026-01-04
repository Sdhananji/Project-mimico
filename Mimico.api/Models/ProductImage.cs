using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

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

        [JsonIgnore]
        public Product Product {get; set;}
    }
}