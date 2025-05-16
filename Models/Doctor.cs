namespace Elshifa_Hospital.Models
{
    public class Doctor
    {
        public int DoctorId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Specialization { get; set; }
        public int DepartmentId { get; set; } // Foreign Key لجدول الأقسام
        public string? ImagePath { get; set; } // مسار صورة الدكتور
    
}
}
