using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SongCheng.Auth;
using SongCheng.Data;
using SongCheng.Dto;
using SongCheng.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SongCheng.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly SongChengContext _context;
    private readonly JwtSettings _jwtSettings;

    public AuthController(SongChengContext context, JwtSettings jwtSettings)
    {
        _context = context;
        _jwtSettings = jwtSettings;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginDto login)
    {
        var client = _context.Client.FirstOrDefault(c => c.DNI == login.User && c.Password == login.Password);
        if (client == null) return Unauthorized("Credenciales incorrectas");

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, client.DNI),
            new Claim("id", client.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _jwtSettings.Issuer,
            audience: _jwtSettings.Audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(_jwtSettings.ExpirationMinutes),
            signingCredentials: creds
        );

        var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

        return Ok(new { token = tokenString });
    }
}
