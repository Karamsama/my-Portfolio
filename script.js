const EMAILJS_PUBLIC_KEY = 'Huusjtx6Np0vhqciw'; 
const EMAILJS_SERVICE_ID = 'service_fjk1t2p'; 
const EMAILJS_TEMPLATE_ID = 'template_ponk3uo'; 

if (EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
}


document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            new bootstrap.Collapse(navbarCollapse).hide();
        }
    });
});

// Contact form
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const submitBtn = this.querySelector('button[type="submit"]');
    
    if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
        alert('Please configure EmailJS credentials in script.js to enable email functionality.\n\nVisit: https://www.emailjs.com/');
        return;
    }
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
    
    const timeoutId = setTimeout(() => {
        alert('Request is taking longer than expected. Please check your internet connection or try again.');
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message';
    }, 10000);

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
        to_name: 'Karam', 
    })
    .then(function(response) {
        clearTimeout(timeoutId);
        alert(`Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon.`);
        document.getElementById('contactForm').reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message';
    })
    .catch(function(error) {
        clearTimeout(timeoutId);
        alert('Oops! Something went wrong. Please check:\n- Your EmailJS credentials are correct\n- Your internet connection\n- EmailJS service is active\n\nError: ' + (error.text || error.message || 'Unknown error'));
        console.error('EmailJS Error:', error);
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message';
    });
});

// Scroll animation for project cards and skill items
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.project-card, .skill-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
