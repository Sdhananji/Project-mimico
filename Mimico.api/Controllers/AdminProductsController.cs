using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Mimico.api.Models;
using Mimico.Api.Data;
using Mimico.Api.DTOs;
using Mimico.Api.Models;

namespace Mimico.Api.Controllers
{
    
    [ApiController]
    [Route("/api/admin/products")]
    [Authorize(Roles = "Admin")]

    public class AdminProductController: ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _env;

        public AdminProductsController(AppDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }   

        [HttpPost]
        public async Task<IActionResult> CreateProduct ([FromForm] ProductCreateDto dto)
        {
            var product = new Product
            {
                Name = dto.Name,
                Description = dto.Description,
                Price = dto.Price,
                Category = dto.Category
            };
            _context.Products.Add(product);
            await _context.SaveChangesAsync(); //ProductId generated

            if(dto.Images !=null && dto.Images.Count > 0)
            {
                var uploadRoot = Path.Combine(
                    _env.WebRootPath,
                    "uploads",
                    "products",
                    product.Id.ToString()
                );

                Directory.CreateDirectory(uploadRoot);

                foreach(var file in dto.Images)
                {
                    var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
                    var filePath = Path.Combine(uploadRoot, fileName);

                    using var stream = new FileStream(filePath, FileMode.Create);
                    await file.CopyToAsync(stream);

                    _context.ProductImages.Add(new ProductImage
                    {
                        ProductId = product.Id,
                        ImagePath = $"/uploads/products/{product.Id}/{fileName}",
                        IsPrimary = false
                    });
                }
            }

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Product created successfully",
                productId = product.Id
            });
        }

    }

}