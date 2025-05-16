using Microsoft.EntityFrameworkCore;

namespace Elshifa_Hospital.Models
{
    [Keyless]
    public class UserRegistrationRequest
    {
        public string? Username { get; set; }
        public string? Password { get; set; }
    }
}
