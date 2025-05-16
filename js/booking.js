document.addEventListener('DOMContentLoaded', () => {
  const bookingForm = document.getElementById('booking-form');
  const responseMessageDiv = document.getElementById('response-message');

  bookingForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // منع الصفحة من إعادة التحميل عند الضغط على submit

      const fullName = document.getElementById('Full_name').value;
      const email = document.getElementById('email').value;
      const phoneNumber = document.getElementById('phone_number').value;
      const department = document.getElementById('department').value;
      const appointmentDate = document.getElementById('appointment_date').value;
      const appointmentTime = document.getElementById('appointment_time').value;
      const reason = document.getElementById('reason').value;

      const bookingData = {
          fullName: fullName,
          email: email,
          phoneNumber: phoneNumber,
          department: department,
          appointmentDate: appointmentDate,
          appointmentTime: appointmentTime,
          reason: reason
      };

      const apiUrl = 'https://localhost:7102/api/Appointment'; // تأكد من تغيير هذا الـ URL

      try {
          const response = await fetch(apiUrl, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(bookingData)
          });

          const responseData = await response.json();

          if (response.ok) {
              responseMessageDiv.className = 'success';
              responseMessageDiv.textContent = 'تم حجز الموعد بنجاح!';
              bookingForm.reset(); // إعادة تعيين الفورم بعد النجاح
          } else {
              responseMessageDiv.className = 'error';
              responseMessageDiv.textContent = `حدث خطأ: ${responseData.error || 'مشكلة غير متوقعة'}`;
              console.error('Error response:', responseData);
          }

      } catch (error) {
          responseMessageDiv.className = 'error';
          responseMessageDiv.textContent = 'حدث خطأ في الاتصال بالخادم.';
          console.error('Fetch error:', error);
      }
  });
});