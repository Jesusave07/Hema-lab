// Funcionalidad del menú móvil
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const header = document.getElementById('header');

// Toggle del menú móvil
mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    
    if (mobileNav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Cerrar menú móvil al hacer click en un enlace
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Efecto de scroll en el header
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scroll para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animaciones al hacer scroll (Intersection Observer)
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

// Observar elementos para animaciones
const animatedElements = document.querySelectorAll('.feature-card, .service-card, .location-card, .contact-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Actualizar año actual en el footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Efecto parallax suave en el hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Contador animado para los años de experiencia (opcional)
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
};

// Activar contador cuando sea visible
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target.querySelector('.counter');
            if (counter && !counter.classList.contains('animated')) {
                counter.classList.add('animated');
                animateCounter(counter, 15);
            }
        }
    });
}, { threshold: 0.5 });

// Buscar elementos con contador (si los hay)
const counterElements = document.querySelectorAll('.feature-card');
counterElements.forEach(el => {
    if (el.textContent.includes('15 Años')) {
        const title = el.querySelector('h3');
        if (title) {
            title.innerHTML = title.innerHTML.replace('15', '<span class="counter">0</span>');
            counterObserver.observe(el);
        }
    }
});

// Efecto de typing para el título principal (opcional)
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.textContent = '';
    
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
};

// Activar efecto typing cuando la página carga
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        // Comentado para mantener el diseño original
        // typeWriter(heroTitle, originalText, 50);
    }
});

// Lazy loading para imágenes
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
});

// Observar todas las imágenes
document.querySelectorAll('img').forEach(img => {
    imageObserver.observe(img);
});

// Efecto de hover mejorado para las tarjetas
document.querySelectorAll('.feature-card, .service-card, .location-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Validación y mejora de accesibilidad
document.addEventListener('DOMContentLoaded', () => {
    // Agregar atributos de accesibilidad
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        if (btn.href && btn.href.includes('tel:')) {
            btn.setAttribute('aria-label', 'Llamar por teléfono');
        } else if (btn.href && btn.href.includes('wa.me')) {
            btn.setAttribute('aria-label', 'Contactar por WhatsApp');
        } else if (btn.href && btn.href.includes('instagram')) {
            btn.setAttribute('aria-label', 'Seguir en Instagram');
        } else if (btn.href && btn.href.includes('mailto:')) {
            btn.setAttribute('aria-label', 'Enviar correo electrónico');
        }
    });
    
    // Mejorar navegación por teclado
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    focusableElements.forEach(el => {
        el.addEventListener('focus', function() {
            this.style.outline = '2px solid #247AC9';
            this.style.outlineOffset = '2px';
        });
        
        el.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
});

// Preloader simple (opcional)
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animar elementos iniciales
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-text > *');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 300);
});

// Optimización de rendimiento: throttle para eventos de scroll
const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
};

// Aplicar throttle a eventos de scroll costosos
const throttledScrollHandler = throttle(() => {
    // Aquí van los handlers de scroll que necesiten optimización
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);