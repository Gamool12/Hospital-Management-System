using Elshifa_Hospital.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Elshifa_Hospital.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientsController : ControllerBase
    {
        private static readonly List<Patient> _patients = new List<Patient>()
        {
            new Patient { PatientId = 1, FirstName = "Ahmed", LastName = "Mahmoud", DateOfBirth = new DateTime(1990, 1, 15), Gender = "Male", ContactNumber = "01012345678", Address = "Cairo" },
            new Patient { PatientId = 2, FirstName = "Fatma", LastName = "Ali", DateOfBirth = new DateTime(1985, 5, 20), Gender = "Female", ContactNumber = "01187654321", Address = "Alexandria" }
        };
        private static int _nextId = 3;

        [HttpGet]
        public ActionResult<IEnumerable<Patient>> GetPatients()
        {
            return Ok(_patients);
        }

        [HttpGet("{id}")]
        public ActionResult<Patient> GetPatientById(int id)
        {
            var patient = _patients.FirstOrDefault(p => p.PatientId == id);

            if (patient == null)
            {
                return NotFound();
            }

            return Ok(patient);
        }

        [HttpPost]
        public ActionResult<Patient> CreatePatient(Patient patient)
        {
            patient.PatientId = _nextId++;
            _patients.Add(patient);

            return CreatedAtAction(nameof(GetPatientById), new { id = patient.PatientId }, patient);
        }

        [HttpPut("{id}")]
        public ActionResult<IActionResult> UpdatePatient(int id, Patient patient)
        {
            if (id != patient.PatientId)
            {
                return BadRequest("Patient ID mismatch");
            }

            var existingPatient = _patients.FirstOrDefault(p => p.PatientId == id);
            if (existingPatient == null)
            {
                return NotFound();
            }

            existingPatient.FirstName = patient.FirstName;
            existingPatient.LastName = patient.LastName;
            existingPatient.DateOfBirth = patient.DateOfBirth;
            existingPatient.Gender = patient.Gender;
            existingPatient.ContactNumber = patient.ContactNumber;
            existingPatient.Address = patient.Address;

            // في الواقع هنا هنحفظ التعديلات في قاعدة البيانات
            return NoContent(); // بيرجع حالة 204 No Content بنجاح عملية التعديل
        }

        [HttpDelete("{id}")]
        public ActionResult<NoContentResult> DeletePatient(int id)
        {
            var patientToRemove = _patients.FirstOrDefault(p => p.PatientId == id);

            if (patientToRemove == null)
            {
                return NotFound();
            }

            _patients.Remove(patientToRemove);

            // في الواقع هنا هنحذف المريض من قاعدة البيانات
            return NoContent();
        }
    }
}
