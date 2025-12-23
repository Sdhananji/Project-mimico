using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Mimico.Api.Services.Interfaces;
using Mimico.Api.DTOs;

namespace Mimico.Api.Controllers
{
    
    [ApiController]
    [Route("/api/admin/products")]
    [Authorize(Roles = "Admin")]

    public class AdminProductsController: ControllerBase
    {
        private readonly IProductService _productService;

        public AdminProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Create ([FromForm] ProductCreateDto dto)
        {
            var productId = await _productService.CreateProductAsync(dto);
            return Ok(new {message = "Product created", productId});
        }
    }

}

