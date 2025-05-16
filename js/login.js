document.addEventListener('DOMContentLoaded', function() {
    // Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            document.getElementById(btn.dataset.tab).classList.add('active');
        });
    });

    // Password Toggle
    document.querySelectorAll('.toggle-password').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input[type="password"], input[type="text"]');
            if (input) {
                if (input.type === 'password') {
                    input.type = 'text';
                    this.querySelector('i').classList.remove('fa-eye');
                    this.querySelector('i').classList.add('fa-eye-slash');
                } else {
                    input.type = 'password';
                    this.querySelector('i').classList.remove('fa-eye-slash');
                    this.querySelector('i').classList.add('fa-eye');
                }
            }
        });
    });

    // Password Strength Checker
    const passwordInput = document.querySelector('#register-form input[type="password"]');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');

    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            let feedback = '';

            // Length check
            if (password.length >= 8) strength += 25;
            
            // Contains number
            if (/\d/.test(password)) strength += 25;
            
            // Contains lowercase
            if (/[a-z]/.test(password)) strength += 25;
            
            // Contains uppercase
            if (/[A-Z]/.test(password)) strength += 25;

            // Update strength bar
            strengthBar.style.width = strength + '%';

            // Update color based on strength
            if (strength <= 25) {
                strengthBar.style.backgroundColor = '#ff4444';
                feedback = 'ضعيفة جداً';
            } else if (strength <= 50) {
                strengthBar.style.backgroundColor = '#ffbb33';
                feedback = 'ضعيفة';
            } else if (strength <= 75) {
                strengthBar.style.backgroundColor = '#00C851';
                feedback = 'جيدة';
            } else {
                strengthBar.style.backgroundColor = '#007E33';
                feedback = 'قوية جداً';
            }

            strengthText.textContent = feedback;
        });
    }

    // Form Validation
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your login logic here
            console.log('Login form submitted');
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Password match validation
            const password = this.querySelector('input[type="password"]').value;
            const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;

            if (password !== confirmPassword) {
                alert('كلمات المرور غير متطابقة');
                return;
            }

            // Add your registration logic here
            console.log('Register form submitted');
        });
    }

    // Social Login Buttons
    const socialBtns = document.querySelectorAll('.social-btn');
    socialBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const platform = this.classList.contains('google') ? 'Google' : 'Facebook';
            console.log(`${platform} login clicked`);
            // Add your social login logic here
        });
    });

    // Language Toggle
    const langToggle = document.getElementById('lang-toggle');
    const backHomeText = document.getElementById('back-home-text');
    let isEnglish = false;

    const translations = {
        en: {
            loginTitle: 'Welcome Back',
            loginSubtitle: 'Sign in to access your account',
            loginBtn: 'Login',
            registerTitle: 'Create a New Account',
            registerSubtitle: 'Join us today and enjoy our services',
            registerBtn: 'Register',
            fullname: 'Full Name',
            email: 'Email',
            phone: 'Phone Number',
            password: 'Password',
            confirmPassword: 'Confirm Password',
            terms: 'I agree to the <a href="#">Terms & Conditions</a>',
            orLogin: 'or sign in with',
            orRegister: 'or register with',
            langBtn: 'العربية',
        },
        ar: {
            loginTitle: 'مرحباً بعودتك',
            loginSubtitle: 'سجل دخولك للوصول إلى حسابك',
            loginBtn: 'تسجيل الدخول',
            registerTitle: 'إنشاء حساب جديد',
            registerSubtitle: 'انضم إلينا اليوم واستمتع بخدماتنا',
            registerBtn: 'إنشاء حساب',
            fullname: 'الاسم الكامل',
            email: 'البريد الإلكتروني',
            phone: 'رقم الهاتف',
            password: 'كلمة المرور',
            confirmPassword: 'تأكيد كلمة المرور',
            terms: 'أوافق على <a href="#">الشروط والأحكام</a>',
            orLogin: 'أو سجل دخولك باستخدام',
            orRegister: 'أو أنشئ حسابك باستخدام',
            langBtn: 'English',
        },
        'back-home': {
            ar: 'العودة للرئيسية',
            en: 'Back to Home'
        }
    };

    function setLang(lang) {
        document.getElementById('login-title').textContent = translations[lang].loginTitle;
        document.getElementById('login-subtitle').textContent = translations[lang].loginSubtitle;
        document.getElementById('login-btn').querySelector('span').textContent = translations[lang].loginBtn;
        document.getElementById('register-title').textContent = translations[lang].registerTitle;
        document.getElementById('register-subtitle').textContent = translations[lang].registerSubtitle;
        document.getElementById('register-btn').querySelector('span').textContent = translations[lang].registerBtn;
        document.getElementById('register-fullname').placeholder = translations[lang].fullname;
        document.getElementById('register-email').placeholder = translations[lang].email;
        document.getElementById('register-phone').placeholder = translations[lang].phone;
        document.getElementById('register-password').placeholder = translations[lang].password;
        document.getElementById('register-confirm-password').placeholder = translations[lang].confirmPassword;
        document.getElementById('register-terms-label').innerHTML = `<input type="checkbox" required><span class="checkmark register-checkmark"></span> ${translations[lang].terms}`;
        document.getElementById('or-login').textContent = translations[lang].orLogin;
        document.getElementById('or-register').textContent = translations[lang].orRegister;
        langToggle.textContent = translations[lang].langBtn;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
        
        // Update back home button text
        backHomeText.textContent = translations['back-home'][lang];
    }

    if (langToggle) {
        langToggle.addEventListener('click', function(e) {
            e.preventDefault();
            isEnglish = !isEnglish;
            
            // Add animation class
            langToggle.classList.add('changing');
            
            // Remove animation class after animation completes
            setTimeout(() => {
                langToggle.classList.remove('changing');
            }, 300);
            
            setLang(isEnglish ? 'en' : 'ar');
        });
    }
    // Set default language
    setLang('en');
}); 