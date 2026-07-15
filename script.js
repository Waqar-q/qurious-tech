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

// ========== BLACK HOLE CANVAS ==========
function initBlackHole() {
  const canvas = document.getElementById('blackHoleCanvas');
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = canvas.getContext('2d');
  let w, h, cx, cy, bhSize;
  let time = 0;
  let particles = [];
  let animId;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = rect.width;
    h = rect.height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cx = w / 2;
    cy = h * 0.72;
    bhSize = Math.min(w, h) * 0.55;
    createParticles();
  }

  function createParticles() {
    particles = [];
    const count = Math.min(Math.floor(w * 0.04), 60);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w, y: Math.random() * h * 0.6,
        size: Math.random() * 1.5 + 0.3,
        speed: Math.random() * 0.15 + 0.02,
        angle: Math.random() * Math.PI * 2,
        drift: Math.random() * 0.2 - 0.1
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    time += 0.005;

    const s = bhSize;

    // 1. Atmospheric glow
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, s * 1.6);
    g.addColorStop(0, 'rgba(124,58,237,0.08)');
    g.addColorStop(0.3, 'rgba(124,58,237,0.04)');
    g.addColorStop(0.6, 'rgba(88,28,135,0.02)');
    g.addColorStop(1, 'transparent');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // 2. Upward bloom
    const b = ctx.createRadialGradient(cx, cy - s * 0.2, 0, cx, cy - s * 0.2, s);
    b.addColorStop(0, 'rgba(139,92,246,0.06)');
    b.addColorStop(0.5, 'rgba(124,58,237,0.03)');
    b.addColorStop(1, 'transparent');
    ctx.fillStyle = b;
    ctx.fillRect(0, 0, w, h);

    // 3. Dark central void
    ctx.save();
    ctx.shadowColor = '#000';
    ctx.shadowBlur = 40;
    ctx.beginPath();
    ctx.ellipse(cx, cy, s * 0.18, s * 0.1, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#000';
    ctx.fill();
    ctx.shadowBlur = 25;
    ctx.beginPath();
    ctx.ellipse(cx, cy, s * 0.12, s * 0.065, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 4. Accretion disk lensing arcs
    const arcY = cy - s * 0.03;
    const arcW = s * 0.38;
    const arcH = s * 0.09;

    const pulse1 = Math.sin(time * 1.5) * 0.03;
    const pulse2 = Math.sin(time * 2) * 0.05;

    ctx.save();
    ctx.globalAlpha = 0.12 + pulse1;
    ctx.beginPath();
    ctx.ellipse(cx, arcY, arcW, arcH, 0, Math.PI, 0);
    ctx.strokeStyle = 'rgba(124,58,237,0.3)';
    ctx.lineWidth = 10;
    ctx.filter = 'blur(8px)';
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.globalAlpha = 0.2 + pulse2;
    ctx.beginPath();
    ctx.ellipse(cx, arcY, arcW * 0.65, arcH * 0.55, 0, Math.PI, 0);
    ctx.strokeStyle = 'rgba(200,180,255,0.35)';
    ctx.lineWidth = 5;
    ctx.filter = 'blur(4px)';
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.globalAlpha = 0.25 + Math.sin(time * 2.5) * 0.05;
    ctx.beginPath();
    ctx.ellipse(cx, arcY, arcW * 0.35, arcH * 0.3, 0, Math.PI, 0);
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 3;
    ctx.filter = 'blur(2px)';
    ctx.stroke();
    ctx.restore();

    // 5. Event horizon line
    ctx.save();
    const lg = ctx.createLinearGradient(0, 0, w, 0);
    lg.addColorStop(0, 'transparent');
    lg.addColorStop(0.2, 'rgba(124,58,237,0.06)');
    lg.addColorStop(0.35, 'rgba(139,92,246,0.15)');
    lg.addColorStop(0.45, 'rgba(200,180,255,0.35)');
    lg.addColorStop(0.5, 'rgba(255,255,255,0.6)');
    lg.addColorStop(0.55, 'rgba(200,180,255,0.35)');
    lg.addColorStop(0.65, 'rgba(139,92,246,0.15)');
    lg.addColorStop(0.8, 'rgba(124,58,237,0.06)');
    lg.addColorStop(1, 'transparent');
    ctx.fillStyle = lg;
    ctx.fillRect(0, cy - 1, w, 2);
    ctx.restore();

    ctx.save();
    ctx.globalAlpha = 0.06;
    ctx.fillStyle = 'rgba(139,92,246,0.15)';
    ctx.filter = 'blur(14px)';
    ctx.fillRect(0, cy - 4, w, 8);
    ctx.restore();

    // 6. Particles
    ctx.save();
    particles.forEach(p => {
      p.x += Math.cos(p.angle + time) * p.drift + Math.sin(time * 0.5 + p.angle) * 0.1;
      p.y += Math.sin(p.angle + time * 0.7) * p.speed * 0.3;
      p.angle += 0.001;
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h * 0.6;
      if (p.y > h * 0.6) p.y = 0;
      const d = Math.hypot(p.x - cx, p.y - cy);
      const v = Math.max(0, 1 - d / (s * 0.9));
      if (v > 0.1) {
        ctx.globalAlpha = v * 0.3;
        ctx.fillStyle = 'rgba(200,180,255,0.6)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    ctx.restore();

    // 7. Orbital arcs
    ctx.save();
    ctx.globalAlpha = 0.035;
    ctx.strokeStyle = 'rgba(124,58,237,0.12)';
    ctx.lineWidth = 1;
    ctx.filter = 'blur(1px)';
    for (let i = 0; i < 3; i++) {
      const r = s * (0.4 + i * 0.15);
      const off = i * 0.5 + Math.sin(time * 0.3 + i) * 0.1;
      ctx.beginPath();
      ctx.ellipse(cx, cy + r * 0.1, r, r * 0.3, off, 0.2, Math.PI * 0.8);
      ctx.stroke();
    }
    ctx.restore();

    animId = requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  draw();
}

if (document.getElementById('blackHoleCanvas')) {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initBlackHole();
  } else {
    document.addEventListener('DOMContentLoaded', initBlackHole);
  }
}
