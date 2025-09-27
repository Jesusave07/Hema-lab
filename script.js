// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');

    mobileMenuBtn.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.nav-link-mobile');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements and observe them
    const animatedElements = document.querySelectorAll('.service-card, .contact-card, .section-header');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Header background change on scroll
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'white';
            header.style.backdropFilter = 'none';
        }
        
        lastScrollTop = scrollTop;
    });

    // WhatsApp contact functionality
    function openWhatsApp() {
        const phoneNumber = '584162760870';
        const message = encodeURIComponent('Hola, me gustaría agendar una cita en HemaLab.');
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(whatsappURL, '_blank');
    }

    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Contact card interactions
    const contactButtons = document.querySelectorAll('.contact-button');
    contactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const mapUrl = e.target.dataset.mapUrl;
            if (mapUrl) {
                window.open(mapUrl, '_blank');
            } else {
                alert('Funcionalidad de mapa próximamente disponible');
            }
        });
    });

    // Social media links
    const socialIcons = document.querySelectorAll('.social-icon, .footer-social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            const action = e.target.dataset.action;
            if (action === 'whatsapp') {
                openWhatsApp();
            } else if (action === 'instagram') {
                window.open('https://www.instagram.com/laboratorio_hemalab?igsh=d2xjeGY5eTNmaGd6', '_blank');
            }
        });
    });

    // Hero Slideshow
    const slides = document.querySelectorAll('.hero .slide');
    const blinds = document.querySelector('.blinds-transition');
    let currentSlide = 0;
    let isAnimating = false;

    function nextSlide() {
        if (isAnimating) return; // Prevent animation overlap
        isAnimating = true;

        // Trigger blinds animation
        blinds.classList.add('active');

        // Set delays for each blind
        const blindElements = blinds.querySelectorAll('.blind');
        blindElements.forEach((blind, i) => {
            blind.style.animationDelay = `${i * 0.06}s`;
        });

        // Change the slide behind the animation
        setTimeout(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 600); // Half of the animation duration

        // Reset animation after it finishes
        setTimeout(() => {
            blinds.classList.remove('active');
            blindElements.forEach(blind => blind.style.animationDelay = '0s');
            isAnimating = false;
        }, 1500); // A bit longer than the animation
    }

    setInterval(nextSlide, 5000); // Increased interval for the new animation

    // Loading animation
    window.addEventListener('load', function() {
        // Animate hero content
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            setTimeout(() => {
                heroContent.classList.add('fade-in');
                heroContent.classList.add('visible');
            }, 100); // Small delay to ensure transition is applied
        }
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.faq-item.active');
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }
            item.classList.toggle('active');
        });
    });
});