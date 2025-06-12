using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SongCheng.Data;
using SongCheng.Dto;
using SongCheng.Models;

namespace SongCheng.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly SongChengContext _context;

    public ProductsController(SongChengContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductDto>>> Get()
    {
        var products = await _context.Product
            .Include(p => p.ProductIngredients)
                .ThenInclude(pi => pi.Ingredient)
            .ToListAsync();

        var result = products.Select(p => new ProductDto
        {
            Id = p.Id,
            Name = p.Name,
            Code = p.Code,
            Description = p.Description,
            Price = p.Price,
            CategoryId = p.CategoryId,
            Ingredients = p.ProductIngredients
                               .Select(pi => pi.Ingredient.Name)
                               .ToList()
        });

        return Ok(result);
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> Get(int id)
    {
        var product = await _context.Product.FindAsync(id);
        return product is null ? NotFound() : Ok(product);
    }
}
