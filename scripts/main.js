// Smooth scroll for internal anchors
document.addEventListener('click', (e) => {
  const target = e.target.closest('a[href^="#"]');
  if (!target) return;
  const id = target.getAttribute('href').slice(1);
  const el = document.getElementById(id);
  if (el) {
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

// Typing effect for titles (if element with data-typing exists)
(function typingEffect() {
  const el = document.querySelector('[data-typing]');
  if (!el) return;
  const text = el.dataset.typing;
  let i = 0;
  const speed = 55;
  el.textContent = '';
  const cursor = document.createElement('span');
  cursor.textContent = '▌';
  cursor.style.marginLeft = '6px';
  cursor.style.color = '#79ffe1';
  el.appendChild(cursor);
  const type = () => {
    if (i < text.length) {
      cursor.before(document.createTextNode(text[i]));
      i++;
      setTimeout(type, speed);
    }
  };
  setTimeout(type, 250);
})();

// Reveal on scroll
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// Back to top button
const backBtn = document.getElementById('backToTop');
if (backBtn) {
  window.addEventListener('scroll', () => {
    backBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });
  backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// Lightbox for gallery
(function initLightbox() {
  const galleryImgs = document.querySelectorAll('.gallery-item img');
  const lightbox = document.querySelector('.lightbox');
  if (!lightbox || galleryImgs.length === 0) return;
  const lbImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.close');
  galleryImgs.forEach((img) => {
    img.addEventListener('click', () => {
      lbImg.src = img.src;
      lightbox.classList.add('open');
    });
  });
  const close = () => lightbox.classList.remove('open');
  closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });
})();

// Particle background
(function particles() {
  const c = document.getElementById('particle-canvas');
  if (!c) return;
  const ctx = c.getContext('2d');
  let w, h, particles;
  const count = 70;

  const reset = () => {
    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r: Math.random() * 2 + 1
    }));
  };

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    // links
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 120) {
          ctx.strokeStyle = `rgba(0, 194, 255, ${1 - dist/120})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    // dots
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.fillStyle = '#79ffe1';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  };

  window.addEventListener('resize', reset);
  reset();
  draw();
})();

// Attempt autoplay (may require user gesture in some browsers)
(function autoplayAudio() {
  const audio = document.querySelector('#bg-audio');
  if (!audio) return;
  const tryPlay = () => audio.play().catch(() => {});
  document.addEventListener('DOMContentLoaded', tryPlay);
  window.addEventListener('load', tryPlay);
  document.addEventListener('click', tryPlay);
})();