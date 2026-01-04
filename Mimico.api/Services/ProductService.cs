using Mimico.Api.Services.Interfaces;
using Mimico.Api.Data;
using Mimico.Api.DTOs;
using Mimico.api.Models;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;


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

            if(dto.Images==null || dto.Images.Any())
                return product.Id;

            var rootPath = _env.WebRootPath ?? Path.Combine(_env.ContentRootPath, "wwwroot");

            //create product folder
            var productFolder = Path.Combine(
                rootPath,
                "uploads",
                "products",
                product.Id.ToString()
            );

            Directory.CreateDirectory(productFolder);

            var allowedExtensions = new[] {".jpg", ".jpeg", ".png", ".webp"};

            bool isFirstImage = true;

            foreach(var image in dto.Images)
            {
                var extension = Path.GetExtension(image.FileName).ToLower();

                if(!allowedExtensions.Contains(extension))
                    continue;
                if (image.Length>5*1024*1024)
                    continue;

                var fileName = $"{Guid.NewGuid()}{extension}";
                var filePath = Path.Combine(productFolder, fileName);

                using var stream = new FileStream(filePath, FileMode.Create);
                await image.CopyToAsync(stream);
                

                product.Images.Add(new ProductImage
                {
                    ImagePath = $"uploads/products/{product.Id}/{fileName}",
                    IsPrimary = isFirstImage
                });
                isFirstImage = false;
            }

            await _context.SaveChangesAsync();
            return product.Id;
        }

        public async Task<List<ProductResponseDto>> GetAllProductsAsync()
        {
            return await _context.Products
                .Include(p => p.Images)
                .OrderByDescending(p =>p.Id)
                .Select(p => new ProductResponseDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    Price = p.Price,
                    Category = p.Category,
                    Images = p.Images.Select(i => new ProductImageDto
                    {
                        Id = i.Id,
                        ImagePath = i.ImagePath,
                        IsPrimary = i.IsPrimary
                    }).ToList()
                })
                .ToListAsync();
        }
    }
}