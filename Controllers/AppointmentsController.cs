using Elshifa_Hospital.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Elshifa_Hospital.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentsController : ControllerBase
    {
        private static readonly List<Appointment> _appointments = new List<Appointment>()
        {
            new Appointment { AppointmentId = 1, PatientId = 1, DoctorId = 2, AppointmentDateTime = new DateTime(2025, 5, 15, 10, 0, 0), Reason = "Checkup", Status = "محجوز" },
            new Appointment { AppointmentId = 2, PatientId = 2, DoctorId = 1, AppointmentDateTime = new DateTime(2025, 5, 16, 11, 30, 0), Reason = "Follow-up", Status = "محجوز" },
            new Appointment { AppointmentId = 3, PatientId = 1, DoctorId = 3, AppointmentDateTime = new DateTime(2025, 5, 17, 9, 0, 0), Reason = "Consultation", Status = "تم" }
        }; // بيانات تجريبية
        private static int _nextId = 4;

        [HttpGet]
        public ActionResult<IEnumerable<Appointment>> GetAppointments()
        {
            return Ok(_appointments);
        }

        [HttpGet("{id}")]
        public ActionResult<Appointment> GetAppointmentById(int id)
        {
            var appointment = _appointments.FirstOrDefault(a => a.AppointmentId == id);

            if (appointment == null)
            {
                return NotFound();
            }

            return Ok(appointment);
        }

        [HttpPost]
        public ActionResult<Appointment> CreateAppointment(Appointment appointment)
        {
            appointment.AppointmentId = _nextId++;
            appointment.BookingDateTime = DateTime.Now;
            _appointments.Add(appointment);

            return CreatedAtAction(nameof(GetAppointmentById), new { id = appointment.AppointmentId }, appointment);
        }

        [HttpGet("patient/{patientId}")]
        public ActionResult<IEnumerable<Appointment>> GetAppointmentsByPatient(int patientId)
        {
            var patientAppointments = _appointments.Where(a => a.PatientId == patientId).ToList();

            if (!patientAppointments.Any())
            {
                return NotFound($"No appointments found for patient with ID: {patientId}");
            }

            return Ok(patientAppointments);
        }

        [HttpGet("doctor/{doctorId}")]
        public ActionResult<IEnumerable<Appointment>> GetAppointmentsByDoctor(int doctorId)
        {
            var doctorAppointments = _appointments.Where(a => a.DoctorId == doctorId).ToList();

            if (!doctorAppointments.Any())
            {
                return NotFound($"No appointments found for doctor with ID: {doctorId}");
            }

            return Ok(doctorAppointments);
        }

        [HttpDelete("{id}")]
        public ActionResult<NoContentResult> DeleteAppointment(int id)
        {
            var appointmentToRemove = _appointments.FirstOrDefault(a => a.AppointmentId == id);

            if (appointmentToRemove == null)
            {
                return NotFound();
            }

            _appointments.Remove(appointmentToRemove);

            // في الواقع هنا هنحذف الموعد من قاعدة البيانات
            return NoContent(); // بيرجع حالة 204 No Content بنجاح عملية الحذف
        }
    }
}
