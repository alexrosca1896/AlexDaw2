using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SongCheng.Data;
using SongCheng.Models;

[ApiController]
[Route("api/[controller]")]
public class IngredientsController : ControllerBase
{
    private readonly SongChengContext _context;

    public IngredientsController(SongChengContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Ingredient>>> GetIngredients()
    {
        return await _context.Ingredient.ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Ingredient>> Create(Ingredient ingredient)
    {
        _context.Ingredient.Add(ingredient);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetIngredients), new { id = ingredient.Id }, ingredient);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var ing = await _context.Ingredient.FindAsync(id);
        if (ing is null) return NotFound();

        _context.Ingredient.Remove(ing);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
