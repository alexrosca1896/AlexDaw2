using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SongCheng.Data;
using SongCheng.Models;

namespace SongCheng.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClientsController : ControllerBase
{
    private readonly SongChengContext _context;

    public ClientsController(SongChengContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Client>>> GetClients()
    {
        return await _context.Client.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Client>> GetClient(int id)
    {
        var client = await _context.Client
            .Include(c => c.Addresses)
            .FirstOrDefaultAsync(c => c.Id == id);

        return client is null ? NotFound() : Ok(client);
    }

    [HttpPost("register")]
    public IActionResult Register([FromBody] Client client)
    {
        if (_context.Client.Any(c => c.DNI == client.DNI))
            return BadRequest("Ya existe un cliente con ese DNI");

        _context.Client.Add(client);
        _context.SaveChanges();


        return Ok(client);
    }


    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteClient(int id)
    {
        var userId = int.Parse(User.FindFirst("id")?.Value ?? "0");
        if (id != userId) return Forbid();

        var client = await _context.Client.FindAsync(id);
        if (client is null) return NotFound();

        _context.Client.Remove(client);
        await _context.SaveChangesAsync();
        return NoContent();
    }

}
