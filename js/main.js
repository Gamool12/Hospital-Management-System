// Navigation
const navbar = document.querySelector('header');
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

// Toggle Navigation
burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.classList.toggle('toggle');
});

// Close Navigation on Link Click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.classList.remove('toggle');
    });
});

// Scroll Animation
const scrollElements = document.querySelectorAll('.animate-on-scroll');

const elementInView = (el, percentageScroll = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= 
        ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
    );
};

const displayScrollElement = (element) => {
    element.classList.add('visible');
};

const hideScrollElement = (element) => {
    element.classList.remove('visible');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 100)) {
            displayScrollElement(el);
        } else {
            hideScrollElement(el);
        }
    });
};

// Statistics Counter Animation
const statsSection = document.querySelector('.statistics');
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 50; // Adjust speed here
    const duration = 2000; // 2 seconds
    const interval = duration / 50;

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, interval);
};

const startCounterAnimation = () => {
    if (elementInView(statsSection, 100)) {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            animateCounter(stat, target);
        });
    }
};

// Scroll Event Listeners
window.addEventListener('scroll', () => {
    // Navbar Background Change
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Scroll Animations
    handleScrollAnimation();
    startCounterAnimation();
});

// Form Validation and Submission
const appointmentForm = document.getElementById('appointment-form');
const contactForm = document.getElementById('contact-form');

if (appointmentForm) {
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const formData = new FormData(this);
        let isValid = true;
        
        formData.forEach((value, key) => {
            if (!value) {
                isValid = false;
                const input = this.querySelector(`[name="${key}"]`);
                if (input) {
                    input.classList.add('error');
                }
            }
        });
        
        if (isValid) {
            // Here you would typically send the data to a server
            alert('تم حجز موعدك بنجاح! سنتواصل معك قريباً.');
            this.reset();
        } else {
            alert('يرجى ملء جميع الحقول المطلوبة');
        }
    });
}

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const formData = new FormData(this);
        let isValid = true;
        
        formData.forEach((value, key) => {
            if (!value) {
                isValid = false;
                const input = this.querySelector(`[name="${key}"]`);
                if (input) {
                    input.classList.add('error');
                }
            }
        });
        
        if (isValid) {
            // Here you would typically send the data to a server
            alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
            this.reset();
        } else {
            alert('يرجى ملء جميع الحقول المطلوبة');
        }
    });
}

// Remove error class on input focus
document.querySelectorAll('input, textarea, select').forEach(input => {
    input.addEventListener('focus', function() {
        this.classList.remove('error');
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize animations on page load
window.addEventListener('load', () => {
    handleScrollAnimation();
    startCounterAnimation();
});

// Scroll to Top Button
const scrollButton = document.createElement('button');
scrollButton.innerHTML = '&#8593;';
scrollButton.className = 'scroll-top';
document.body.appendChild(scrollButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollButton.style.display = 'block';
    } else {
        scrollButton.style.display = 'none';
    }
});

scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add CSS for scroll to top button
const style = document.createElement('style');
style.textContent = `
    .scroll-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--secondary-color);
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        display: none;
        font-size: 20px;
        z-index: 1000;
        transition: background-color 0.3s ease;
    }
    
    .scroll-top:hover {
        background-color: #2980b9;
    }
    
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .burger.toggle .line1 {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .burger.toggle .line2 {
        opacity: 0;
    }
    
    .burger.toggle .line3 {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style);

// Form Validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
        
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                isValid = false;
                input.classList.add('error');
            }
        }
        
        if (input.type === 'tel' && input.value) {
            const phoneRegex = /^[0-9]{10,}$/;
            if (!phoneRegex.test(input.value.replace(/\D/g, ''))) {
                isValid = false;
                input.classList.add('error');
            }
        }
    });
    
    return isValid;
}

// Add error styles
const errorStyle = document.createElement('style');
errorStyle.textContent = `
    .error {
        border-color: #e74c3c !important;
    }
    
    .error:focus {
        outline-color: #e74c3c;
    }
`;
document.head.appendChild(errorStyle);

// Add form validation to both forms
[appointmentForm, contactForm].forEach(form => {
    if (form) {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
                alert('يرجى التحقق من صحة البيانات المدخلة');
            }
        });
    }
});

// Language Toggle
const langBtn = document.getElementById('lang-toggle');
let isArabic = true;

const translations = {
    en: {
        home: 'Home',
        services: 'Services',
        doctors: 'Doctors',
        appointment: 'Book Appointment',
        about: 'About Us',
        contact: 'Contact Us',
        login: 'Login',
        heroTitle: 'We Care About Your Health',
        heroDesc: 'We provide the best medical services with the latest technologies and highest quality standards',
        bookNow: 'Book Now',
        ourServices: 'Our Services',
        ourDoctors: 'Our Medical Team',
        appointmentTitle: 'Book Appointment',
        confirm: 'Confirm Booking',
        fullName: 'Full Name',
        email: 'Email',
        phone: 'Phone Number',
        department: 'Department',
        date: 'Date',
        time: 'Time',
        reason: 'Reason for Visit',
        statDoctors: 'Specialist Doctors',
        statNurses: 'Nurses',
        statBeds: 'Patient Beds',
        statHappy: 'Happy Patients',
        contactTitle: 'Contact Us',
        contactSend: 'Send Message',
        footerAboutTitle: 'Al-Shifa Hospital',
        footerAboutDesc: 'We provide the best medical services to care for your health',
        footerLinksTitle: 'Quick Links',
        footerSocialTitle: 'Follow Us',
        footerBottom: '© 2024 Al-Shifa Hospital. All rights reserved.',
    },
    ar: {
        home: 'الرئيسية',
        services: 'خدماتنا',
        doctors: 'الأطباء',
        appointment: 'حجز موعد',
        about: 'من نحن',
        contact: 'اتصل بنا',
        login: 'تسجيل الدخول',
        heroTitle: 'نحن نهتم بصحتكم',
        heroDesc: 'نقدم أفضل الخدمات الطبية بأحدث التقنيات وأعلى معايير الجودة',
        bookNow: 'احجز موعدك الآن',
        ourServices: 'خدماتنا',
        ourDoctors: 'فريقنا الطبي',
        appointmentTitle: 'حجز موعد',
        confirm: 'تأكيد الحجز',
        fullName: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        phone: 'رقم الهاتف',
        department: 'القسم',
        date: 'التاريخ',
        time: 'الساعة',
        reason: 'سبب الزيارة',
        statDoctors: 'أطباء متخصصون',
        statNurses: 'ممرضين وممرضات',
        statBeds: 'أسرة للمرضى',
        statHappy: 'مرضى سعداء',
        contactTitle: 'تواصل معنا',
        contactSend: 'إرسال الرسالة',
        footerAboutTitle: 'مستشفى الشفاء',
        footerAboutDesc: 'نحن نقدم أفضل الخدمات الطبية لرعاية صحتكم',
        footerLinksTitle: 'روابط سريعة',
        footerSocialTitle: 'تابعنا',
        footerBottom: '© 2024 مستشفى الشفاء. جميع الحقوق محفوظة',
    }
};

function setLang(lang) {
    // Navbar
    document.querySelector('.nav-links a[href="#home"]').textContent = translations[lang].home;
    document.querySelector('.nav-links a[href="#services"]').textContent = translations[lang].services;
    document.querySelector('.nav-links a[href="#doctors"]').textContent = translations[lang].doctors;
    document.querySelector('.nav-links a[href="#appointment"]').textContent = translations[lang].appointment;
    document.querySelector('.nav-links a[href="#about"]').textContent = translations[lang].about;
    document.querySelector('.nav-links a[href="#contact"]').textContent = translations[lang].contact;
    document.querySelector('.login-btn').textContent = translations[lang].login;
    // Hero
    document.getElementById('hero-title').textContent = translations[lang].heroTitle;
    document.getElementById('hero-desc').textContent = translations[lang].heroDesc;
    document.getElementById('hero-book-btn').textContent = translations[lang].bookNow;
    document.getElementById('hero-services-btn').textContent = translations[lang].ourServices;
    // Services
    document.getElementById('services-title').textContent = translations[lang].ourServices;
    // Doctors
    document.getElementById('doctors-title').textContent = translations[lang].ourDoctors;
    // Appointment
    document.getElementById('appointment-title').textContent = translations[lang].appointmentTitle;
    document.getElementById('appointment-submit-btn').textContent = translations[lang].confirm;
    // Contact
    document.getElementById('contact-title').textContent = translations[lang].contactTitle;
    document.getElementById('contact-send-btn').innerHTML = `<i class="fas fa-paper-plane"></i> ${translations[lang].contactSend}`;
    // Footer
    document.getElementById('footer-about-title').textContent = translations[lang].footerAboutTitle;
    document.getElementById('footer-about-desc').textContent = translations[lang].footerAboutDesc;
    document.getElementById('footer-links-title').textContent = translations[lang].footerLinksTitle;
    document.getElementById('footer-social-title').textContent = translations[lang].footerSocialTitle;
    document.getElementById('footer-bottom').textContent = translations[lang].footerBottom;
    // Appointment form placeholders/labels
    document.querySelector('#appointment-form input#name').placeholder = translations[lang].fullName;
    document.querySelector('#appointment-form input#email').placeholder = translations[lang].email;
    document.querySelector('#appointment-form input#phone').placeholder = translations[lang].phone;
    document.querySelector('#appointment-form select#department option[value=""]').textContent = translations[lang].department;
    document.querySelector('#appointment-form input#date').placeholder = translations[lang].date;
    document.querySelector('#appointment-form select#time option[value=""]').textContent = translations[lang].time;
    document.querySelector('#appointment-form select#reason option[value=""]').textContent = translations[lang].reason;
    // Statistics
    document.querySelectorAll('.stat-item')[0].querySelector('h3').textContent = translations[lang].statDoctors;
    document.querySelectorAll('.stat-item')[1].querySelector('h3').textContent = translations[lang].statNurses;
    document.querySelectorAll('.stat-item')[2].querySelector('h3').textContent = translations[lang].statBeds;
    document.querySelectorAll('.stat-item')[3].querySelector('h3').textContent = translations[lang].statHappy;
    // Change button text
    langBtn.textContent = lang === 'ar' ? 'English' : 'العربية';
    // Change direction
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
}

if (langBtn) {
    langBtn.addEventListener('click', function(e) {
        e.preventDefault();
        isArabic = !isArabic;
        setLang(isArabic ? 'ar' : 'en');
    });
}
// Set default language
setLang('ar'); 