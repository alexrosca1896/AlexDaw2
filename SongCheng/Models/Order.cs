namespace SongCheng.Models;

public class Order
{
    public int Id { get; set; }
    public DateTime Date { get; set; } = DateTime.UtcNow;
    public decimal Price { get; set; }
    public string Type { get; set; } = "Online";
    public int ClientId { get; set; }
    public Client Client { get; set; } = null!;

    public ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
}