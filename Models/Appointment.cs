namespace Elshifa_Hospital.Models
{
    public class Appointment
    {
        public int AppointmentId { get; set; }
        public int PatientId { get; set; } // Foreign Key لجدول المرضى
        public int DoctorId { get; set; } // Foreign Key لجدول الأطباء
        public DateTime AppointmentDateTime { get; set; }
        public string? Reason { get; set; }
        public string? Status { get; set; } // ممكن تكون قيم زي "محجوز"، "تم"، "ملغي"
        public DateTime BookingDateTime { get; set; } = DateTime.Now; // وقت الحجز الفعلي
    }
}
