using Elshifa_Hospital.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Elshifa_Hospital.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorsController : ControllerBase
    {
        private static readonly List<Doctor> _doctors = new List<Doctor>()
        {
            new Doctor { DoctorId = 1, FirstName = "Mohamed", LastName = "Ali", Specialization = "Orthopedic Surgery Consultant", DepartmentId = 2, ImagePath = "images/doctor1.jpg" },
            new Doctor { DoctorId = 2, FirstName = "Sarah", LastName = "Ahmed", Specialization = "Pediatrics Consultant", DepartmentId = 1, ImagePath = "images/doctor2.jpg" },
            new Doctor { DoctorId = 3, FirstName = "Ahmed", LastName = "Mohamed", Specialization = "Cardiology Consultant", DepartmentId = 3, ImagePath = "images/doctor3.jpg" }
        };

        [HttpGet]
        public ActionResult<IEnumerable<Doctor>> GetDoctors()
        {
            return Ok(_doctors);
        }

        [HttpGet("{id}")]
        public ActionResult<Doctor> GetDoctorById(int id)
        {
            var doctor = _doctors.FirstOrDefault(d => d.DoctorId == id);

            if (doctor == null)
            {
                return NotFound();
            }

            return Ok(doctor);
        }

        [HttpGet("by-department/{departmentId}")]
        public ActionResult<IEnumerable<Doctor>> GetDoctorsByDepartment(int departmentId)
        {
            var doctorsInDepartment = _doctors.Where(d => d.DepartmentId == departmentId).ToList();

            if (!doctorsInDepartment.Any())
            {
                return NotFound($"No doctors found in department with ID: {departmentId}");
            }

            return Ok(doctorsInDepartment);
        }


    }
}
