namespace Elshifa_Hospital.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string? Username { get; set; }
        public string? PasswordHash { get; set; } // هنخزن الـ Hash مش الباسورد الصريح
        public string? Role { get; set; } // ممكن يكون "Admin", "Doctor", "Patient", إلخ.
    }
}
