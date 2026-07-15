// ========== NAVBAR SCROLL ==========
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveLink();
});

// ========== MOBILE MENU ==========
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ========== ACTIVE NAV LINK ==========
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < top + height) {
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// ========== COUNTER ANIMATION ==========
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count'));
  const suffix = el.getAttribute('data-suffix') || '+';
  const duration = 2000;
  const start = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = current.toLocaleString('en-IN') + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target.toLocaleString('en-IN') + suffix;
    }
  }

  requestAnimationFrame(update);
}

// ========== SCROLL REVEAL ==========
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Trigger counter if stat numbers are in view
      if (entry.target.classList.contains('hero-stats')) {
        document.querySelectorAll('.stat-number').forEach(el => {
          if (!el.dataset.animated) {
            el.dataset.animated = 'true';
            animateCounter(el);
          }
        });
      }

      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe sections and key elements
document.querySelectorAll('section, .hero-stats, .services-grid, .portfolio-grid, .testimonials-grid').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Also observe individual cards for staggered animation
document.querySelectorAll('.service-category, .service-broad, .service-cta, .portfolio-item, .testimonial-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.1}s`;
  el.classList.add('fade-in');
  observer.observe(el);
});

// ========== CONTACT FORM ==========
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('.btn-submit');
  const originalText = btn.innerHTML;
  btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
  btn.disabled = true;

  try {
    const formData = new FormData(contactForm);
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      btn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
      btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      contactForm.reset();

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 4000);
    } else {
      throw new Error('Submission failed');
    }
  } catch (err) {
    btn.innerHTML = 'Failed to send. Try again? <i class="fas fa-exclamation-circle"></i>';
    btn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      btn.disabled = false;
    }, 4000);
  }
});

// ========== CURSOR SPOTLIGHT (Landing Page hero) ==========
const spotlightBg = document.querySelector('.bg-spotlight');
if (spotlightBg) {
  document.addEventListener('mousemove', (e) => {
    const rect = spotlightBg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    spotlightBg.style.setProperty('--spot-x', x + '%');
    spotlightBg.style.setProperty('--spot-y', y + '%');
    const spot = spotlightBg.querySelector('::before');
    if (spot) {
      spotlightBg.style.setProperty('--spot-x', x + '%');
      spotlightBg.style.setProperty('--spot-y', y + '%');
    }
    spotlightBg.querySelector('*')?.style?.setProperty?.('transform', `translate(${x - 50}%, ${y - 50}%)`);
  });
  // Update the pseudo element position via a style element
  const spotStyle = document.createElement('style');
  spotStyle.textContent = `
    .bg-spotlight::before {
      left: var(--spot-x, 50%);
      top: var(--spot-y, 50%);
    }
  `;
  document.head.appendChild(spotStyle);
}

// ========== 3D CARD TILT (showcase-card3d) ==========
document.querySelectorAll('.showcase-card3d').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = (y - 0.5) * 20;
    const tiltY = (x - 0.5) * -20;
    card.style.transform = `perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
  });
});

// ========== TYPEWRITER EFFECT ==========
function typewriter(el, text, speed = 50) {
  let i = 0;
  el.textContent = '';
  el.style.visibility = 'visible';
  function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

document.querySelectorAll('[data-typewriter]').forEach(el => {
  const text = el.textContent.trim();
  el.textContent = '';
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        typewriter(el, text, 40);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  observer.observe(el);
});

// ========== HERO PARALLAX ==========
const heroParallax = document.querySelector('.page-hero');
if (heroParallax) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroBg = heroParallax.querySelector('.bg-mesh, .bg-split, .bg-spotlight');
    if (heroBg && scrolled < heroParallax.offsetHeight) {
      heroBg.style.transform = `translateY(${scrolled * 0.15}px)`;
    }
  });
}

// ========== VIDEO AUTOPLAY ON SCROLL ==========
const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const video = entry.target.querySelector('video');
    if (!video) return;
    if (entry.isIntersecting) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.video-card').forEach(el => {
  videoObserver.observe(el);
});

// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
