using Microsoft.AspNetCore.Mvc;
using Mimico.Api.DTOs;
using Mimico.Api.Services.Interfaces;

namespace Mimico.api.Controllers
{
    [ApiController]
    [Route("api/products")]


    public class ProductController: ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService= productService;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _productService.GetAllProductsAsync();
            return Ok(products);
        }
    }
}