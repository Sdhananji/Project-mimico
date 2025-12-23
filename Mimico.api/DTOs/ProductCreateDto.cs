using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace Mimico.api.DTOs
{
    public class ProductCreateDto
    {
        [Required]
        public string Name {get; set;}

        public string Description {get; set;}

        [Required]
        public decimal Price {get; set;}

        public string Category {get; set;}

        //Admin uploads files here
        public List<IFormFile> Images {get; set;} = new();


    }
}