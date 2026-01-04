using Mimico.api.Models;
using Mimico.Api.DTOs;

namespace Mimico.Api.Services.Interfaces
{
    public interface IProductService
    {
        Task<int> CreateProductAsync(ProductCreateDto dto);
        Task<List<ProductResponseDto>> GetAllProductsAsync();
    }
}