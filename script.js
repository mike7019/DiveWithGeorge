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

