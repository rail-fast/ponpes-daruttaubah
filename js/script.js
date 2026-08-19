// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navbarMenu = document.querySelector('.navbar-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navbarMenu.style.display = navbarMenu.style.display === 'flex' ? 'none' : 'flex';
        hamburger.classList.toggle('active');
    });
}

// Close menu when a link is clicked
const navLinks = document.querySelectorAll('.navbar-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbarMenu.style.display = 'none';
        if (hamburger) {
            hamburger.classList.remove('active');
        }
    });
});

// Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nama = document.getElementById('nama').value;
        const email = document.getElementById('email').value;
        const pesan = document.getElementById('pesan').value;
        
        // Simple validation
        if (nama.trim() === '' || email.trim() === '' || pesan.trim() === '') {
            alert('Mohon isi semua field');
            return;
        }
        
        // Show success message
        alert(`Terima kasih, ${nama}! Pesan Anda telah kami terima. Kami akan menghubungi Anda segera.`);
        
        // Reset form
        contactForm.reset();
        
        // In real implementation, you would send this to a backend
        console.log('Form Data:', { nama, email, pesan });
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe program cards and guru cards
const cards = document.querySelectorAll('.program-card, .guru-card');
cards.forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = 'var(--shadow)';
    }
});

// Add animation to stat items
const statItems = document.querySelectorAll('.stat-item');
statItems.forEach((item, index) => {
    observer.observe(item);
});

// Counter animation for statistics
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('%') ? '%' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '%' : '');
        }
    }, 16);
}

// Initialize counter animation when stat section is visible
const statsSection = document.querySelector('.statistik');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const h3Elements = entry.target.querySelectorAll('h3');
                h3Elements.forEach(h3 => {
                    const text = h3.textContent;
                    const number = parseInt(text);
                    if (!isNaN(number)) {
                        animateCounter(h3, number);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navbarMenu) {
        navbarMenu.style.display = 'none';
        if (hamburger) {
            hamburger.classList.remove('active');
        }
    }
});