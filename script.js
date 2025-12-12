// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');
const typedText = document.getElementById('typed-text');
const contactForm = document.getElementById('contact-form');
const yearSpan = document.getElementById('year');

// ===== Constants =====
const CONTACT_EMAIL = 'prit.kudale@gmail.com';

// ===== Set Current Year =====
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// ===== Typing Animation (Hero) =====
const titles = [
    'AI/ML Engineer',
    'GenAI Research Specialist',
    'LLM Systems Builder',
    'Computer Vision Engineer'
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    if (!typedText) return;

    const currentTitle = titles[titleIndex];

    if (isDeleting) {
        typedText.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 45;
    } else {
        typedText.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 85;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
        isDeleting = true;
        typingSpeed = 1600; // Pause before deleting
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typingSpeed = 450; // Pause before typing next
    }

    setTimeout(typeEffect, typingSpeed);
}

// Start typing animation
setTimeout(typeEffect, 900);

// ===== Navbar Scroll Effect =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 110;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (!sectionId) return;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

function handleScroll() {
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    if (backToTop) {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    updateActiveNavLink();
    reveal();
}

window.addEventListener('scroll', handleScroll);

// ===== Mobile Menu Toggle =====
function toggleMenu(forceState) {
    if (!hamburger || !navMenu) return;

    const shouldOpen = typeof forceState === 'boolean' ? forceState : !navMenu.classList.contains('active');

    hamburger.classList.toggle('active', shouldOpen);
    navMenu.classList.toggle('active', shouldOpen);
    document.body.style.overflow = shouldOpen ? 'hidden' : '';
}

if (hamburger) {
    hamburger.addEventListener('click', () => toggleMenu());
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });
}

// Close menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
});

// ===== Smooth Scroll (in-page anchors) =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// ===== Stats Counter Animation (About) =====
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');

    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'), 10);
        if (Number.isNaN(target)) return;

        const duration = 1800;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCount = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.ceil(current);
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = String(target);
            }
        };

        updateCount();
    });
}

// ===== Intersection Observer =====
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        if (entry.target.classList.contains('about')) {
            animateStats();
        }

        entry.target.classList.add('animated');
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('.section').forEach(section => observer.observe(section));

// ===== Contact Form Handling (mailto for static hosting) =====
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        const name = (formData.get('name') || '').toString().trim();
        const email = (formData.get('email') || '').toString().trim();
        const subject = (formData.get('subject') || 'Portfolio inquiry').toString().trim();
        const message = (formData.get('message') || '').toString().trim();

        const body = `Hi Pritam,\n\n${message}\n\n— ${name}\n${email}`;

        const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailto;

        this.reset();
    });
}

// ===== Parallax Effect for Hero Section =====
document.addEventListener('mousemove', (e) => {
    const heroBlob = document.querySelector('.hero-blob');
    const heroAvatar = document.querySelector('.hero-avatar');

    if (heroBlob && heroAvatar) {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        heroBlob.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        heroAvatar.style.transform = `translate(calc(-50% + ${-x * 0.5}px), calc(-50% + ${-y * 0.5}px))`;
    }
});

// ===== Staggered Reveal (cards & contact items) =====
function setStaggeredDelays(containerSelector, itemSelector, step = 0.08, max = 0.4) {
    document.querySelectorAll(containerSelector).forEach(container => {
        const items = container.querySelectorAll(itemSelector);
        items.forEach((el, idx) => {
            const delay = Math.min((idx + 1) * step, max);
            el.style.transitionDelay = `${delay}s`;
        });
    });
}

function initRevealDelays() {
    setStaggeredDelays('.skills-grid', '.skill-card', 0.08, 0.5);
    setStaggeredDelays('.experience-grid', '.experience-card', 0.08, 0.5);
    setStaggeredDelays('.projects-grid', '.project-card', 0.08, 0.5);
    setStaggeredDelays('.credentials-grid', '.credential-card', 0.08, 0.5);
    setStaggeredDelays('.contact-info', '.contact-item', 0.06, 0.3);
}

function reveal() {
    const reveals = document.querySelectorAll(
        '.skill-card, .project-card, .experience-card, .credential-card, .contact-item'
    );

    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// ===== Initial Load =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    initRevealDelays();
    reveal();
    handleScroll();
});
