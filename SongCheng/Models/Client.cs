public class Client
{
    public int Id { get; set; }
    public string DNI { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public ICollection<Address>? Addresses { get; set; }


}
