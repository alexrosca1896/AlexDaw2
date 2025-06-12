namespace SongCheng.Models;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int CategoryId { get; set; }

    public ICollection<ProductIngredient> ProductIngredients { get; set; } = new List<ProductIngredient>();
}
