using Microsoft.EntityFrameworkCore;

namespace Elshifa_Hospital.Models
{
    [Keyless]
    public class AuthResponse
    {
        
        public string? Token { get; set; }
    }
}
