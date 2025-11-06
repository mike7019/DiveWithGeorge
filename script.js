// Dive With George - JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== MOBILE MENU ====================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
    
    // ==================== NAVBAR SCROLL EFFECT ====================
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow when scrolled
        if (scrollTop > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // ==================== SMOOTH SCROLLING FOR ANCHOR LINKS ====================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just '#'
            if (href === '#' || href === '#home') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ==================== ACTIVE NAV LINK HIGHLIGHTING ====================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    function highlightActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('text-ocean-600', 'font-bold');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('text-ocean-600', 'font-bold');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveNavLink);
    
    // ==================== CONTACT FORM HANDLING ====================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Validate form
            if (!name || !email || !message) {
                showNotification('Por favor, completa todos los campos requeridos.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Por favor, ingresa un email válido.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'ENVIANDO...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Show success message
                showNotification('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.', 'success');
            }, 2000);
        });
    }
    
    // ==================== EMAIL VALIDATION ====================
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // ==================== NOTIFICATION SYSTEM ====================
    function showNotification(message, type = 'info') {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification fixed top-24 right-4 md:right-8 max-w-md p-4 rounded-lg shadow-2xl z-50 transform translate-x-full transition-transform duration-500 ${
            type === 'success' ? 'bg-green-500' : 
            type === 'error' ? 'bg-red-500' : 
            'bg-blue-500'
        } text-white`;
        
        notification.innerHTML = `
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} text-2xl mr-3"></i>
                    <p class="font-medium">${message}</p>
                </div>
                <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Slide in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 5000);
    }
    
    // ==================== COOKIE BANNER ====================
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptCookiesBtn = document.getElementById('acceptCookies');
    
    // Check if cookies were already accepted
    if (localStorage.getItem('cookiesAccepted') === 'true') {
        cookieBanner.classList.add('cookie-banner-hidden');
    }
    
    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.classList.add('cookie-banner-hidden');
            
            setTimeout(() => {
                cookieBanner.style.display = 'none';
            }, 500);
        });
    }
    
    // ==================== SCROLL TO TOP BUTTON ====================
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });
        
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ==================== SCROLL ANIMATIONS - OPTIMIZADO ====================
    const observerOptions = {
        threshold: 0.05, // Reducido para activación más rápida
        rootMargin: '0px 0px -20px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections
    sections.forEach(section => {
        if (!section.classList.contains('hero-section')) {
            observer.observe(section);
        }
    });
    
    // ==================== PARALLAX EFFECT - REMOVIDO PARA MEJOR PERFORMANCE ====================
    // El efecto parallax ha sido deshabilitado para mejorar el rendimiento del scroll
    
    // ==================== LAZY LOADING IMAGES ====================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img.lazy');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // ==================== PREVENT FORM DOUBLE SUBMISSION ====================
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                setTimeout(() => {
                    submitBtn.disabled = false;
                }, 3000);
            }
        });
    });
    
    // ==================== KEYBOARD ACCESSIBILITY ====================
    document.addEventListener('keydown', function(e) {
        // ESC key to close mobile menu
        if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // ==================== PHONE NUMBER FORMATTING ====================
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Track phone call clicks (you can add analytics here)
            console.log('Phone number clicked:', this.getAttribute('href'));
        });
    });
    
    // ==================== CONSOLE MESSAGE ====================
    console.log('%c🌊 Dive With George 🌊', 'color: #1890ff; font-size: 24px; font-weight: bold;');
    console.log('%cExplore Cozumel\'s Underwater Wonders!', 'color: #096dd9; font-size: 16px;');
    console.log('%cWebsite developed with ❤️ using Tailwind CSS', 'color: #666; font-size: 12px;');
    
    // ==================== PERFORMANCE OPTIMIZATION ====================
    // Debounce function for scroll events - OPTIMIZADO
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Throttle para eventos de scroll más eficiente
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Apply throttle to scroll-heavy functions (reducido el debounce)
    const optimizedScroll = throttle(function() {
        // Scroll operations optimizadas
    }, 50);
    
    window.addEventListener('scroll', optimizedScroll, { passive: true });
    
});

// ==================== EXTERNAL LINK HANDLING ====================
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.hostname !== window.location.hostname) {
        // External link - could add confirmation or tracking
        console.log('External link clicked:', e.target.href);
    }
});

// ==================== SERVICE WORKER (for PWA - optional) ====================
if ('serviceWorker' in navigator) {
    // Uncomment to enable service worker
    /*
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful');
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
    */
}

// ==================== UTILITY FUNCTIONS ====================

// Format phone number
function formatPhoneNumber(phoneNumber) {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '+' + match[1] + '.' + match[2] + '.' + match[3] + '.' + match[4];
    }
    return phoneNumber;
}

// Get current time in Cozumel timezone
function getCozumelTime() {
    return new Date().toLocaleString('es-MX', {
        timeZone: 'America/Cancun',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Check if business is open
function isBusinessOpen() {
    const now = new Date();
    const cozumelTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Cancun' }));
    const hours = cozumelTime.getHours();
    const minutes = cozumelTime.getMinutes();
    const currentTime = hours * 60 + minutes;
    
    const openTime = 9 * 60; // 9:00 AM
    const closeTime = 17 * 60; // 5:00 PM
    
    return currentTime >= openTime && currentTime < closeTime;
}

// Display business hours status
function updateBusinessHoursStatus() {
    const hoursElement = document.querySelector('.business-hours-status');
    if (hoursElement) {
        const isOpen = isBusinessOpen();
        hoursElement.textContent = isOpen ? 'Abierto ahora' : 'Cerrado';
        hoursElement.className = `business-hours-status ${isOpen ? 'text-green-600' : 'text-red-600'} font-semibold`;
    }
}

// Call on load if element exists
if (document.querySelector('.business-hours-status')) {
    updateBusinessHoursStatus();
    // Update every minute
    setInterval(updateBusinessHoursStatus, 60000);
}

// ==================== GALLERY LIGHTBOX ====================
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeLightbox = document.getElementById('closeLightbox');
    const prevImage = document.getElementById('prevImage');
    const nextImage = document.getElementById('nextImage');
    
    let currentImageIndex = 0;
    
    // Gallery data
    const galleryData = [
        {
            src: 'img/fernando-jorge-948Dftugtxo-unsplash.jpg',
            title: 'Underwater Paradise',
            caption: 'Exploring the depths of Cozumel'
        },
        {
            src: 'img/pexels-chris-spain-1559126760-27758101.jpg',
            title: 'Marine Wonders',
            caption: 'Discover vibrant sea life'
        },
        {
            src: 'img/pexels-francesco-ungaro-3420262.jpg',
            title: 'Crystal Waters',
            caption: 'Pure beauty beneath the surface'
        },
        {
            src: 'img/pexels-pspov-3046629.jpg',
            title: 'Diving Adventure',
            caption: 'Unforgettable experiences await'
        }
    ];
    
    // Open lightbox when clicking on gallery item
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentImageIndex = index;
            openLightbox();
        });
    });
    
    // Open lightbox function
    function openLightbox() {
        const imageData = galleryData[currentImageIndex];
        lightboxImage.src = imageData.src;
        lightboxImage.alt = imageData.title;
        lightboxCaption.textContent = `${imageData.title} - ${imageData.caption}`;
        lightbox.classList.remove('hidden');
        lightbox.classList.add('flex');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    // Close lightbox function
    function closeLightboxFunc() {
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Close button click
    if (closeLightbox) {
        closeLightbox.addEventListener('click', closeLightboxFunc);
    }
    
    // Close on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightboxFunc();
        }
    });
    
    // Previous image
    if (prevImage) {
        prevImage.addEventListener('click', function(e) {
            e.stopPropagation();
            currentImageIndex = (currentImageIndex - 1 + galleryData.length) % galleryData.length;
            updateLightboxImage();
        });
    }
    
    // Next image
    if (nextImage) {
        nextImage.addEventListener('click', function(e) {
            e.stopPropagation();
            currentImageIndex = (currentImageIndex + 1) % galleryData.length;
            updateLightboxImage();
        });
    }
    
    // Update lightbox image
    function updateLightboxImage() {
        const imageData = galleryData[currentImageIndex];
        
        // Add fade effect
        lightboxImage.style.opacity = '0';
        
        setTimeout(() => {
            lightboxImage.src = imageData.src;
            lightboxImage.alt = imageData.title;
            lightboxCaption.textContent = `${imageData.title} - ${imageData.caption}`;
            lightboxImage.style.opacity = '1';
        }, 200);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('hidden')) {
            if (e.key === 'Escape') {
                closeLightboxFunc();
            } else if (e.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex - 1 + galleryData.length) % galleryData.length;
                updateLightboxImage();
            } else if (e.key === 'ArrowRight') {
                currentImageIndex = (currentImageIndex + 1) % galleryData.length;
                updateLightboxImage();
            }
        }
    });
    
    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    lightbox.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    lightbox.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - next image
            currentImageIndex = (currentImageIndex + 1) % galleryData.length;
            updateLightboxImage();
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - previous image
            currentImageIndex = (currentImageIndex - 1 + galleryData.length) % galleryData.length;
            updateLightboxImage();
        }
    }
    
    // Preload images for better performance
    function preloadImages() {
        galleryData.forEach(data => {
            const img = new Image();
            img.src = data.src;
        });
    }
    
    preloadImages();
});

// Language Selector Toggle
document.addEventListener('DOMContentLoaded', function() {
    const languageBtn = document.getElementById('languageBtn');
    const languageMenu = document.getElementById('languageMenu');
    
    if (languageBtn && languageMenu) {
        languageBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            languageMenu.classList.toggle('hidden');
        });
        
        // Close language menu when clicking outside
        document.addEventListener('click', function() {
            if (!languageMenu.classList.contains('hidden')) {
                languageMenu.classList.add('hidden');
            }
        });
        
        languageMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
});

// Translation functionality
const translations = {
    en: {
        // Navigation
        'Home': 'Home',
        'About': 'About',
        'Services': 'Services',
        'Gallery': 'Gallery',
        'Contact': 'Contact',
        'Call Now': 'Call Now',
        
        // Cookie Banner
        'This website uses cookies': 'This website uses cookies',
        'We use cookies to analyze website traffic and optimize your experience on the site. By accepting our use of cookies, your data will be aggregated with all other user data.': 'We use cookies to analyze website traffic and optimize your experience on the site. By accepting our use of cookies, your data will be aggregated with all other user data.',
        'ACCEPT': 'ACCEPT',
        
        // Services Section
        'Hello': 'Hello',
        'Welcome to Dive With George - Dive into Adventure': 'Welcome to Dive With George - Dive into Adventure',
        'Discover the beauty of Cozumel with Dive With George. Join us for unforgettable scuba and free diving experiences. Explore vibrant reefs, incredible marine life, and thrilling wrecks. Safety is our top priority. Let\'s create memories beneath the waves!': 'Discover the beauty of Cozumel with Dive With George. Join us for unforgettable scuba and free diving experiences. Explore vibrant reefs, incredible marine life, and thrilling wrecks. Safety is our top priority. Let\'s create memories beneath the waves!',
        'Scuba Diving': 'Scuba Diving',
        'Explore the depths of Cozumel\'s crystal-clear waters with our professional scuba diving services.': 'Explore the depths of Cozumel\'s crystal-clear waters with our professional scuba diving services.',
        'Snorkeling': 'Snorkeling',
        'Enjoy the beauty of marine life near the surface with our safe and exciting snorkeling experiences.': 'Enjoy the beauty of marine life near the surface with our safe and exciting snorkeling experiences.',
        'Professional Guides': 'Professional Guides',
        'Our experienced instructors ensure your safety while delivering an unforgettable underwater adventure.': 'Our experienced instructors ensure your safety while delivering an unforgettable underwater adventure.',
        'Click to learn history': 'Click to learn history',
        'Click to return': 'Click to return',
        'GET MORE INFO': 'GET MORE INFO',
        
        // History Cards
        'Cozumel History': 'Cozumel History',
        'The Maya considered Cozumel sacred, dedicated to Ixchel, goddess of fertility. Mayan women would pilgrimage to the island to receive blessings. Today, its reefs are a world heritage for diving.': 'The Maya considered Cozumel sacred, dedicated to Ixchel, goddess of fertility. Mayan women would pilgrimage to the island to receive blessings. Today, its reefs are a world heritage for diving.',
        'Palancar Reef': 'Palancar Reef',
        'Jacques Cousteau visited Cozumel in 1961 and declared its reefs among the most beautiful in the world. The Palancar Reef became world-famous, attracting divers from every continent.': 'Jacques Cousteau visited Cozumel in 1961 and declared its reefs among the most beautiful in the world. The Palancar Reef became world-famous, attracting divers from every continent.',
        'Underwater Heritage': 'Underwater Heritage',
        'During World War II, German submarines patrolled these waters. Today, Cozumel hosts the MUSA Underwater Museum, with over 500 sculptures that merge art, conservation, and history.': 'During World War II, German submarines patrolled these waters. Today, Cozumel hosts the MUSA Underwater Museum, with over 500 sculptures that merge art, conservation, and history.',
        
        // Welcome Section
        'Welcome': 'Welcome',
        'There\'s so much to see here. So, take your time, look around, and learn all there is to know about us. We hope you enjoy our website and take a moment to drop us a line.': 'There\'s so much to see here. So, take your time, look around, and learn all there is to know about us. We hope you enjoy our website and take a moment to drop us a line.',
        
        // Gallery Section
        'Captured Moments': 'Captured Moments',
        'Discover the underwater beauty of Cozumel through our images. Each photo tells a story of adventure and wonder beneath the waves.': 'Discover the underwater beauty of Cozumel through our images. Each photo tells a story of adventure and wonder beneath the waves.',
        
        // Contact Section
        'Contact Us': 'Contact Us',
        'Drop us a line!': 'Drop us a line!',
        'Name': 'Name',
        'Email*': 'Email*',
        'Message': 'Message',
        'SEND': 'SEND',
        'This site is protected by reCAPTCHA and the Google': 'This site is protected by reCAPTCHA and the Google',
        'Privacy Policy': 'Privacy Policy',
        'and': 'and',
        'Terms of Service': 'Terms of Service',
        'apply.': 'apply.',
        
        // Join Us Section
        'Join Us': 'Join Us',
        'This Is Your Vacation - Let It Be a Tale to Tell!!': 'This Is Your Vacation - Let It Be a Tale to Tell!!',
        'Our mission is your safety first so your experience is to be told for many years of the magic kingdom George will guide you to paradise in Cozumel!!': 'Our mission is your safety first so your experience is to be told for many years of the magic kingdom George will guide you to paradise in Cozumel!!',
        'DONATE': 'DONATE',
        
        // Footer
        'All rights reserved.': 'All rights reserved.',
        'Powered by': 'Powered by'
    },
    es: {
        // Navigation
        'Home': 'Inicio',
        'About': 'Acerca de',
        'Services': 'Servicios',
        'Gallery': 'Galería',
        'Contact': 'Contacto',
        'Call Now': 'Llamar',
        
        // Cookie Banner
        'This website uses cookies': 'Este sitio web utiliza cookies',
        'We use cookies to analyze website traffic and optimize your experience on the site. By accepting our use of cookies, your data will be aggregated with all other user data.': 'Usamos cookies para analizar el tráfico del sitio web y optimizar tu experiencia. Al aceptar nuestro uso de cookies, tus datos se agruparán con los de todos los demás usuarios.',
        'ACCEPT': 'ACEPTAR',
        
        // Hero Section
        'Explore Cozumel\'s Underwater Wonders': 'Explora las Maravillas Submarinas de Cozumel',
        'Experience safe SNORKELING and DIVING with stunning marine life!': '¡Experimenta SNORKEL y BUCEO seguros con una vida marina impresionante!',
        'BOOK YOUR DIVE': 'RESERVA TU BUCEO',
        'SNORKELING': 'SNORKEL',
        'DIVING': 'BUCEO',
        
        // Mission Section
        'Dive With George': 'Dive With George',
        'Our Mission': 'Nuestra Misión',
        'At Dive With George, our mission is to provide the best scuba and free diving experience possible. We aim to offer top-quality equipment and highly skilled instructors to ensure your safety and enjoyment in the water.': 'En Dive With George, nuestra misión es proporcionar la mejor experiencia de buceo posible. Nuestro objetivo es ofrecer equipos de primera calidad e instructores altamente capacitados para garantizar tu seguridad y disfrute en el agua.',
        
        // About Section
        'Welcome to Dive With George': 'Bienvenido a Dive With George',
        'Explore the vibrant underwater world of Cozumel with Dive With George. We offer exceptional scuba and free diving experiences, showcasing stunning marine life and thrilling wrecks. Safety is our priority, ensuring you enjoy every moment beneath the waves.': 'Explora el vibrante mundo submarino de Cozumel con Dive With George. Ofrecemos experiencias excepcionales de buceo, mostrando una vida marina impresionante y emocionantes naufragios. La seguridad es nuestra prioridad, asegurando que disfrutes cada momento bajo las olas.',
        'PAY NOW': 'PAGAR AHORA',
        'Dive into Adventure': 'Sumérgete en la Aventura',
        'Discover the beauty beneath the waves with expert guidance and top-quality equipment.': 'Descubre la belleza bajo las olas con orientación experta y equipos de primera calidad.',
        
        // Services Section
        'Hello': 'Hola',
        'Welcome to Dive With George - Dive into Adventure': 'Bienvenido a Dive With George - Sumérgete en la Aventura',
        'Discover the beauty of Cozumel with Dive With George. Join us for unforgettable scuba and free diving experiences. Explore vibrant reefs, incredible marine life, and thrilling wrecks. Safety is our top priority. Let\'s create memories beneath the waves!': 'Descubre la belleza de Cozumel con Dive With George. Únete a nosotros para experiencias inolvidables de buceo. Explora arrecifes vibrantes, vida marina increíble y emocionantes naufragios. La seguridad es nuestra prioridad. ¡Creemos recuerdos bajo las olas!',
        'Scuba Diving': 'Buceo',
        'Explore the depths of Cozumel\'s crystal-clear waters with our professional scuba diving services.': 'Explora las profundidades de las aguas cristalinas de Cozumel con nuestros servicios profesionales de buceo.',
        'Snorkeling': 'Snorkel',
        'Enjoy the beauty of marine life near the surface with our safe and exciting snorkeling experiences.': 'Disfruta de la belleza de la vida marina cerca de la superficie con nuestras experiencias seguras y emocionantes de snorkel.',
        'Professional Guides': 'Guías Profesionales',
        'Our experienced instructors ensure your safety while delivering an unforgettable underwater adventure.': 'Nuestros instructores experimentados garantizan tu seguridad mientras te brindan una aventura submarina inolvidable.',
        'Click to learn history': 'Click para conocer la historia',
        'Click to return': 'Click para volver',
        'GET MORE INFO': 'OBTÉN MÁS INFORMACIÓN',
        
        // History Cards
        'Cozumel History': 'Historia de Cozumel',
        'The Maya considered Cozumel sacred, dedicated to Ixchel, goddess of fertility. Mayan women would pilgrimage to the island to receive blessings. Today, its reefs are a world heritage for diving.': 'Los Mayas consideraban Cozumel sagrada, dedicada a Ixchel, diosa de la fertilidad. Las mujeres mayas peregrinaban a la isla para recibir bendiciones. Hoy, sus arrecifes son patrimonio mundial del buceo.',
        'Palancar Reef': 'Arrecife Palancar',
        'Jacques Cousteau visited Cozumel in 1961 and declared its reefs among the most beautiful in the world. The Palancar Reef became world-famous, attracting divers from every continent.': 'Jacques Cousteau visitó Cozumel en 1961 y declaró sus arrecifes entre los más hermosos del mundo. El Arrecife Palancar se hizo mundialmente famoso, atrayendo buzos de todos los continentes.',
        'Underwater Heritage': 'Patrimonio Submarino',
        'During World War II, German submarines patrolled these waters. Today, Cozumel hosts the MUSA Underwater Museum, with over 500 sculptures that merge art, conservation, and history.': 'Durante la Segunda Guerra Mundial, submarinos alemanes patrullaban estas aguas. Hoy, Cozumel alberga el Museo Subacuático MUSA, con más de 500 esculturas que fusionan arte, conservación e historia.',
        
        // Welcome Section
        'Welcome': 'Bienvenido',
        'There\'s so much to see here. So, take your time, look around, and learn all there is to know about us. We hope you enjoy our website and take a moment to drop us a line.': 'Hay mucho para ver aquí. Tómate tu tiempo, mira alrededor y entérate de todo lo que hay para saber sobre nosotros. Esperamos que disfrutes nuestro sitio web y te tomes un momento para dejarnos unas líneas.',
        
        // Gallery Section
        'Captured Moments': 'Momentos Capturados',
        'Discover the underwater beauty of Cozumel through our images. Each photo tells a story of adventure and wonder beneath the waves.': 'Descubre la belleza submarina de Cozumel a través de nuestras imágenes. Cada foto cuenta una historia de aventura y maravilla bajo las olas.',
        
        // Contact Section
        'Contact Us': 'Contáctanos',
        'Drop us a line!': '¡Déjanos un mensaje!',
        'Name': 'Nombre',
        'Email*': 'Correo*',
        'Message': 'Mensaje',
        'SEND': 'ENVIAR',
        'This site is protected by reCAPTCHA and the Google': 'Este sitio está protegido por reCAPTCHA y aplican las',
        'Privacy Policy': 'Política de privacidad',
        'and': 'y los',
        'Terms of Service': 'Términos de servicio',
        'apply.': 'de Google.',
        
        // Join Us Section
        'Join Us': 'Únete',
        'This Is Your Vacation - Let It Be a Tale to Tell!!': '¡Estas son tus vacaciones - Que sean una historia para contar!',
        'Our mission is your safety first so your experience is to be told for many years of the magic kingdom George will guide you to paradise in Cozumel!!': '¡Nuestra misión es tu seguridad primero para que tu experiencia se cuente por muchos años del reino mágico. George te guiará al paraíso en Cozumel!',
        'DONATE': 'DONAR',
        
        // Footer
        'All rights reserved.': 'Todos los derechos reservados.',
        'Powered by': 'Con tecnología de'
    },
    fr: {
        // Navigation
        'Home': 'Accueil',
        'About': 'À propos',
        'Services': 'Services',
        'Gallery': 'Galerie',
        'Contact': 'Contact',
        'Call Now': 'Appeler',
        
        // Cookie Banner
        'This website uses cookies': 'Ce site utilise des cookies',
        'We use cookies to analyze website traffic and optimize your experience on the site. By accepting our use of cookies, your data will be aggregated with all other user data.': 'Nous utilisons des cookies pour analyser le trafic du site et optimiser votre expérience. En acceptant notre utilisation des cookies, vos données seront agrégées avec celles de tous les autres utilisateurs.',
        'ACCEPT': 'ACCEPTER',
        
        // Hero Section
        'Explore Cozumel\'s Underwater Wonders': 'Explorez les Merveilles Sous-Marines de Cozumel',
        'Experience safe SNORKELING and DIVING with stunning marine life!': 'Vivez du SNORKELING et de la PLONGÉE en toute sécurité avec une vie marine époustouflante!',
        'BOOK YOUR DIVE': 'RÉSERVEZ VOTRE PLONGÉE',
        'SNORKELING': 'SNORKELING',
        'DIVING': 'PLONGÉE',
        
        // Mission Section
        'Dive With George': 'Dive With George',
        'Our Mission': 'Notre Mission',
        'At Dive With George, our mission is to provide the best scuba and free diving experience possible. We aim to offer top-quality equipment and highly skilled instructors to ensure your safety and enjoyment in the water.': 'Chez Dive With George, notre mission est de fournir la meilleure expérience de plongée possible. Nous visons à offrir un équipement de qualité supérieure et des instructeurs hautement qualifiés pour assurer votre sécurité et votre plaisir dans l\'eau.',
        
        // About Section
        'Welcome to Dive With George': 'Bienvenue chez Dive With George',
        'Explore the vibrant underwater world of Cozumel with Dive With George. We offer exceptional scuba and free diving experiences, showcasing stunning marine life and thrilling wrecks. Safety is our priority, ensuring you enjoy every moment beneath the waves.': 'Explorez le monde sous-marin vibrant de Cozumel avec Dive With George. Nous offrons des expériences exceptionnelles de plongée, présentant une vie marine époustouflante et des épaves passionnantes. La sécurité est notre priorité, garantissant que vous profitiez de chaque moment sous les vagues.',
        'PAY NOW': 'PAYER MAINTENANT',
        'Dive into Adventure': 'Plongez dans l\'Aventure',
        'Discover the beauty beneath the waves with expert guidance and top-quality equipment.': 'Découvrez la beauté sous les vagues avec des conseils d\'experts et un équipement de qualité supérieure.',
        
        // Services Section
        'Hello': 'Bonjour',
        'Welcome to Dive With George - Dive into Adventure': 'Bienvenue chez Dive With George - Plongez dans l\'Aventure',
        'Discover the beauty of Cozumel with Dive With George. Join us for unforgettable scuba and free diving experiences. Explore vibrant reefs, incredible marine life, and thrilling wrecks. Safety is our top priority. Let\'s create memories beneath the waves!': 'Découvrez la beauté de Cozumel avec Dive With George. Rejoignez-nous pour des expériences inoubliables de plongée. Explorez des récifs vibrants, une vie marine incroyable et des épaves passionnantes. La sécurité est notre priorité. Créons des souvenirs sous les vagues!',
        'Scuba Diving': 'Plongée Sous-Marine',
        'Explore the depths of Cozumel\'s crystal-clear waters with our professional scuba diving services.': 'Explorez les profondeurs des eaux cristallines de Cozumel avec nos services professionnels de plongée.',
        'Snorkeling': 'Snorkeling',
        'Enjoy the beauty of marine life near the surface with our safe and exciting snorkeling experiences.': 'Profitez de la beauté de la vie marine près de la surface avec nos expériences de snorkeling sûres et passionnantes.',
        'Professional Guides': 'Guides Professionnels',
        'Our experienced instructors ensure your safety while delivering an unforgettable underwater adventure.': 'Nos instructeurs expérimentés assurent votre sécurité tout en vous offrant une aventure sous-marine inoubliable.',
        'Click to learn history': 'Cliquez pour connaître l\'histoire',
        'Click to return': 'Cliquez pour revenir',
        'GET MORE INFO': 'PLUS D\'INFOS',
        
        // History Cards
        'Cozumel History': 'Histoire de Cozumel',
        'The Maya considered Cozumel sacred, dedicated to Ixchel, goddess of fertility. Mayan women would pilgrimage to the island to receive blessings. Today, its reefs are a world heritage for diving.': 'Les Mayas considéraient Cozumel comme sacrée, dédiée à Ixchel, déesse de la fertilité. Les femmes mayas faisaient un pèlerinage sur l\'île pour recevoir des bénédictions. Aujourd\'hui, ses récifs sont un patrimoine mondial de la plongée.',
        'Palancar Reef': 'Récif Palancar',
        'Jacques Cousteau visited Cozumel in 1961 and declared its reefs among the most beautiful in the world. The Palancar Reef became world-famous, attracting divers from every continent.': 'Jacques Cousteau a visité Cozumel en 1961 et a déclaré ses récifs parmi les plus beaux du monde. Le récif Palancar est devenu mondialement célèbre, attirant des plongeurs de tous les continents.',
        'Underwater Heritage': 'Patrimoine Sous-Marin',
        'During World War II, German submarines patrolled these waters. Today, Cozumel hosts the MUSA Underwater Museum, with over 500 sculptures that merge art, conservation, and history.': 'Pendant la Seconde Guerre mondiale, des sous-marins allemands patrouillaient ces eaux. Aujourd\'hui, Cozumel abrite le musée sous-marin MUSA, avec plus de 500 sculptures qui fusionnent art, conservation et histoire.',
        
        // Welcome Section
        'Welcome': 'Bienvenue',
        'There\'s so much to see here. So, take your time, look around, and learn all there is to know about us. We hope you enjoy our website and take a moment to drop us a line.': 'Il y a tellement à voir ici. Prenez votre temps, regardez autour de vous et apprenez tout ce qu\'il y a à savoir sur nous. Nous espérons que vous apprécierez notre site et que vous prendrez un moment pour nous écrire.',
        
        // Gallery Section
        'Captured Moments': 'Moments Capturés',
        'Discover the underwater beauty of Cozumel through our images. Each photo tells a story of adventure and wonder beneath the waves.': 'Découvrez la beauté sous-marine de Cozumel à travers nos images. Chaque photo raconte une histoire d\'aventure et d\'émerveillement sous les vagues.',
        
        // Contact Section
        'Contact Us': 'Contactez-nous',
        'Drop us a line!': 'Envoyez-nous un message!',
        'Name': 'Nom',
        'Email*': 'E-mail*',
        'Message': 'Message',
        'SEND': 'ENVOYER',
        'This site is protected by reCAPTCHA and the Google': 'Ce site est protégé par reCAPTCHA et la',
        'Privacy Policy': 'Politique de confidentialité',
        'and': 'et les',
        'Terms of Service': 'Conditions d\'utilisation',
        'apply.': 'de Google s\'appliquent.',
        
        // Join Us Section
        'Join Us': 'Rejoignez-nous',
        'This Is Your Vacation - Let It Be a Tale to Tell!!': 'Ce sont vos vacances - Qu\'elles soient une histoire à raconter!!',
        'Our mission is your safety first so your experience is to be told for many years of the magic kingdom George will guide you to paradise in Cozumel!!': 'Notre mission est votre sécurité d\'abord pour que votre expérience soit racontée pendant de nombreuses années du royaume magique. George vous guidera au paradis à Cozumel!!',
        'DONATE': 'FAIRE UN DON',
        
        // Footer
        'All rights reserved.': 'Tous droits réservés.',
        'Powered by': 'Propulsé par'
    }
};

// Current language (default: English)
let currentLanguage = 'en';
let originalContent = null;

// Function to save original content
function saveOriginalContent() {
    if (originalContent === null) {
        originalContent = document.body.cloneNode(true);
    }
}

// Function to translate page
function translatePage(lang) {
    if (!translations[lang]) return;
    
    // Save original content first time
    saveOriginalContent();
    
    currentLanguage = lang;
    
    // Update current language indicator
    const currentLangElement = document.getElementById('currentLang');
    if (currentLangElement) {
        currentLangElement.textContent = lang.toUpperCase();
    }
    
    // Close language menu
    const languageMenu = document.getElementById('languageMenu');
    if (languageMenu) {
        languageMenu.classList.add('hidden');
    }
    
    // If switching back to English, restore original content
    if (lang === 'en') {
        if (originalContent) {
            // Preserve the language menu state and other dynamic elements
            const currentBody = document.body.innerHTML;
            document.body.innerHTML = originalContent.innerHTML;
            
            // Re-initialize event listeners
            initializeEventListeners();
        }
    } else {
        // Translate to selected language
        const langData = translations[lang];
        translateAllElements(langData);
    }
    
    // Store language preference
    localStorage.setItem('preferredLanguage', lang);
}

// Helper function to translate all elements
function translateAllElements(langData) {
    // Create translation map
    const translationMap = new Map();
    Object.keys(langData).forEach(key => {
        translationMap.set(key, langData[key]);
    });
    
    // Get the original English content
    const tempDiv = originalContent.cloneNode(true);
    
    // Function to get all text nodes
    function getTextNodes(node) {
        const textNodes = [];
        const walk = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
        let textNode;
        while (textNode = walk.nextNode()) {
            if (textNode.textContent.trim()) {
                textNodes.push(textNode);
            }
        }
        return textNodes;
    }
    
    // Get text nodes from original and current
    const originalNodes = getTextNodes(tempDiv);
    const currentNodes = getTextNodes(document.body);
    
    // Translate matching nodes
    currentNodes.forEach((currentNode, index) => {
        if (originalNodes[index]) {
            const originalText = originalNodes[index].textContent.trim();
            if (translationMap.has(originalText)) {
                const leadingSpace = currentNode.textContent.match(/^\s*/)[0];
                const trailingSpace = currentNode.textContent.match(/\s*$/)[0];
                currentNode.textContent = leadingSpace + translationMap.get(originalText) + trailingSpace;
            }
        }
    });
    
    // Translate attributes
    document.querySelectorAll('[placeholder]').forEach(element => {
        const placeholder = element.getAttribute('placeholder');
        if (translationMap.has(placeholder)) {
            element.setAttribute('placeholder', translationMap.get(placeholder));
        }
    });
    
    document.querySelectorAll('[title]').forEach(element => {
        const title = element.getAttribute('title');
        if (translationMap.has(title)) {
            element.setAttribute('title', translationMap.get(title));
        }
    });
}

// Re-initialize event listeners after content replacement
function initializeEventListeners() {
    // Re-initialize language selector
    const languageBtn = document.getElementById('languageBtn');
    const languageMenu = document.getElementById('languageMenu');
    
    if (languageBtn && languageMenu) {
        languageBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            languageMenu.classList.toggle('hidden');
        });
        
        document.addEventListener('click', function() {
            if (!languageMenu.classList.contains('hidden')) {
                languageMenu.classList.add('hidden');
            }
        });
    }
}

// Load preferred language on page load
document.addEventListener('DOMContentLoaded', function() {
    // Save original content
    saveOriginalContent();
    
    const preferredLang = localStorage.getItem('preferredLanguage');
    if (preferredLang && preferredLang !== 'en') {
        setTimeout(() => translatePage(preferredLang), 100);
    }
});

