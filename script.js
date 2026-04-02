/* ===================================================
   Vaishnavi Trivedi – Portfolio Script (Multi-Page & Cyber Background)
   =================================================== */

// ===== SCROLL & ACTIVE NAVBAR =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');

// Set active link based on current URL path
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
navLinks.forEach(link => {
  if (link.getAttribute('href') === currentPath) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});

window.addEventListener('scroll', () => {
  // Navbar blur background
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');

  // Scroll-to-top button
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

// ===== TARGETED TYPING ANIMATION (Only for Hero/Index) =====
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
  typeWriter();
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

// ===== BLACK HAT CYBER MATRIX BACKGROUND =====
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

  /* Matrix Rain Variables */
  const letters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789§*±!@#$%^&*()';
  const charArray = letters.split('');
  const fontSize = 14;
  let columns = width / fontSize;
  let drops = [];
  for (let i = 0; i < columns; i++) drops[i] = Math.random() * -100;

  /* Network Nodes Variables */
  const nodes = [];
  const NODE_COUNT = 60;
  for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      size: Math.random() * 2 + 1,
      baseColor: Math.random() > 0.5 ? '0,255,136' : '0,212,255'
    });
  }

  /* Interaction Variables */
  let mouse = { x: null, y: null };
  window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
  });
  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function drawMatrix() {
    // Slight fade for matrix trail
    ctx.fillStyle = 'rgba(6, 8, 17, 0.15)';
    ctx.fillRect(0, 0, width, height);

    ctx.font = fontSize + 'px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';

    // Draw Matrix Characters
    for (let i = 0; i < drops.length; i++) {
      const text = charArray[Math.floor(Math.random() * charArray.length)];
      
      // Make leading character brighter
      ctx.fillStyle = Math.random() > 0.95 ? '#fff' : '#00ff88';
      
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  function drawCyberNodes() {
    nodes.forEach(node => {
      // Move node
      node.x += node.vx;
      node.y += node.vy;

      // Bounce off walls
      if (node.x <= 0 || node.x >= width) node.vx *= -1;
      if (node.y <= 0 || node.y >= height) node.vy *= -1;

      // Draw Node
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${node.baseColor}, 0.8)`;
      ctx.fill();

      // Connect Nodes within range
      nodes.forEach(otherNode => {
        const dx = node.x - otherNode.x;
        const dy = node.y - otherNode.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(otherNode.x, otherNode.y);
          ctx.strokeStyle = `rgba(${node.baseColor}, ${0.8 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });

      // Interactive Glowing Mouse Connection
      if (mouse.x && mouse.y) {
        const mdx = node.x - mouse.x;
        const mdy = node.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 180) {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(0, 255, 136, ${0.9 * (1 - mDist / 180)})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Push nodes slightly away from mouse (Repel effect)
          node.x += (mdx / mDist) * 1.5;
          node.y += (mdy / mDist) * 1.5;
        }
      }
    });
  }

  function renderCyberBackground() {
    drawMatrix();
    drawCyberNodes();
    requestAnimationFrame(renderCyberBackground);
  }
  
  // Start the background animation
  renderCyberBackground();

  // Handle resizing for matrix array correctly
  window.addEventListener('resize', () => {
    columns = width / fontSize;
    const oldLength = drops.length;
    drops.length = columns;
    for (let i = oldLength; i < columns; i++) drops[i] = Math.random() * -100;
  });
}

// ===== CONTACT FORM SUBMIT (Only on Contact Page) =====
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
    card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 255, 136, 0.08) 0%, rgba(13, 17, 23, 0.8) 70%)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
});

// ===== STAT ANIMATION (Only for Hero/Index) =====
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const isFloat = target % 1 !== 0;
  const step = target / 50;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = isFloat ? current.toFixed(1) + suffix : Math.floor(current) + suffix;
  }, 30);
}

const heroSection = document.getElementById('hero');
if (heroSection) {
  const statNumbers = document.querySelectorAll('.stat-number');
  statNumbers.forEach(el => {
    const text = el.textContent.trim();
    const num = parseFloat(text);
    if (!isNaN(num)) {
      const suffix = text.replace(num.toString(), '').replace(String(Math.floor(num)), '');
      setTimeout(() => animateCounter(el, num, suffix), 500); // Small delay on load
    }
  });
}

// ===== SKILLS STAGGER (Only for Skills Page) =====
const skillsSection = document.getElementById('skills');
if (skillsSection) {
  const cards = document.querySelectorAll('.skill-card');
  cards.forEach((card, i) => {
    setTimeout(() => card.classList.add('visible'), i * 100);
  });
}

// ===== PAGE TRANSITION ANIMATION =====
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

// Fade out on page load
window.addEventListener('pageshow', () => {
  const transitionEl = document.getElementById('page-transition');
  if (transitionEl) {
    transitionEl.classList.remove('active');
  }
});
