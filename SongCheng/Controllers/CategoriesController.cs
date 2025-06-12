using Microsoft.AspNetCore.Mvc;
using SongCheng.Data;
using SongCheng.Models;
using Microsoft.EntityFrameworkCore;

namespace SongCheng.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly SongChengContext _context;

    public CategoriesController(SongChengContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
    {
        return await _context.Category.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Category>> GetCategory(int id)
    {
        var category = await _context.Category.FindAsync(id);
        return category is null ? NotFound() : Ok(category);
    }

    [HttpPost]
    public async Task<ActionResult<Category>> CreateCategory(Category category)
    {
        _context.Category.Add(category);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetCategory), new { id = category.Id }, category);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        var category = await _context.Category.FindAsync(id);
        if (category is null) return NotFound();

        _context.Category.Remove(category);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
