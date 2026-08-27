(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ===== i18n dictionary =====
  const i18n = {
    es: {
      'nav.home': 'Inicio', 'nav.about': 'Sobre mí', 'nav.projects': 'Proyectos', 'nav.exp': 'Experiencia', 'nav.skills': 'Habilidades', 'nav.certs': 'Certificados', 'nav.contact': 'Contacto',
      'hero.greeting': 'Hola, soy',
      'hero.desc': 'Estudiante de Ingeniería de Software apasionado por crear soluciones tecnológicas. Combino desarrollo web, diseño multimedia y soporte técnico con un enfoque proactivo.',
      'hero.cta1': 'Conectemos', 'hero.cta2': 'Ver Proyectos', 'hero.cta3': 'Descargar CV',
      'github.desc': 'Repositorios públicos de @Xwin-tex cargados directamente desde la API de GitHub — sin editar HTML.',
      'github.loading': 'Cargando repos…', 'github.viewAll': 'Ver todo en GitHub →', 'github.error': 'No se pudieron cargar los repos. Ver en GitHub.',
      'form.name': 'Nombre', 'form.email': 'Email', 'form.subject': 'Asunto', 'form.message': 'Mensaje',
      typing: ['Ingeniero de Software en formación','Desarrollador Full Stack','Diseñador Multimedia','Apasionado por la tecnología'],
      toasts: { required: 'Completa este campo', email: 'Email no válido', subject: 'Asunto muy corto (mín 5)', message: 'Mensaje muy corto (mín 10)', sending:'Enviando…', sent:'¡Mensaje enviado!', sendError:'No se pudo enviar. Intenta de nuevo.' }
    },
    en: {
      'nav.home': 'Home', 'nav.about': 'About', 'nav.projects': 'Projects', 'nav.exp': 'Experience', 'nav.skills': 'Skills', 'nav.certs': 'Certificates', 'nav.contact': 'Contact',
      'hero.greeting': 'Hi, I am',
      'hero.desc': 'Software Engineering student passionate about building tech solutions. I blend web development, multimedia design and tech support with a proactive mindset.',
      'hero.cta1': "Let's connect", 'hero.cta2': 'View Projects', 'hero.cta3': 'Download CV',
      'github.desc': 'Public repositories from @Xwin-tex loaded live from GitHub API — no HTML edits needed.',
      'github.loading': 'Loading repos…', 'github.viewAll': 'View all on GitHub →', 'github.error': 'Could not load repos. View on GitHub.',
      'form.name': 'Name', 'form.email': 'Email', 'form.subject': 'Subject', 'form.message': 'Message',
      typing: ['Software Engineer in training','Full Stack Developer','Multimedia Designer','Passionate about tech'],
      toasts: { required: 'This field is required', email: 'Invalid email', subject: 'Subject too short (min 5)', message: 'Message too short (min 10)', sending:'Sending…', sent:'Message sent!', sendError:'Could not send. Try again.' }
    }
  };
  let currentLang = localStorage.getItem('lang') || (navigator.language.startsWith('es') ? 'es' : 'es');
  let typingTexts = i18n[currentLang].typing;

  // ===== Scroll progress bar =====
  function initScrollProgress() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    const inner = document.createElement('div');
    inner.className = 'scroll-progress-bar';
    bar.appendChild(inner);
    document.body.prepend(bar);

    let ticking = false;
    function update() {
      const h = document.documentElement;
      const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      inner.style.width = scrolled + '%';
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
  }

  // ===== PARTICLES BACKGROUND — smooth, RAF with delta + DPR =====
  class ParticleSystem {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.particles = [];
      this.mouse = { x: -9999, y: -9999 };
      this.targetMouse = { x: -9999, y: -9999 };
      this.dpr = Math.min(window.devicePixelRatio || 1, 1.8);
      this.animationId = null;
      this.lastTime = 0;
      this.resize();
      this.init();
      this.bindEvents();
      this.animate(0);
    }

    resize() {
      const { innerWidth: w, innerHeight: h } = window;
      this.canvas.width = w * this.dpr;
      this.canvas.height = h * this.dpr;
      this.canvas.style.width = w + 'px';
      this.canvas.style.height = h + 'px';
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      this.w = w;
      this.h = h;
    }

    init() {
      const area = this.w * this.h;
      const count = Math.min(72, Math.max(28, Math.floor(area / 18000)));
      this.particles = Array.from({ length: count }, () => this.createParticle(true));
    }

    createParticle(randomY = false) {
      const isPrimary = Math.random() < 0.34;
      return {
        x: Math.random() * this.w,
        y: randomY ? Math.random() * this.h : (Math.random() < 0.5 ? -10 : this.h + 10),
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        radius: Math.random() * 1.35 + 0.45,
        color: isPrimary ? '#00d4aa' : '#6366f1',
        opacity: Math.random() * 0.35 + 0.12,
        baseOpacity: Math.random() * 0.32 + 0.14,
        pulseSpeed: Math.random() * 0.0016 + 0.0007,
        phase: Math.random() * Math.PI * 2,
      };
    }

    bindEvents() {
      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => { this.resize(); this.init(); }, 160);
      });
      window.addEventListener('mousemove', (e) => {
        this.targetMouse.x = e.clientX;
        this.targetMouse.y = e.clientY;
      }, { passive: true });
      window.addEventListener('mouseleave', () => {
        this.targetMouse.x = -9999;
        this.targetMouse.y = -9999;
      });
    }

    update(dt) {
      // smooth mouse lerp
      this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.08;
      this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.08;

      const dtNorm = Math.min(dt / 16.666, 2);

      for (let p of this.particles) {
        p.x += p.vx * dtNorm;
        p.y += p.vy * dtNorm;

        // gentle mouse repulsion
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist2 = dx*dx + dy*dy;
        const maxDist = 150;
        if (dist2 < maxDist*maxDist && dist2 > 1) {
          const dist = Math.sqrt(dist2);
          const force = (maxDist - dist) / maxDist * 0.018;
          p.vx -= (dx / dist) * force * dtNorm;
          p.vy -= (dy / dist) * force * dtNorm;
        }

        // damping — very subtle
        p.vx *= 0.998;
        p.vy *= 0.998;

        // clamp velocity
        p.vx = Math.max(-0.6, Math.min(0.6, p.vx));
        p.vy = Math.max(-0.6, Math.min(0.6, p.vy));

        // pulse via sine for buttery opacity
        p.phase += p.pulseSpeed * dt * 16.666;
        p.opacity = p.baseOpacity + Math.sin(p.phase) * 0.16;

        // wrap softly
        if (p.x < -60) p.x = this.w + 60;
        if (p.x > this.w + 60) p.x = -60;
        if (p.y < -60) p.y = this.h + 60;
        if (p.y > this.h + 60) p.y = -60;
      }
    }

    draw() {
      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.w, this.h);

      // connections — keep light for performance
      const maxDist = 118;
      ctx.lineWidth = 0.45;
      for (let i = 0; i < this.particles.length; i++) {
        for (let j = i + 1; j < this.particles.length; j++) {
          const a = this.particles[i], b = this.particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < maxDist) {
            const alpha = (1 - d / maxDist) * 0.13 * Math.min(a.opacity, b.opacity) * 1.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0,212,170,${alpha})`;
            ctx.stroke();
          }
        }
      }

      for (let p of this.particles) {
        // core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round(Math.max(0, Math.min(1, p.opacity)) * 255).toString(16).padStart(2, '0');
        ctx.fill();

        // glow halo — radial
        const r = p.radius * 2.6;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        const a1 = Math.round(p.opacity * 58).toString(16).padStart(2, '0');
        g.addColorStop(0, p.color + a1);
        g.addColorStop(1, p.color + '00');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    animate(now) {
      if (!prefersReducedMotion) {
        const dt = now - this.lastTime;
        this.lastTime = now;
        // cap dt to avoid jumps after tab switch
        if (dt < 100) {
          this.update(dt);
          this.draw();
        }
      }
      this.animationId = requestAnimationFrame((t) => this.animate(t));
    }
  }

  // ===== TYPING — humanized timing (texts from i18n) =====

  function initTyping() {
    const el = document.getElementById('typingText');
    if (!el) return;
    let textIndex = 0, charIndex = 0, isDeleting = false;

    function jitter(base, variance) {
      return base + (Math.random() * variance * 2 - variance);
    }

    function tick() {
      const full = typingTexts[textIndex];
      if (isDeleting) {
        charIndex = Math.max(0, charIndex - 1);
      } else {
        charIndex = Math.min(full.length, charIndex + 1);
      }
      el.textContent = full.slice(0, charIndex);

      let delay;
      if (!isDeleting && charIndex === full.length) {
        delay = jitter(1900, 300);
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        delay = jitter(480, 120);
      } else {
        delay = isDeleting ? jitter(38, 10) : jitter(96, 28);
        // slightly longer on punctuation / space
        const nextChar = full[charIndex];
        if (nextChar === ' ') delay += 30;
      }
      setTimeout(tick, delay);
    }
    tick();
  }

  // ===== SCROLL REVEAL — staggered, once =====
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    // assign stagger delay based on group
    const groups = new Map();
    reveals.forEach(el => {
      const parent = el.parentElement;
      if (!groups.has(parent)) groups.set(parent, []);
      groups.get(parent).push(el);
    });
    groups.forEach(list => {
      list.forEach((el, i) => {
        if (!el.style.getPropertyValue('--delay')) {
          el.style.setProperty('--delay', `${Math.min(i * 80, 400)}ms`);
        }
      });
    });

    const io = new IntersectionObserver((entries) => {
      for (let e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      }
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px'
    });

    reveals.forEach(el => io.observe(el));

    // hero already handled via hero-enter; mark visible quickly if hero in view
    document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('visible'));
  }

  // ===== PROJECTS FILTER =====
  function initProjectFilters() {
    const btns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');
    if (!btns.length || !cards.length) return;
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        btns.forEach(b => { b.classList.toggle('active', b === btn); b.setAttribute('aria-selected', b === btn ? 'true' : 'false'); });
        cards.forEach(card => {
          const cat = card.dataset.category;
          const show = filter === 'all' || cat === filter;
          card.style.display = '';
          // trigger reflow for transition
          if (show) {
            card.classList.remove('is-hidden');
            card.style.removeProperty('display');
          } else {
            card.classList.add('is-hidden');
            setTimeout(() => { if (card.classList.contains('is-hidden')) card.style.display = 'none'; }, 300);
          }
        });
      });
    });
  }

  // ===== THEME TOGGLE =====
  function initTheme() {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    const saved = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const initial = saved || (prefersLight ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', initial);
    document.querySelector('meta[name=\"theme-color\"]')?.setAttribute('content', initial === 'light' ? '#f8fafc' : '#0a0f1a');
    btn.addEventListener('click', () => {
      const cur = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      document.querySelector('meta[name=\"theme-color\"]')?.setAttribute('content', next === 'light' ? '#f8fafc' : '#0a0f1a');
    });
  }

  // ===== LANG TOGGLE =====
  function initLang() {
    const btn = document.getElementById('langToggle');
    if (!btn) return;
    function applyLang(lang) {
      currentLang = lang;
      typingTexts = i18n[lang].typing;
      localStorage.setItem('lang', lang);
      document.documentElement.lang = lang;
      btn.textContent = lang === 'es' ? 'EN' : 'ES';
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const val = i18n[lang][key];
        if (val) el.textContent = val;
      });
      // restart typing
      const el = document.getElementById('typingText');
      if (el) el.textContent = '';
    }
    applyLang(currentLang);
    btn.addEventListener('click', () => {
      applyLang(currentLang === 'es' ? 'en' : 'es');
    });
  }

  // ===== TOAST =====
  function toast(msg, type='success') {
    const c = document.getElementById('toastContainer');
    if (!c) return;
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.textContent = msg;
    c.appendChild(t);
    requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 320); }, 3400);
  }

  // ===== GITHUB API =====
  async function initGithub() {
    const grid = document.getElementById('githubGrid');
    if (!grid) return;
    const langColors = { JavaScript:'#f1e05a', Python:'#3572A5', HTML:'#e34c26', CSS:'#563d7c', TypeScript:'#2b7489', Java:'#b07219', 'C++':'#f34b7d', Shell:'#89e051', Dockerfile:'#384d54' };
    try {
      const res = await fetch('https://api.github.com/users/Xwin-tex/repos?sort=updated&per_page=6');
      if (!res.ok) throw new Error('github error');
      let repos = await res.json();
      // filter out forks if too many, keep 6
      repos = repos.filter(r => !r.fork).slice(0,6);
      if (!repos.length) repos = await (await fetch('https://api.github.com/users/Xwin-tex/repos?per_page=6')).json();
      grid.innerHTML = '';
      repos.forEach(r => {
        const card = document.createElement('article');
        card.className = 'github-card reveal visible';
        const langDot = r.language ? `<span class=\"dot-lang\" style=\"background:${langColors[r.language]||'#00d4aa'}\"></span>${r.language}` : '';
        card.innerHTML = `
          <h3><a href=\"${r.html_url}\" target=\"_blank\" rel=\"noopener\">${r.name}</a></h3>
          <p>${r.description ? r.description.slice(0,120) : (currentLang==='en' ? 'No description' : 'Sin descripción')}</p>
          <div class=\"github-meta\">
            ${langDot ? `<span>${langDot}</span>` : ''}
            <span>⭐ ${r.stargazers_count}</span>
            <span>⑂ ${r.forks_count}</span>
            <span>${new Date(r.updated_at).toLocaleDateString(currentLang==='en'?'en-US':'es-CO')}</span>
          </div>`;
        grid.appendChild(card);
      });
    } catch (e) {
      grid.innerHTML = `<div class=\"github-loading\" style=\"flex-direction:column\"><span>${i18n[currentLang]['github.error']}</span><a href=\"https://github.com/Xwin-tex\" target=\"_blank\" rel=\"noopener\" class=\"btn btn-secondary\" style=\"margin-top:8px\">github.com/Xwin-tex</a></div>`;
    }
  }

  // ===== HERO ENTER trigger =====
  function initHeroEnter() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => hero.classList.add('hero-enter'));
    });
  }

  // ===== COUNTERS — expo easing =====
  function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    if (!counters.length) return;
    function easeOutExpo(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target, easeOutExpo);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.45 });
    counters.forEach(c => io.observe(c));
  }

  function animateCounter(element, easing) {
    const target = parseInt(element.dataset.target, 10);
    const duration = 1400;
    const start = performance.now();
    function frame(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = easing(p);
      element.textContent = Math.floor(eased * target);
      if (p < 1) requestAnimationFrame(frame);
      else element.textContent = target;
    }
    requestAnimationFrame(frame);
  }

  // ===== NAV scroll =====
  function initNavScroll() {
    const nav = document.getElementById('nav');
    if (!nav) return;
    let ticking = false;
    function onScroll() {
      nav.classList.toggle('scrolled', window.scrollY > 24);
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });
    onScroll();
  }

  // ===== MOBILE MENU — spring feel =====
  function initMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const links = document.querySelector('.nav-links');
    if (!toggle || !links) return;
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.classList.toggle('active', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    links.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        links.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ===== ACTIVE NAV =====
  function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-28% 0px -68% 0px', threshold: 0 });
    sections.forEach(s => io.observe(s));
  }

  // ===== SMOOTH SCROLL offset =====
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const nav = document.getElementById('nav');
          const navH = nav ? nav.offsetHeight : 72;
          const top = target.getBoundingClientRect().top + window.scrollY - navH + 1;
          window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        }
      });
    });
  }

  // ===== CONTACT FORM — validation + toast + FormSubmit =====
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    const statusEl = document.getElementById('formStatus');
    const fields = {
      name: document.getElementById('name'),
      email: document.getElementById('email'),
      subject: document.getElementById('subject'),
      message: document.getElementById('message')
    };
    const errs = {
      name: document.getElementById('err-name'),
      email: document.getElementById('err-email'),
      subject: document.getElementById('err-subject'),
      message: document.getElementById('err-message')
    };

    function setErr(input, errEl, msg) {
      if (msg) {
        input.classList.add('input-error'); input.classList.remove('input-valid');
        errEl.textContent = msg; errEl.classList.add('visible');
      } else {
        input.classList.remove('input-error'); errEl.textContent = ''; errEl.classList.remove('visible');
        if (input.value.trim()) input.classList.add('input-valid');
      }
    }
    function validate() {
      const t = i18n[currentLang].toasts;
      let ok = true;
      if (!fields.name.value.trim() || fields.name.value.trim().length < 2) { setErr(fields.name, errs.name, t.required); ok = false; } else setErr(fields.name, errs.name, '');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.value.trim())) { setErr(fields.email, errs.email, t.email); ok = false; } else setErr(fields.email, errs.email, '');
      if (fields.subject.value.trim().length < 5) { setErr(fields.subject, errs.subject, t.subject); ok = false; } else setErr(fields.subject, errs.subject, '');
      if (fields.message.value.trim().length < 10) { setErr(fields.message, errs.message, t.message); ok = false; } else setErr(fields.message, errs.message, '');
      return ok;
    }
    Object.values(fields).forEach(inp => {
      inp.addEventListener('blur', validate);
      inp.addEventListener('input', () => { if (inp.classList.contains('input-error')) validate(); });
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!validate()) { toast(i18n[currentLang].toasts.required, 'error'); return; }
      if (form.querySelector('[name="_honey"]')?.value) return;
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = `<span>${i18n[currentLang].toasts.sending}</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 0.9s linear infinite"><circle cx="12" cy="12" r="10" stroke-dasharray="31.4 31.4"></circle></svg>`;
      if (!document.getElementById('spin-kf')) {
        const s = document.createElement('style'); s.id='spin-kf'; s.textContent='@keyframes spin{to{transform:rotate(360deg)}}'; document.head.appendChild(s);
      }
      if (statusEl) { statusEl.textContent = ''; }
      try {
        const data = new FormData(form);
        const res = await fetch('https://formsubmit.co/ajax/edwinternera2@gmail.com', { method:'POST', body:data, headers:{'Accept':'application/json'} });
        if (!res.ok) throw new Error('send error');
        btn.innerHTML = `<span>${i18n[currentLang].toasts.sent}</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 13l4 4L19 7"/></svg>`;
        btn.style.background = 'linear-gradient(135deg,#00d4aa 0%,#00b896 100%)';
        toast(i18n[currentLang].toasts.sent, 'success');
        form.reset();
        Object.values(fields).forEach(i=>i.classList.remove('input-valid','input-error'));
        Object.values(errs).forEach(e=>{e.textContent=''; e.classList.remove('visible');});
        setTimeout(()=>{ btn.disabled=false; btn.innerHTML=original; btn.style.background=''; }, 3200);
      } catch(err) {
        btn.disabled=false; btn.innerHTML=original;
        toast(i18n[currentLang].toasts.sendError, 'error');
        if (statusEl){ statusEl.textContent = currentLang==='en' ? 'Could not send. Email me at edwinternera2@gmail.com' : 'No se pudo enviar. Escríbeme a edwinternera2@gmail.com'; statusEl.style.color='#f87171'; }
      }
    });
  }

  // ===== PARALLAX — RAF lerped =====
  function initParallax() {
    if (prefersReducedMotion) return;
    const codeWindow = document.querySelector('.code-window');
    const heroBg = document.querySelector('.hero-bg');
    if (!codeWindow && !heroBg) return;

    let targetY = 0, currentY = 0, rafId = null;
    function loop() {
      currentY += (targetY - currentY) * 0.08;
      if (codeWindow) {
        const ry = -5 + currentY * 0.004;
        const rx = 4 - currentY * 0.0025;
        const ty = currentY * 0.02;
        codeWindow.style.transform = `perspective(1100px) rotateY(${ry}deg) rotateX(${rx}deg) translateY(${ty * 0.15}px)`;
      }
      if (heroBg) {
        heroBg.style.transform = `translateY(${currentY * 0.08}px)`;
      }
      if (Math.abs(targetY - currentY) > 0.1) {
        rafId = requestAnimationFrame(loop);
      } else {
        rafId = null;
      }
    }
    window.addEventListener('scroll', () => {
      if (window.scrollY < window.innerHeight * 1.2) {
        targetY = window.scrollY;
        if (!rafId) rafId = requestAnimationFrame(loop);
      }
    }, { passive: true });
  }

  // ===== Button magnetic (subtle) =====
  function initMagneticButtons() {
    if (prefersReducedMotion || window.matchMedia('(hover: none)').matches) return;
    const btns = document.querySelectorAll('.btn-primary, .btn-secondary');
    btns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.08}px, ${y * 0.18}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  // ===== SKILLS RADAR — animated draw on reveal =====
  function initSkillsRadar() {
    const canvas = document.getElementById('skillsRadar');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const skills = [
      { label: 'JavaScript', value: 85 },
      { label: 'Python', value: 75 },
      { label: 'Node.js', value: 70 },
      { label: 'MySQL', value: 65 },
      { label: 'Frontend', value: 80 },
      { label: 'Diseño', value: 75 },
      { label: 'Soporte', value: 85 },
      { label: 'Inglés', value: 70 }
    ];
    const cx = 200, cy = 200, maxR = 148;
    let progress = 0;
    let raf = null;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.8);
      canvas.width = 400 * dpr;
      canvas.height = 400 * dpr;
      canvas.style.width = '400px';
      canvas.style.height = '400px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function drawGrid(alpha = 1) {
      ctx.strokeStyle = `rgba(58,69,88,${0.5 * alpha})`;
      ctx.lineWidth = 1;
      for (let i = 1; i <= 5; i++) {
        const r = (maxR / 5) * i;
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
      }
      const step = (Math.PI * 2) / skills.length;
      for (let i = 0; i < skills.length; i++) {
        const a = i * step - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(a) * maxR, cy + Math.sin(a) * maxR);
        ctx.stroke();
      }
    }

    function drawLabels(alpha) {
      ctx.font = '600 11.5px Space Grotesk';
      ctx.fillStyle = `rgba(139,149,168,${alpha})`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const step = (Math.PI * 2) / skills.length;
      skills.forEach((s, i) => {
        const a = i * step - Math.PI / 2;
        const x = cx + Math.cos(a) * (maxR + 24);
        const y = cy + Math.sin(a) * (maxR + 24);
        ctx.fillText(s.label, x, y);
      });
    }

    function drawData(p) {
      const step = (Math.PI * 2) / skills.length;
      ctx.beginPath();
      skills.forEach((s, i) => {
        const a = i * step - Math.PI / 2;
        const r = (s.value / 100) * maxR * p;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.closePath();
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
      grad.addColorStop(0, `rgba(0,212,170,${0.28 * p})`);
      grad.addColorStop(1, `rgba(0,212,170,${0.05 * p})`);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = `rgba(0,212,170,${0.9 * p})`;
      ctx.lineWidth = 2;
      ctx.stroke();
      // dots
      ctx.fillStyle = `rgba(0,212,170,${p})`;
      skills.forEach((s, i) => {
        const a = i * step - Math.PI / 2;
        const r = (s.value / 100) * maxR * p;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = `rgba(255,255,255,${0.85 * p})`;
        ctx.beginPath(); ctx.arc(x, y, 1.6, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = `rgba(0,212,170,${p})`;
      });
    }

    function render() {
      ctx.clearRect(0, 0, 400, 400);
      const gAlpha = Math.min(1, progress * 1.6);
      drawGrid(gAlpha);
      drawLabels(gAlpha);
      drawData(progress);
    }

    function animate() {
      progress += (1 - progress) * 0.055;
      render();
      if (progress < 0.998) raf = requestAnimationFrame(animate);
      else { progress = 1; render(); }
    }

    resize();
    render();

    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          progress = 0;
          cancelAnimationFrame(raf);
          animate();
          // io.unobserve(canvas); // keep to replay if needed? unobserve for once
          io.unobserve(canvas);
        }
      });
    }, { threshold: 0.35 });
    io.observe(canvas);

    let t;
    window.addEventListener('resize', () => {
      clearTimeout(t);
      t = setTimeout(() => { resize(); render(); }, 160);
    });
  }

  // ===== INIT =====
  function init() {
    initTheme();
    initLang();
    initScrollProgress();
    const canvas = document.getElementById('particles-canvas');
    if (canvas) new ParticleSystem(canvas);
    initHeroEnter();
    initTyping();
    initScrollReveal();
    initCounters();
    initNavScroll();
    initMobileMenu();
    initActiveNav();
    initSmoothScroll();
    initContactForm();
    initParallax();
    initMagneticButtons();
    initSkillsRadar();
    initProjectFilters();
    initGithub();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
