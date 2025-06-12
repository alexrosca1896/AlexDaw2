using Microsoft.EntityFrameworkCore;
using SongCheng.Models;

namespace SongCheng.Data;

public class SongChengContext : DbContext
{
    public SongChengContext(DbContextOptions<SongChengContext> options) : base(options) { }

    public DbSet<Product> Product => Set<Product>();
    public DbSet<Category> Category => Set<Category>();
    public DbSet<Client> Client => Set<Client>();
    public DbSet<Address> Address => Set<Address>();
    public DbSet<Order> Order => Set<Order>();
    public DbSet<Ingredient> Ingredient => Set<Ingredient>();
    public DbSet<ProductIngredient> ProductIngredients => Set<ProductIngredient>();

    public DbSet<OrderDetail> OrderDetails => Set<OrderDetail>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Order>()
            .ToTable("Order");

        modelBuilder.Entity<OrderDetail>()
            .ToTable("OrderDetail")
            .HasKey(od => new { od.OrderId, od.ProductId });

        modelBuilder.Entity<ProductIngredient>()
            .ToTable("ProductIngredient")
            .HasKey(pi => new { pi.ProductId, pi.IngredientId });

        modelBuilder.Entity<ProductIngredient>()
            .HasKey(pi => new { pi.ProductId, pi.IngredientId });

        modelBuilder.Entity<ProductIngredient>()
            .HasOne(pi => pi.Product)
            .WithMany(p => p.ProductIngredients)
            .HasForeignKey(pi => pi.ProductId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ProductIngredient>()
            .HasOne(pi => pi.Ingredient)
            .WithMany(i => i.ProductIngredients)
            .HasForeignKey(pi => pi.IngredientId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Address>()
            .HasOne(a => a.Client)
            .WithMany(c => c.Addresses)
            .HasForeignKey(a => a.ClientId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<OrderDetail>()
            .HasKey(od => new { od.OrderId, od.ProductId });

        modelBuilder.Entity<OrderDetail>()
            .HasOne(od => od.Order)
            .WithMany(o => o.OrderDetails)
            .HasForeignKey(od => od.OrderId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<OrderDetail>()
            .HasOne(od => od.Product)
            .WithMany()
            .HasForeignKey(od => od.ProductId)
            .OnDelete(DeleteBehavior.Restrict);


    }
}
