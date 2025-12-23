using Mimico.Api.Services.Interfaces;
using Mimico.Api.Data;
using Microsoft.AspNetCore.Hosting;
using Mimico.Api.DTOs;
using Mimico.api.Models;
using Mimico.api.Migrations;


namespace Mimico.Api.Services
{
    public class ProductService : IProductService
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _env;

        public ProductService(AppDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        public async Task<int> CreateProductAsync(ProductCreateDto dto)
        {
            var product = new Product
            {
                Name = dto.Name,
                Description = dto.Description,
                Price = dto.Price,
                Category = dto.Category,
                Images = new List<ProductImage>()
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            var rootPath = _env.WebRootPath ?? Path.Combine(_env.ContentRootPath, "wwwroot");

            //create product folder
            var productFolder = Path.Combine(
                rootPath,
                "uploads",
                "products",
                product.Id.ToString()
            );

            Directory.CreateDirectory(productFolder);

            foreach(var image in dto.Images)
            {
                var fileName = $"{Guid.NewGuid()}{Path.GetExtension(image.FileName)}";
                var filePath = Path.Combine(productFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                }
                

                product.Images.Add(new ProductImage
                {
                    ImagePath = $"uploads/products/{product.Id}/{fileName}"
                });
            }

            await _context.SaveChangesAsync();
            return product.Id;
        }
    }
}