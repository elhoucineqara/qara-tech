// Check if Font Awesome is loaded
window.addEventListener('load', () => {
    setTimeout(() => {
        const testIcon = document.createElement('i');
        testIcon.className = 'fas fa-test';
        testIcon.style.position = 'absolute';
        testIcon.style.left = '-9999px';
        document.body.appendChild(testIcon);
        
        const computedStyle = window.getComputedStyle(testIcon);
        const fontFamily = computedStyle.getPropertyValue('font-family');
        
        if (!fontFamily.includes('Font Awesome')) {
            console.warn('⚠️ Font Awesome may not be loaded properly');
        }
        
        document.body.removeChild(testIcon);
    }, 1000);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navigation active state
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Animate elements on scroll with stagger effect
const observerOptions = {
    threshold: 0.01,
    rootMargin: '0px 0px 0px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe elements for animation with stagger
const animateElements = document.querySelectorAll('.skill-box, .project-card, .timeline-item, .education-item, .stat-item, .contact-method');
animateElements.forEach((el, index) => {
    // Don't apply any inline styles that could interfere with CSS
    // Just observe for intersection
    observer.observe(el);
    
    // Make sure elements are visible immediately
    setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.writingMode = 'horizontal-tb';
    }, 100);
});

// Add floating animation to hero contact items
const heroContactItems = document.querySelectorAll('.hero-contact-item');
heroContactItems.forEach((item, index) => {
    item.style.animation = `floatItem 3s ease-in-out ${index * 0.2}s infinite`;
});

// Create CSS keyframes for floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatItem {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-5px);
        }
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .animated {
        animation: slideInUp 0.6s ease-out;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu on hamburger click
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 1023) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Typing effect for hero section
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.innerHTML = '';
    
    const type = () => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    
    type();
};

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero h2');
    
    if (heroTitle && heroSubtitle) {
        const originalTitle = heroTitle.textContent;
        const originalSubtitle = heroSubtitle.textContent;
        
        setTimeout(() => {
            typeWriter(heroTitle, originalTitle, 80);
        }, 500);
        
        setTimeout(() => {
            typeWriter(heroSubtitle, originalSubtitle, 60);
        }, 2000);
    }
});

// Skill boxes animation with enhanced effects
const animateSkillBoxes = () => {
    const skillBoxes = document.querySelectorAll('.skill-box');
    
    skillBoxes.forEach((box, index) => {
        // Add stagger animation delay
        box.style.animationDelay = `${index * 0.1}s`;
        
        // Animate tags on hover
        const tags = box.querySelectorAll('.skill-tag');
        tags.forEach((tag, tagIndex) => {
            tag.style.opacity = '0';
            tag.style.transform = 'scale(0.8)';
            tag.style.transition = `opacity 0.3s ease ${tagIndex * 0.05}s, transform 0.3s ease ${tagIndex * 0.05}s`;
            
            setTimeout(() => {
                tag.style.opacity = '1';
                tag.style.transform = 'scale(1)';
            }, 300 + (index * 100) + (tagIndex * 50));
        });
    });
};

// Initialize skill animations
animateSkillBoxes();

// Add particle effect on mouse move for hero section
const hero = document.querySelector('.hero');
if (hero) {
    hero.addEventListener('mousemove', (e) => {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '3px';
        particle.style.height = '3px';
        particle.style.background = 'rgba(255, 255, 255, 0.6)';
        particle.style.borderRadius = '50%';
        particle.style.left = e.clientX + 'px';
        particle.style.top = e.clientY + 'px';
        particle.style.pointerEvents = 'none';
        particle.style.animation = 'particle-fade 1s ease-out forwards';
        hero.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    });
}

// Add particle fade animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particle-fade {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) scale(0);
        }
    }
`;
document.head.appendChild(particleStyle);

// Contact form handling
const handleContactForm = () => {
    const contactForm = document.querySelector('#contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to a server
            console.log('Contact form data:', data);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
};

// Initialize contact form
handleContactForm();

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.2;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Force horizontal text for all timeline content
window.addEventListener('load', () => {
    // Fix any vertical text issues
    const allTimelineContent = document.querySelectorAll('.timeline-content, .timeline-content *');
    allTimelineContent.forEach(el => {
        el.style.writingMode = 'horizontal-tb';
        el.style.textOrientation = 'mixed';
    });
    
    // Fix all headings
    const allHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    allHeadings.forEach(el => {
        el.style.writingMode = 'horizontal-tb';
        el.style.textOrientation = 'mixed';
        el.style.whiteSpace = 'normal';
    });
});

// Initialize all animations and effects
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to page elements
    const animateOnLoad = document.querySelectorAll('.about-content, .contact-description');
    
    animateOnLoad.forEach((element, index) => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        element.style.writingMode = 'horizontal-tb';
    });
    
    // Animate section headers on scroll
    const sectionHeaders = document.querySelectorAll('section h2');
    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInDown 0.6s ease-out';
            }
        });
    }, { threshold: 0.5 });
    
    sectionHeaders.forEach(header => {
        headerObserver.observe(header);
    });
    
    // Add parallax effect to sections
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.contact-icon');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.05 * (index + 1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
});

// Add slide in down animation
const slideStyle = document.createElement('style');
slideStyle.textContent = `
    @keyframes slideInDown {
        from {
            opacity: 0;
            transform: translateY(-30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(slideStyle);

// Email functionality
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // Let the default mailto behavior work
        console.log('Opening email client...');
    });
});

// Phone functionality
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // Let the default tel behavior work
        console.log('Opening phone dialer...');
    });
});

// Smooth page transitions
window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
});

// Add loading animation with progress bar
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
    
    // Remove loader if exists
    const loader = document.getElementById('page-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }
});

// Custom cursor removed as per user request

// Add smooth reveal animation for images
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.style.opacity = '0';
    img.style.transform = 'scale(0.9)';
    img.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    if (img.complete) {
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
    } else {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        });
    }
});