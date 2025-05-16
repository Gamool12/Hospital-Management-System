using Elshifa_Hospital.Models;
using Elshifa_Hospital.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Elshifa_Hospital.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        private static readonly List<User> _users = new List<User>()
        {
            new User { UserId = 1, Username = "admin", PasswordHash = "password", Role = "Admin" }, // مثال بسيط
            new User { UserId = 2, Username = "doctor1", PasswordHash = "doctorpass", Role = "Doctor" },
            new User { UserId = 3, Username = "patient1", PasswordHash = "patientpass", Role = "Patient" }
        };
        private static int _nextUserId = 4;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public ActionResult<AuthResponse> Register(UserRegistrationRequest request)
        {
            // التحقق من وجود مستخدم بنفس اسم المستخدم
            if (_users.Any(u => u.Username == request.Username))
            {
                return BadRequest("Username already exists");
            }

            // إنشاء مستخدم جديد (في الواقع هنستخدم Hashing لكلمة المرور)
            var newUser = new User
            {
                UserId = _nextUserId++,
                Username = request.Username,
                PasswordHash = request.Password // تحذير: ده للتبسيط فقط
                
            };

            _users.Add(newUser);

            // بعد التسجيل ممكن نرجع توكن على طول أو نخلي المستخدم يعمل تسجيل دخول
            var token = _authService.GenerateToken(newUser);
            return CreatedAtAction("Login", new AuthResponse { Token = token });
        }

        [HttpPost("login")]
        public ActionResult<AuthResponse> Login(LoginRequest request)
        {
            var user = _users.FirstOrDefault(u => u.Username == request.Username && u.PasswordHash == request.Password); // تحذير: ده للتبسيط فقط

            if (user == null)
            {
                return Unauthorized();
            }

            var token = _authService.GenerateToken(user);
            return Ok(new AuthResponse { Token = token });
        }
    }
}

