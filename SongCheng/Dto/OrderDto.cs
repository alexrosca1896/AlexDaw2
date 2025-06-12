namespace SongCheng.Dto
{
    public class OrderDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public decimal Price { get; set; }
        public string Type { get; set; } = string.Empty;
        public int ClientId { get; set; }

        public List<OrderDetailDto> Details { get; set; } = new();
    }
    public class OrderDetailDto
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}