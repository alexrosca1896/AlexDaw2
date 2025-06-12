namespace SongCheng.Models;

public class Ingredient
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public ICollection<ProductIngredient> ProductIngredients { get; set; } = new List<ProductIngredient>();

}
