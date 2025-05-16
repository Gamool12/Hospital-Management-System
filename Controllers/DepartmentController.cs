using Elshifa_Hospital.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Elshifa_Hospital.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private static readonly List<Department> _departments = new List<Department>()
        {
            new Department { DepartmentId = 1, Name = "Pediatrics", Description = "Pediatrics Department" },
            new Department { DepartmentId = 2, Name = "Orthopedics", Description = "Orthopedics Department" },
            new Department { DepartmentId = 3, Name = "Cardiology", Description = "Cardiology Department" },
            new Department { DepartmentId = 4, Name = "Neurology", Description = "Neurology Department" }
        };

        [HttpGet]
        public ActionResult<IEnumerable<Department>> GetDepartments()
        {
            return Ok(_departments);
        }

        [HttpGet("{id}")]
        public ActionResult<Department> GetDepartmentById(int id)
        {
            var department = _departments.FirstOrDefault(d => d.DepartmentId == id);

            if (department == null)
            {
                return NotFound();
            }

            return Ok(department);
        }
    }
}
