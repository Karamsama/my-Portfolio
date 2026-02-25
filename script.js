// Initialize EmailJS (you need to add your credentials)
// Get your credentials from: https://www.emailjs.com/
// 1. Sign up at emailjs.com
// 2. Add an email service (Gmail, Outlook, etc.)
// 3. Create an email template
// 4. Get your Public Key, Service ID, and Template ID
// 5. Replace the values below

const EMAILJS_PUBLIC_KEY = 'Huusjtx6Np0vhqciw'; // Replace with your public key
const EMAILJS_SERVICE_ID = 'service_fjk1t2p'; // Replace with your service ID
const EMAILJS_TEMPLATE_ID = 'template_ponk3uo'; // Replace with your template ID

// Initialize EmailJS
if (EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const submitBtn = this.querySelector('button[type="submit"]');
    
    // Check if EmailJS is configured
    if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
        alert('Please configure EmailJS credentials in script.js to enable email functionality.\n\nVisit: https://www.emailjs.com/');
        return;
    }
    
    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
    
    // Add timeout to prevent hanging
    const timeoutId = setTimeout(() => {
        alert('Request is taking longer than expected. Please check your internet connection or try again.');
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message';
    }, 10000); // 10 second timeout
    
    // Send email using EmailJS
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
        to_name: 'Your Name', // Replace with your name
    })
    .then(function(response) {
        // Clear timeout
        clearTimeout(timeoutId);
        // Success
        alert(`Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon.`);
        document.getElementById('contactForm').reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message';
    })
    .catch(function(error) {
        // Clear timeout
        clearTimeout(timeoutId);
        // Error
        alert('Oops! Something went wrong. Please check:\n- Your EmailJS credentials are correct\n- Your internet connection\n- EmailJS service is active\n\nError: ' + (error.text || error.message || 'Unknown error'));
        console.error('EmailJS Error:', error);
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message';
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .skill-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
