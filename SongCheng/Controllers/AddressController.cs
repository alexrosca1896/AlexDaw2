using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SongCheng.Data;

[ApiController]
[Route("api/[controller]")]
public class AddressController : ControllerBase
{
    private readonly SongChengContext _context;

    public AddressController(SongChengContext context)
    {
        _context = context;
    }

    [HttpGet("by-client/{clientId}")]
    public async Task<ActionResult<Address>> GetByClient(int clientId)
    {
        var client = await _context.Client
            .Include(c => c.Addresses)
            .FirstOrDefaultAsync(c => c.Id == clientId);

        if (client == null || client.Addresses == null)
            return NotFound();

        return Ok(client.Addresses);
    }

    [HttpPost]
    public async Task<ActionResult<Address>> Create([FromBody] Address address)
    {
        _context.Address.Add(address);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetByClient), new { clientId = address.Id }, address);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var addr = await _context.Address.FindAsync(id);
        if (addr == null) return NotFound();

        _context.Address.Remove(addr);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
