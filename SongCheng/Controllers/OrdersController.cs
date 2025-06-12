using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SongCheng.Data;
using SongCheng.Dto;
using SongCheng.Models;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly SongChengContext _ctx;
    public OrdersController(SongChengContext ctx) => _ctx = ctx;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<OrderDto>>> GetOrders()
    {
        var orders = await _ctx.Order
            .Include(o => o.OrderDetails)
                .ThenInclude(od => od.Product)
            .ToListAsync();

        var result = orders.Select(o => new OrderDto
        {
            Id = o.Id,
            Date = o.Date,
            Price = o.Price,
            Type = o.Type,
            ClientId = o.ClientId,
            Details = o.OrderDetails.Select(od => new OrderDetailDto
            {
                ProductId = od.ProductId,
                ProductName = od.Product.Name,
                Quantity = od.Quantity,
                Price = od.Price
            }).ToList()
        });

        return Ok(result);
    }


    [HttpPost]
    public async Task<IActionResult> CreateOrder([FromBody] CreateOrderDto dto)
    {
        // Calcula total
        var total = dto.Items.Sum(i => i.Price * i.Quantity);

        // Crea la orden
        var order = new Order
        {
            ClientId = dto.ClientId,
            Price = total,
            Type = "Online",        // o recíbelo desde DTO
            Date = DateTime.UtcNow
        };

        // Mapea detalles
        foreach (var it in dto.Items)
        {
            order.OrderDetails.Add(new OrderDetail
            {
                ProductId = it.ProductId,
                Quantity = it.Quantity,
                Price = it.Price
            });
        }

        _ctx.Order.Add(order);
        await _ctx.SaveChangesAsync();

        return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, null);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Order>> GetOrder(int id)
    {
        var ord = await _ctx.Order
            .Include(o => o.OrderDetails)
                .ThenInclude(od => od.Product)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (ord == null) return NotFound();
        return Ok(ord);
    }
}