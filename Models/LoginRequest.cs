using Microsoft.EntityFrameworkCore;

namespace Elshifa_Hospital.Models
{
    [Keyless]
    public class LoginRequest
    {
        
        public string? Username { get; set; }
        public string? Password { get; set; }
    }
}
