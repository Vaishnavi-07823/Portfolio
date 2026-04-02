/* ===================================================
   Vaishnavi Trivedi – Portfolio Script (Enhanced Cyber)
   =================================================== */

// ===== CUSTOM CURSOR =====
const cursorDot = document.getElementById('custom-cursor');
const cursorTrail = document.getElementById('custom-cursor-trail');

if (cursorDot && cursorTrail) {
  document.addEventListener('mousemove', (e) => {
    // Inner dot follows instantly
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
    // Trail follows with CSS transition lag
    cursorTrail.style.left = e.clientX + 'px';
    cursorTrail.style.top = e.clientY + 'px';
  });

  // Hover effect on interactive elements
  const hoverTargets = document.querySelectorAll('a, button, .btn, .stat-item, .nav-cta');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.classList.add('hovering');
      cursorTrail.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
      cursorDot.classList.remove('hovering');
      cursorTrail.classList.remove('hovering');
    });
  });
}

// ===== SCROLL & ACTIVE NAVBAR =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');

const currentPath = window.location.pathname.split('/').pop() || 'index.html';
navLinks.forEach(link => {
  if (link.getAttribute('href') === currentPath) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');

  const scrollTopBtn = document.getElementById('scroll-top');
  if (scrollTopBtn) {
    if (window.scrollY > 400) scrollTopBtn.classList.add('visible');
    else scrollTopBtn.classList.remove('visible');
  }
});

// ===== HAMBURGER MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('nav-links');

if (hamburger && navLinksContainer) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('open');
  });

  navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinksContainer.classList.remove('open');
    });
  });
}

// ===== SCROLL TO TOP =====
const scrollTopBtn = document.getElementById('scroll-top');
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== TERMINAL INIT LINE TYPING =====
const initTextEl = document.getElementById('init-text');
if (initTextEl) {
  const initString = 'Initializing Cybersecurity Profile...';
  let initIndex = 0;

  function typeInit() {
    if (initIndex < initString.length) {
      initTextEl.textContent += initString.charAt(initIndex);
      initIndex++;
      setTimeout(typeInit, 50);
    }
  }
  // Start after a small delay
  setTimeout(typeInit, 300);
}

// ===== TYPING ANIMATION (Role Strings) =====
const typingEl = document.getElementById('typing-text');
if (typingEl) {
  const typingStrings = [
    'Cybersecurity Student',
    'Ethical Hacker',
    'CEH v13 Trained',
    'CTF Enthusiast',
    'Digital Forensics Learner',
    'Network Security Analyst'
  ];

  let stringIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 90;
  const deletingSpeed = 45;
  const pauseTime = 2000;

  function typeWriter() {
    const currentString = typingStrings[stringIndex];
    if (isDeleting) {
      typingEl.textContent = currentString.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingEl.textContent = currentString.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentString.length) {
      delay = pauseTime;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      stringIndex = (stringIndex + 1) % typingStrings.length;
      delay = 400;
    }
    setTimeout(typeWriter, delay);
  }
  // Start typing after init line finishes (~2s)
  setTimeout(typeWriter, 2200);
}

// ===== SCROLL REVEAL (Intersection Observer) =====
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach(el => revealObserver.observe(el));
}

// ===== CYBER BACKGROUND (Binary Rain + Network Grid) =====
const canvas = document.getElementById('cyber-matrix');
if (canvas) {
  const ctx = canvas.getContext('2d');

  let width, height;
  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  /* Binary Rain — only 0s and 1s, slow and subtle */
  const binaryChars = '01';
  const fontSize = 14;
  let columns = Math.floor(width / fontSize);
  let drops = [];
  for (let i = 0; i < columns; i++) drops[i] = Math.random() * -100;

  /* Network Nodes — particle grid with connections */
  const nodes = [];
  const NODE_COUNT = 50;
  for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      size: Math.random() * 1.5 + 0.8,
      baseColor: Math.random() > 0.6 ? '0,255,136' : '0,212,255'
    });
  }

  /* Mouse interaction */
  let mouse = { x: null, y: null };
  window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
  });
  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function drawBinaryRain() {
    ctx.fillStyle = 'rgba(6, 8, 17, 0.12)';
    ctx.fillRect(0, 0, width, height);

    ctx.font = fontSize + 'px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';

    for (let i = 0; i < drops.length; i++) {
      const text = binaryChars[Math.floor(Math.random() * binaryChars.length)];

      // Subtle green with occasional bright flash
      const brightness = Math.random();
      if (brightness > 0.97) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      } else if (brightness > 0.85) {
        ctx.fillStyle = 'rgba(0, 255, 136, 0.7)';
      } else {
        ctx.fillStyle = 'rgba(0, 255, 136, 0.35)';
      }

      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      // Slower fall — higher threshold means less frequent resets
      if (drops[i] * fontSize > height && Math.random() > 0.985) {
        drops[i] = 0;
      }
      drops[i] += 0.5; // Slow speed
    }
  }

  function drawNetworkGrid() {
    nodes.forEach(node => {
      node.x += node.vx;
      node.y += node.vy;

      if (node.x <= 0 || node.x >= width) node.vx *= -1;
      if (node.y <= 0 || node.y >= height) node.vy *= -1;

      // Draw node dot
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${node.baseColor}, 0.5)`;
      ctx.fill();

      // Draw connections (faint digital grid lines)
      nodes.forEach(otherNode => {
        const dx = node.x - otherNode.x;
        const dy = node.y - otherNode.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140) {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(otherNode.x, otherNode.y);
          ctx.strokeStyle = `rgba(${node.baseColor}, ${0.3 * (1 - dist / 140)})`;
          ctx.lineWidth = 0.4;
          ctx.stroke();
        }
      });

      // Mouse interaction — subtle glow connection
      if (mouse.x && mouse.y) {
        const mdx = node.x - mouse.x;
        const mdy = node.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 160) {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(0, 255, 136, ${0.5 * (1 - mDist / 160)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();

          // Gentle push
          node.x += (mdx / mDist) * 0.8;
          node.y += (mdy / mDist) * 0.8;
        }
      }
    });
  }

  function renderCyberBackground() {
    drawBinaryRain();
    drawNetworkGrid();
    requestAnimationFrame(renderCyberBackground);
  }

  renderCyberBackground();

  window.addEventListener('resize', () => {
    columns = Math.floor(width / fontSize);
    const oldLength = drops.length;
    drops.length = columns;
    for (let i = oldLength; i < columns; i++) drops[i] = Math.random() * -100;
  });
}

// ===== CONTACT FORM SUBMIT =====
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');

    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #00cc6e, #00a855)';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      btn.style.background = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  });
}

// ===== CURSOR GLOW EFFECT ON CARDS =====
document.querySelectorAll('.project-card, .skill-card, .cert-card, .timeline-card, .about-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 255, 136, 0.06) 0%, rgba(13, 17, 23, 0.8) 70%)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
});

// ===== STAT COUNT-UP ANIMATION =====
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const duration = 1500;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease-out curve for smooth deceleration
    const eased = 1 - Math.pow(1 - progress, 3);
    current = Math.round(eased * target);

    el.textContent = current + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  requestAnimationFrame(update);
}

const heroSection = document.getElementById('hero');
if (heroSection) {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  statNumbers.forEach(el => {
    const target = parseInt(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    if (!isNaN(target)) {
      // Start count-up after hero animations complete
      setTimeout(() => animateCounter(el, target, suffix), 1800);
    }
  });
}

// ===== SKILLS STAGGER =====
const skillsSection = document.getElementById('skills');
if (skillsSection) {
  const cards = document.querySelectorAll('.skill-card');
  cards.forEach((card, i) => {
    setTimeout(() => card.classList.add('visible'), i * 100);
  });
}

// ===== PAGE TRANSITION =====
document.querySelectorAll('a[href]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = link.getAttribute('href');
    if (target && target.endsWith('.html') && !link.hasAttribute('target')) {
      e.preventDefault();
      const transitionEl = document.getElementById('page-transition');
      if (transitionEl) {
        transitionEl.classList.add('active');
        setTimeout(() => {
          window.location.href = target;
        }, 400);
      } else {
        window.location.href = target;
      }
    }
  });
});

window.addEventListener('pageshow', () => {
  const transitionEl = document.getElementById('page-transition');
  if (transitionEl) {
    transitionEl.classList.remove('active');
  }
});
