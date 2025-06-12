public class Address
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int PostalCode { get; set; }
    public string City { get; set; } = string.Empty;
    public int ClientId { get; set; }

    public Client? Client { get; set; }
}
