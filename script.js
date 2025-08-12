// Navegación responsive
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    // Inicializar tema basado en preferencia del sistema
    initTheme();

    // Toggle del menú móvil
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Toggle del tema
    themeToggle.addEventListener('click', function() {
        toggleTheme();
    });

    function initTheme() {
        // Verificar si hay una preferencia guardada
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme) {
            // Usar tema guardado
            setTheme(savedTheme);
        } else {
            // Usar preferencia del sistema
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const systemTheme = systemPrefersDark ? 'dark' : 'light';
            setTheme(systemTheme);
        }
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        updateThemeIcon(theme);
        updateNavbarTheme(theme); // Actualizar navbar inmediatamente
        localStorage.setItem('theme', theme);
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        
        // Animación del botón
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
    }

    function updateNavbarTheme(theme) {
        const navbar = document.querySelector('.navbar');
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            if (theme === 'dark') {
                navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            }
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            if (theme === 'dark') {
                navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
            navbar.style.boxShadow = 'none';
        }
    }

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }

    // Escuchar cambios en preferencias del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        // Solo actualizar si no hay preferencia guardada manualmente
        if (!localStorage.getItem('theme')) {
            const systemTheme = e.matches ? 'dark' : 'light';
            setTheme(systemTheme);
        }
    });

    // Toggle del menú móvil
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling para los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Ajuste para la navbar fija
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight del enlace activo en navegación
    function highlightActiveLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Agregar clase a navbar en scroll
    function handleNavbarScroll() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        updateNavbarTheme(currentTheme);
    }

    // Event listeners para scroll
    window.addEventListener('scroll', function() {
        highlightActiveLink();
        handleNavbarScroll();
        animateOnScroll();
    });

    // Animaciones al hacer scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.tech-category, .project-card, .timeline-item, .about-text');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Inicializar animaciones
    function initAnimations() {
        const elements = document.querySelectorAll('.tech-category, .project-card, .timeline-item, .about-text');
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease-out';
        });
    }

    // Formulario de contacto
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí puedes agregar la lógica para enviar el formulario
            // Por ejemplo, usando EmailJS o una API
            
            // Simulación de envío exitoso
            const button = this.querySelector('button');
            const originalText = button.textContent;
            
            button.textContent = 'Enviando...';
            button.disabled = true;
            
            setTimeout(() => {
                button.textContent = '¡Mensaje Enviado!';
                button.style.background = '#10b981';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.background = '';
                    this.reset();
                }, 2000);
            }, 1000);
        });
    }

    // Efectos de hover mejorados para las tarjetas de tecnología
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Efecto de typing para el título principal
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Contador animado para estadísticas (si decides agregarlo)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }

    // Intersection Observer para animaciones más precisas
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observar elementos para animaciones
    const animatedElements = document.querySelectorAll('.tech-category, .project-card, .timeline-item');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Inicializar
    initAnimations();
    highlightActiveLink();
    handleNavbarScroll(); // Inicializar navbar con el tema correcto

    // Efecto parallax sutil para el hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-image');
        
        parallaxElements.forEach(element => {
            const speed = 0.2; // Reducido de 0.5 a 0.2 para menos movimiento
            const maxOffset = 100; // Límite máximo de desplazamiento en píxeles
            const offset = Math.min(scrolled * speed, maxOffset);
            element.style.transform = `translateY(${offset}px)`;
        });
    });

    // Preloader simple (opcional)
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Lazy loading para imágenes (cuando agregues imágenes reales)
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    // Inicializar funciones adicionales
    lazyLoadImages();
});

// Función para copiar email al clipboard
function copyEmail() {
    const email = 'tu.email@ejemplo.com';
    navigator.clipboard.writeText(email).then(function() {
        // Mostrar notificación de copiado
        showNotification('Email copiado al portapapeles');
    });
}

// Sistema de notificaciones simple
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animar salida
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Función para manejar el redimensionado de ventana
window.addEventListener('resize', function() {
    // Cerrar menú móvil si se redimensiona a desktop
    if (window.innerWidth > 768) {
        document.querySelector('.hamburger').classList.remove('active');
        document.querySelector('.nav-menu').classList.remove('active');
    }
});

// Prevenir el comportamiento por defecto en enlaces vacíos
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href="#"]')) {
        e.preventDefault();
    }
});
