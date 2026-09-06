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
      'about.tag': 'Conóceme', 'about.title': 'Sobre <span class="highlight">Mí</span>',
      'about.p1': 'Soy <strong>Edwin de Jesús Ternera Escobar</strong>, estudiante de <strong>Ingeniería de Software</strong> en la Universidad Cooperativa de Colombia (2024-Actualidad). Mi formación combina bases sólidas en programación, soporte técnico y mantenimiento de hardware/software, complementada con experiencia en gestión de proyectos y entornos educativos tecnológicos.',
      'about.p2': 'Mi perfil es híbrido: desarrollo <strong>web full-stack</strong> (JavaScript, Python, Node.js, MySQL) y <strong>diseño multimedia</strong> (Photoshop, Illustrator, Premiere, After Effects). Esta dualidad me permite abordar proyectos desde la lógica hasta la experiencia visual.',
      'about.p3': 'He trabajado coordinando proyectos en la Corporación Universitaria Reformada y gestionando clases de prueba en <strong>Kodland</strong>, plataforma educativa de programación. Obtuve el <strong>2º lugar en el Rally Latinoamericano de Innovación 2023</strong> (Categoría Innovación).',
      'about.stat1': 'Años experiencia', 'about.stat2': 'Tecnologías', 'about.stat3': 'Certificaciones', 'about.stat4': 'Premio innovación',
      'projects.tag': 'Portafolio', 'projects.title': 'Proyectos <span class="highlight">Destacados</span>', 'projects.desc': 'Selección de trabajos que combinan desarrollo, soporte y diseño. Filtra por área y explora código y demos.',
      'projects.filterAll': 'Todos', 'projects.filterSupport': 'Soporte', 'projects.filterDesign': 'Diseño',
      'projects.code': 'Código', 'projects.p1.badge': 'Rally 2023 · 2º Lugar', 'projects.p1.title': 'SMART_CITY — Rally Innovación', 'projects.p1.desc': 'Prototipo ganador (2º lugar) en Rally Latinoamericano de Innovación. Solución IoT para gestión urbana con dashboard y sensores.', 'projects.p1.tag4': 'Investigación', 'projects.p1.demo': 'Demo privado',
      'projects.p2.title': 'Dashboard Analítico — Streamlit', 'projects.p2.desc': 'Dashboard interactivo con Python y Streamlit para visualización de datos y reportes. Filtros dinámicos y exportación.', 'projects.p2.cta': 'Solicitar demo →',
      'projects.p3.title': 'Este Portafolio', 'projects.p3.desc': 'Portafolio vanilla JS con partículas, parallax, radar canvas y FormSubmit. 100% responsive, sin frameworks.', 'projects.p3.live': 'Ver live →',
      'projects.p4.badge': 'Soporte · Windows', 'projects.p4.title': 'Kit Soporte Técnico', 'projects.p4.desc': 'Guías y scripts para instalación, mantenimiento HW/SW y optimización de procesos administrativos (caso CUR).', 'projects.p4.tag2': 'Soporte', 'projects.p4.tag3': 'Redes', 'projects.p4.tag4': 'Documentación', 'projects.p4.link': 'Ver guías',
      'projects.p5.title': 'Identidad & Motion', 'projects.p5.desc': 'Piezas en Photoshop/Illustrator y edición en Premiere/After Effects para marcas y contenido educativo.', 'projects.p5.link': 'Ver trabajos',
      'projects.p6.badge': 'Gestión · CUR', 'projects.p6.title': 'Sistema de Gestión Documental', 'projects.p6.desc': 'Digitalización y organización documental + informes técnicos para la Corporación Universitaria Reformada.', 'projects.p6.tag2': 'Gestión', 'projects.p6.tag3': 'Informes', 'projects.p6.tag4': 'Procesos', 'projects.p6.link': 'Proyecto interno',
      'exp.tag': 'Trayectoria', 'exp.title': 'Experiencia <span class="highlight">Profesional</span>',
      'exp.role1': 'Gerente de Clases de Prueba', 'exp.r1b1': 'Coordinación y gestión de clases de prueba para estudiantes interesados en programación', 'exp.r1b2': 'Acompañamiento y orientación a nuevos estudiantes en la plataforma educativa', 'exp.r1b3': 'Organización de agendas y control de asistencia a sesiones demostrativas', 'exp.r1b4': 'Resolución de dudas técnicas y operativas en clases virtuales', 'exp.r1b5': 'Seguimiento a potenciales estudiantes para fortalecer su proceso de inscripción', 'exp.r1b6': 'Comunicación efectiva con docentes y equipo académico',
      'exp.date2': 'Ene 2023 - Dic 2023', 'exp.role2': 'Ayudante Administrativo / Auxiliar Gestión Proyectos', 'exp.company2': 'Corporación Universitaria Reformada <span class="badge">Educación</span>',
      'exp.r2b1': 'Coordinación y seguimiento de proyectos académicos', 'exp.r2b2': 'Organización y digitalización de documentación', 'exp.r2b3': 'Elaboración de informes técnicos', 'exp.r2b4': 'Optimización de procesos administrativos',
      'skills.title': 'Habilidades <span class="highlight">Técnicas</span>', 'skills.cat1': 'Desarrollo & Backend', 'skills.cat2': 'Frontend & Web', 'skills.cat3': 'Soporte & Sistemas', 'skills.cat4': 'Diseño & Multimedia', 'skills.cat5': 'Ofimática & Gestión', 'skills.cat6': 'Idiomas & Soft Skills',
      'certs.tag': 'Validados', 'certs.title': 'Certificados <span class="highlight">Destacados</span>',
      'edu.tag': 'Académica', 'edu.title': 'Formación <span class="highlight">Académica</span>',
      'testimonials.tag': 'Confianza', 'testimonials.title': 'Lo que dicen <span class="highlight">de mí</span>',
      'testimonials.t1.text': '“Edwin optimizó nuestros procesos documentales y mejoró la entrega a tiempo en un 78%. Muy proactivo y organizado.”',
      'testimonials.t1.role': 'Equipo de Proyectos · 2023',
      'testimonials.t2.text': '“Como Trial Manager en Kodland, Edwin acompañó a cada estudiante con paciencia y resolvió dudas técnicas al instante.”',
      'testimonials.t2.role': 'Coordinación Académica · 2024-2025',
      'testimonials.t3.text': '“Su prototipo SMART_CITY destacó por viabilidad e innovación. Merecido 2º lugar en el Rally.”',
      'contact.tag': 'Hablemos', 'contact.title': 'Contacto', 'contact.h3': '¿Tienes un proyecto en mente?', 'contact.p': 'Estoy abierto a oportunidades de prácticas, colaboraciones o proyectos freelance. No dudes en escribirme.',
      'contact.copy': 'Copiar email', 'contact.copied': '¡Copiado!', 'contact.calendly': 'Agendar en Calendly →',
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
      'about.tag': 'About me', 'about.title': 'About <span class="highlight">Me</span>',
      'about.p1': 'I am <strong>Edwin de Jesús Ternera Escobar</strong>, a <strong>Software Engineering</strong> student at Universidad Cooperativa de Colombia (2024–Present). My background combines solid foundations in programming, tech support and hardware/software maintenance, complemented by project management and educational tech experience.',
      'about.p2': 'My profile is hybrid: <strong>full-stack web development</strong> (JavaScript, Python, Node.js, MySQL) and <strong>multimedia design</strong> (Photoshop, Illustrator, Premiere, After Effects). This duality lets me tackle projects from logic to visual experience.',
      'about.p3': 'I coordinated projects at Corporación Universitaria Reformada and managed trial classes at <strong>Kodland</strong>, a programming education platform. I earned <strong>2nd place at the 2023 Latin American Innovation Rally</strong> (Innovation Category).',
      'about.stat1': 'Years experience', 'about.stat2': 'Technologies', 'about.stat3': 'Certificates', 'about.stat4': 'Innovation award',
      'projects.tag': 'Portfolio', 'projects.title': 'Featured <span class="highlight">Projects</span>', 'projects.desc': 'A selection of work blending development, support and design. Filter by area and explore code and demos.',
      'projects.filterAll': 'All', 'projects.filterSupport': 'Support', 'projects.filterDesign': 'Design',
      'projects.code': 'Code', 'projects.p1.badge': 'Rally 2023 · 2nd Place', 'projects.p1.title': 'SMART_CITY — Innovation Rally', 'projects.p1.desc': 'Award-winning prototype (2nd place) at Latin American Innovation Rally. IoT solution for urban management with dashboard and sensors.', 'projects.p1.tag4': 'Research', 'projects.p1.demo': 'Private demo',
      'projects.p2.title': 'Analytics Dashboard — Streamlit', 'projects.p2.desc': 'Interactive dashboard with Python and Streamlit for data visualization and reporting. Dynamic filters and export.', 'projects.p2.cta': 'Request demo →',
      'projects.p3.title': 'This Portfolio', 'projects.p3.desc': 'Vanilla JS portfolio with particles, parallax, canvas radar and FormSubmit. Fully responsive, no frameworks.', 'projects.p3.live': 'View live →',
      'projects.p4.badge': 'Support · Windows', 'projects.p4.title': 'Tech Support Kit', 'projects.p4.desc': 'Guides and scripts for installation, HW/SW maintenance and optimization of administrative processes (CUR case).', 'projects.p4.tag2': 'Support', 'projects.p4.tag3': 'Networking', 'projects.p4.tag4': 'Documentation', 'projects.p4.link': 'View guides',
      'projects.p5.title': 'Identity & Motion', 'projects.p5.desc': 'Assets in Photoshop/Illustrator and editing in Premiere/After Effects for brands and educational content.', 'projects.p5.link': 'View works',
      'projects.p6.badge': 'Management · CUR', 'projects.p6.title': 'Document Management System', 'projects.p6.desc': 'Digitization and document organization + technical reports for Corporación Universitaria Reformada.', 'projects.p6.tag2': 'Management', 'projects.p6.tag3': 'Reports', 'projects.p6.tag4': 'Processes', 'projects.p6.link': 'Internal project',
      'exp.tag': 'Career', 'exp.title': 'Professional <span class="highlight">Experience</span>',
      'exp.role1': 'Trial Class Manager', 'exp.r1b1': 'Coordination and management of trial classes for students interested in programming', 'exp.r1b2': 'Support and guidance for new students on the educational platform', 'exp.r1b3': 'Scheduling and attendance tracking for demo sessions', 'exp.r1b4': 'Resolving technical and operational doubts in virtual classes', 'exp.r1b5': 'Follow-up with prospective students to strengthen enrollment', 'exp.r1b6': 'Effective communication with teachers and academic team',
      'exp.date2': 'Jan 2023 - Dec 2023', 'exp.role2': 'Administrative Assistant / Project Management Assistant', 'exp.company2': 'Corporación Universitaria Reformada <span class="badge">Education</span>',
      'exp.r2b1': 'Coordination and follow-up of academic projects', 'exp.r2b2': 'Organization and digitization of documentation', 'exp.r2b3': 'Preparation of technical reports', 'exp.r2b4': 'Optimization of administrative processes',
      'skills.title': 'Technical <span class="highlight">Skills</span>', 'skills.cat1': 'Development & Backend', 'skills.cat2': 'Frontend & Web', 'skills.cat3': 'Support & Systems', 'skills.cat4': 'Design & Multimedia', 'skills.cat5': 'Office & Management', 'skills.cat6': 'Languages & Soft Skills',
      'certs.tag': 'Validated', 'certs.title': 'Featured <span class="highlight">Certificates</span>',
      'edu.tag': 'Academic', 'edu.title': 'Academic <span class="highlight">Background</span>',
      'testimonials.tag': 'Trust', 'testimonials.title': 'What they say <span class="highlight">about me</span>',
      'testimonials.t1.text': '“Edwin optimized our document processes and improved on-time delivery to 78%. Very proactive and organized.”',
      'testimonials.t1.role': 'Project Team · 2023',
      'testimonials.t2.text': '“As Trial Manager at Kodland, Edwin supported each student patiently and solved tech doubts instantly.”',
      'testimonials.t2.role': 'Academic Coordination · 2024-2025',
      'testimonials.t3.text': '“His SMART_CITY prototype stood out for feasibility and innovation. Well-deserved 2nd place.”',
      'contact.tag': "Let's talk", 'contact.title': 'Contact', 'contact.h3': 'Have a project in mind?', 'contact.p': 'I am open to internships, collaborations or freelance projects. Feel free to reach out.',
      'contact.copy': 'Copy email', 'contact.copied': 'Copied!', 'contact.calendly': 'Schedule on Calendly →',
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

  // ===== PROJECTS FILTER — FLIP (no display:none flash) =====
  function initProjectFilters() {
    const btns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');
    const grid = document.querySelector('.projects-grid');
    if (!btns.length || !cards.length) return;
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        btns.forEach(b => { b.classList.toggle('active', b === btn); b.setAttribute('aria-selected', b === btn ? 'true' : 'false'); });
        // FLIP: fade+scale, keep layout stable
        cards.forEach(card => {
          const show = filter === 'all' || card.dataset.category === filter;
          card.style.transition = 'opacity 320ms cubic-bezier(0.25,1,0.5,1), transform 420ms cubic-bezier(0.16,1,0.3,1)';
          if (show) {
            card.classList.remove('is-hidden');
            card.style.display = '';
            requestAnimationFrame(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; });
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.96)';
            card.classList.add('is-hidden');
            setTimeout(() => { if (card.classList.contains('is-hidden')) { card.style.display='none'; } }, 340);
          }
        });
        if (grid) { grid.style.opacity='0.6'; setTimeout(()=>grid.style.opacity='1', 220); }
      });
    });
  }

  // ===== PROJECT MODAL =====
  function initProjectModal() {
    const modal = document.getElementById('projectModal');
    const backdrop = document.getElementById('modalBackdrop');
    const closeBtn = document.getElementById('modalClose');
    const titleEl = document.getElementById('modalTitle');
    const descEl = document.getElementById('modalDesc');
    const tagsEl = document.getElementById('modalTags');
    const linksEl = document.getElementById('modalLinks');
    const headEl = document.getElementById('modalHead');
    const iconEl = document.getElementById('modalIcon');
    if (!modal) return;
    const data = {
      0: { icon:'🏙️', title: i18n[currentLang]['projects.p1.title'], desc: i18n[currentLang]['projects.p1.desc'] + ' — ' + (currentLang==='en' ? 'Case: urban sensors, real-time dashboard, Node/MySQL backend. Result: 2nd place.' : 'Caso: sensores urbanos, dashboard en tiempo real, backend Node/MySQL. Resultado: 2º lugar.'), tags:['Node.js','MySQL','IoT','Research'], grad:'linear-gradient(135deg,#00d4aa,#6366f1)', links:'<a href=\"https://github.com/Xwin-tex\" target=\"_blank\" rel=\"noopener\" class=\"btn btn-primary\">Code</a> <span class=\"btn btn-secondary\" style=\"opacity:0.6;pointer-events:none\">Private demo</span>' },
      1: { icon:'📊', title: i18n[currentLang]['projects.p2.title'], desc: i18n[currentLang]['projects.p2.desc'], tags:['Python','Streamlit','MySQL','Pandas'], grad:'linear-gradient(135deg,#0ea5e9,#00d4aa)', links:'<a href="https://github.com/Xwin-tex" target="_blank" rel="noopener" class="btn btn-primary">Code</a> <a href="#contacto" class="btn btn-secondary modal-cta-contact">'+ (currentLang==='en'?'Request demo':'Solicitar demo') +' →</a>' },
      2: { icon:'💻', title: i18n[currentLang]['projects.p3.title'], desc: i18n[currentLang]['projects.p3.desc'], tags:['HTML5','CSS3','JavaScript','Canvas'], grad:'linear-gradient(135deg,#6366f1,#a78bfa)', links:'<a href=\"https://github.com/Xwin-tex/Portafolio\" target=\"_blank\" rel=\"noopener\" class=\"btn btn-primary\">Code</a> <a href=\"#inicio\" class=\"btn btn-secondary\">Live</a>' },
      3: { icon:'🔧', title: i18n[currentLang]['projects.p4.title'], desc: i18n[currentLang]['projects.p4.desc'], tags:['Windows','Support','Networking','Docs'], grad:'linear-gradient(135deg,#f59e0b,#ef4444)', links:'<a href=\"https://github.com/Xwin-tex\" target=\"_blank\" rel=\"noopener\" class=\"btn btn-primary\">Guides</a>' },
      4: { icon:'🎨', title: i18n[currentLang]['projects.p5.title'], desc: i18n[currentLang]['projects.p5.desc'], tags:['Photoshop','Illustrator','Premiere','After Effects'], grad:'linear-gradient(135deg,#ec4899,#8b5cf6)', links:'<a href=\"https://github.com/Xwin-tex\" target=\"_blank\" rel=\"noopener\" class=\"btn btn-primary\">Works</a>' },
      5: { icon:'🗂️', title: i18n[currentLang]['projects.p6.title'], desc: i18n[currentLang]['projects.p6.desc'], tags:['Excel','Management','Reports','Processes'], grad:'linear-gradient(135deg,#14b8a6,#0ea5e9)', links:'<span class=\"btn btn-secondary\" style=\"opacity:0.6\">Internal</span>' }
    };
    function open(idx) {
      const d = data[idx];
      if (!d) return;
      // refresh title/desc with current lang
      d.title = i18n[currentLang][`projects.p${idx+1}.title`] || d.title;
      d.desc = i18n[currentLang][`projects.p${idx+1}.desc`] || d.desc;
      iconEl.textContent = d.icon; titleEl.textContent = d.title; descEl.textContent = d.desc;
      headEl.style.background = d.grad;
      tagsEl.innerHTML = d.tags.map(t=>`<span class="skill-tag" style="background:rgba(255,255,255,0.08)">${t}</span>`).join('');
      linksEl.innerHTML = d.links;
      linksEl.querySelector('.modal-cta-contact')?.addEventListener('click', ()=>{ close(); setTimeout(()=>document.getElementById('contacto')?.scrollIntoView({behavior:'smooth'}), 120); });
      modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
    }
    function close(){ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
    document.querySelectorAll('.project-card').forEach((card, i) => {
      card.style.cursor='pointer';
      card.addEventListener('click', () => open(i));
      card.setAttribute('role','button'); card.setAttribute('tabindex','0');
      card.addEventListener('keydown', (e)=>{ if(e.key==='Enter'||e.key===' ') { e.preventDefault(); open(i); } });
    });
    backdrop?.addEventListener('click', close);
    closeBtn?.addEventListener('click', close);
    document.addEventListener('keydown', (e)=>{ if(e.key==='Escape' && modal.classList.contains('open')) close(); });
  }

  function initCopyEmail() {
    const btn = document.getElementById('copyEmailBtn');
    if (!btn) return;
    btn.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText('edwinternera2@gmail.com'); toast(i18n[currentLang]['contact.copied'] || 'Copied!', 'success'); btn.textContent = i18n[currentLang]['contact.copied']; setTimeout(()=> btn.textContent = i18n[currentLang]['contact.copy'], 1800); } catch { window.location.href='mailto:edwinternera2@gmail.com'; }
    });
  }

  // ===== THEME TOGGLE =====
  function initTheme() {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    const saved = localStorage.getItem('theme');
    const mql = window.matchMedia('(prefers-color-scheme: light)');
    const prefersLight = mql.matches;
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
    // sync if user changes system theme and has no explicit saved preference
    mql.addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        const next = e.matches ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        document.querySelector('meta[name=\"theme-color\"]')?.setAttribute('content', next === 'light' ? '#f8fafc' : '#0a0f1a');
      }
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
      document.querySelector('meta[property="og:locale"]')?.setAttribute('content', lang === 'en' ? 'en_US' : 'es_CO');
      btn.textContent = lang === 'es' ? 'EN' : 'ES';
      btn.setAttribute('aria-label', lang === 'es' ? 'Switch to English' : 'Cambiar a español');
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const val = i18n[lang][key];
        if (val !== undefined) el.textContent = val;
      });
      document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        const val = i18n[lang][key];
        if (val !== undefined) el.innerHTML = val;
      });
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

  // ===== GITHUB API — cached =====
  async function initGithub() {
    const grid = document.getElementById('githubGrid');
    if (!grid) return;
    const langColors = { JavaScript:'#f1e05a', Python:'#3572A5', HTML:'#e34c26', CSS:'#563d7c', TypeScript:'#2b7489', Java:'#b07219', 'C++':'#f34b7d', Shell:'#89e051', Dockerfile:'#384d54' };
    const cacheKey = 'github_cache_Xwin-tex';
    const cacheTTL = 10 * 60 * 1000; // 10 min
    function renderRepos(repos) {
      grid.innerHTML = '';
      repos.forEach(r => {
        const card = document.createElement('article');
        card.className = 'github-card reveal visible';
        const langDot = r.language ? `<span class="dot-lang" style="background:${langColors[r.language]||'#00d4aa'}"></span>${r.language}` : '';
        card.innerHTML = `
          <h3><a href="${r.html_url}" target="_blank" rel="noopener">${r.name}</a></h3>
          <p>${r.description ? r.description.slice(0,140) : (currentLang==='en' ? 'No description' : 'Sin descripción')}</p>
          <div class="github-meta">
            ${langDot ? `<span>${langDot}</span>` : ''}
            <span>⭐ ${r.stargazers_count}</span>
            <span>⑂ ${r.forks_count}</span>
            <span>${new Date(r.updated_at).toLocaleDateString(currentLang==='en'?'en-US':'es-CO')}</span>
          </div>`;
        grid.appendChild(card);
      });
    }
    // try cache
    try {
      const cached = JSON.parse(sessionStorage.getItem(cacheKey) || 'null');
      if (cached && Date.now() - cached.t < cacheTTL && Array.isArray(cached.data) && cached.data.length) {
        renderRepos(cached.data);
        return;
      }
    } catch {}
    // also try localStorage fallback if rate-limited
    try {
      const res = await fetch('https://api.github.com/users/Xwin-tex/repos?sort=updated&per_page=12');
      if (!res.ok) throw new Error('github error ' + res.status);
      let repos = await res.json();
      repos = repos.filter(r => !r.fork);
      if (!repos.length) repos = await (await fetch('https://api.github.com/users/Xwin-tex/repos?per_page=6')).json();
      repos = repos.slice(0,6);
      // sanitize before cache
      const toCache = repos.map(r => ({ name:r.name, description:r.description, language:r.language, stargazers_count:r.stargazers_count, forks_count:r.forks_count, updated_at:r.updated_at, html_url:r.html_url, fork:r.fork }));
      try { sessionStorage.setItem(cacheKey, JSON.stringify({ t: Date.now(), data: toCache })); localStorage.setItem(cacheKey, JSON.stringify({ t: Date.now(), data: toCache })); } catch {}
      renderRepos(toCache);
    } catch (e) {
      // fallback to localStorage cache
      try {
        const fallback = JSON.parse(localStorage.getItem(cacheKey) || 'null');
        if (fallback && fallback.data) { renderRepos(fallback.data); return; }
      } catch {}
      grid.innerHTML = `<div class="github-loading" style="flex-direction:column"><span>${i18n[currentLang]['github.error']}</span><a href="https://github.com/Xwin-tex" target="_blank" rel="noopener" class="btn btn-secondary" style="margin-top:8px">github.com/Xwin-tex</a></div>`;
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

  // ===== MOBILE MENU — spring feel + a11y =====
  function initMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const links = document.querySelector('.nav-links');
    if (!toggle || !links) return;
    const focusable = () => Array.from(links.querySelectorAll('a, button')).filter(el => !el.hasAttribute('hidden'));
    function close() {
      toggle.classList.remove('active');
      links.classList.remove('open');
      document.body.style.overflow = '';
      toggle.setAttribute('aria-expanded', 'false');
    }
    function open() {
      links.classList.add('open');
      toggle.classList.add('active');
      document.body.style.overflow = 'hidden';
      toggle.setAttribute('aria-expanded', 'true');
      focusable()[0]?.focus();
    }
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'nav-links');
    links.id = 'nav-links';
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.contains('open');
      if (isOpen) close(); else open();
    });
    links.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', close);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && links.classList.contains('open')) close();
      if (e.key === 'Tab' && links.classList.contains('open')) {
        const els = focusable();
        if (!els.length) return;
        const first = els[0], last = els[els.length-1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    document.addEventListener('click', (e) => {
      if (links.classList.contains('open') && !links.contains(e.target) && !toggle.contains(e.target)) close();
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
            const isActive = link.getAttribute('href') === `#${id}`;
            link.classList.toggle('active', isActive);
            if (isActive) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
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

    // tooltip
    const tip = document.createElement('div');
    tip.style.cssText = 'position:absolute;background:var(--bg-card);border:1px solid var(--border);padding:6px 10px;border-radius:8px;font-size:0.78rem;font-weight:600;pointer-events:none;opacity:0;transform:translate(-50%,-120%);transition:opacity 120ms;box-shadow:0 8px 20px rgba(0,0,0,0.25);white-space:nowrap';
    canvas.parentElement.style.position='relative';
    canvas.parentElement.appendChild(tip);
    canvas.addEventListener('mousemove', (e)=>{
      const rect = canvas.getBoundingClientRect();
      // map to 400x400 coordinate (canvas style 400px)
      const x = (e.clientX - rect.left) * (400 / rect.width);
      const y = (e.clientY - rect.top) * (400 / rect.height);
      const step = (Math.PI*2)/skills.length;
      let closest = null, minD=18;
      skills.forEach((s,i)=>{
        const a = i*step - Math.PI/2;
        const r = (s.value/100)*maxR * progress;
        const px = cx + Math.cos(a)*r, py = cy + Math.sin(a)*r;
        const d = Math.hypot(x-px, y-py);
        if (d < minD) { minD=d; closest=s; }
      });
      if (closest) { tip.textContent = `${closest.label}: ${closest.value}%`; tip.style.left = e.clientX - rect.left + 'px'; tip.style.top = e.clientY - rect.top + 'px'; tip.style.opacity='1'; }
      else tip.style.opacity='0';
    });
    canvas.addEventListener('mouseleave', ()=> tip.style.opacity='0');

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
    initProjectModal();
    initCopyEmail();
    initGithub();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
