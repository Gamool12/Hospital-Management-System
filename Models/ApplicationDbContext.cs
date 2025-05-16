using Microsoft.EntityFrameworkCore;

namespace Elshifa_Hospital.Models
{
    public class ApplicationDbContext  : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Department> Departments { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<LoginRequest> LoginRequests { get; set; }
        public DbSet<UserRegistrationRequest> UserRegistrationRequests { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<AuthResponse> AuthResponses { get; set; }


    }
}
