using Elshifa_Hospital.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Elshifa_Hospital.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServicesController : ControllerBase
    {
        private static readonly List<Service> _services = new List<Service>()
        {
            new Service { ServiceId = 1, Name = "Pediatrics", Description = "Comprehensive healthcare for children" },
            new Service { ServiceId = 2, Name = "Orthopedics", Description = "Treatment of bone and joint injuries and diseases" },
            new Service { ServiceId = 3, Name = "Neurology", Description = "Diagnosis and treatment of nervous system diseases" },
            new Service { ServiceId = 4, Name = "Cardiology", Description = "Comprehensive services for heart and vascular diseases" }
        };

        [HttpGet]
        public ActionResult<IEnumerable<Service>> GetServices()
        {
            return Ok(_services);
        }

        [HttpGet("{id}")]
        public ActionResult<Service> GetServiceById(int id)
        {
            var service = _services.FirstOrDefault(s => s.ServiceId == id);

            if (service == null)
            {
                return NotFound();
            }

            return Ok(service);
        }

    }
}
