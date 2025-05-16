using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System;
using Elshifa_Hospital.Models;
using Microsoft.Extensions.Configuration;
namespace Elshifa_Hospital.Services
{
    public class AuthService
    {
        private readonly string _secretKey;

        public AuthService(IConfiguration configuration)
        {
            _secretKey = configuration.GetSection("AppSettings:SecretKey").Value!;
        }

        public string GenerateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_secretKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Username!),
                    new Claim(ClaimTypes.Role, user.Role!)
                }),
                Expires = DateTime.UtcNow.AddHours(1), // صلاحية التوكن ساعة واحدة
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }


    }
}
