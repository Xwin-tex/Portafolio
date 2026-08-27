# Portafolio — Edwin de Jesús Ternera Escobar

> Estudiante de Ingeniería de Software · Desarrollador Full Stack · Diseñador Multimedia · Santa Marta, Colombia

Portafolio personal llamativo, animado y distintivo para **Edwin Ternera**. Diseño dark premium con partículas interactivas, transiciones fluidas y enfoque en performance y accesibilidad.

**Live:** abre `index.html` localmente o despliega en Vercel / Netlify / GitHub Pages.  
**Contacto:** edwinternera2@gmail.com · [GitHub](https://github.com/Xwin-tex) · [LinkedIn](https://www.linkedin.com/in/edwin-ternera-699399164/)

---

## ✨ Demo

```bash
# Clonar / descargar
# Abrir directamente:
start index.html        # Windows
open index.html         # macOS
```

No requiere build. Es HTML/CSS/JS vanilla para carga instantánea.

---

## 🚀 Características

- **Hero con identidad:** typing humanizado, ventana de código `profile.json`, tarjetas flotantes con glassmorphism
- **Fondo de partículas** interactivo (canvas, DPR-aware, repulsión suave al mouse, conexiones entre puntos)
- **Animaciones profesionales:**
  - Entrada escalonada `hero-enter` con `ease-out-expo` (blur + translateY + scale)
  - `reveal` por secciones con IntersectionObserver, delay escalonado y `unobserve`
  - Parallax RAF con lerp para `code-window` y `hero-bg`
  - Botones con efecto shine + magnético sutil
  - Contadores con `easeOutExpo`
- **Secciones:** Sobre mí · Experiencia (timeline) · Habilidades (6 categorías) · Certificados · Formación · Contacto
- **Radar de habilidades** en `<canvas>` animado al entrar en viewport
- **Navegación:** scroll progress bar, nav con blur/saturate, active link por sección, menú hamburguesa animado
- **Formulario funcional** con FormSubmit AJAX (ver abajo)
- **Responsive** mobile-first, accesible (`prefers-reduced-motion`, focus states, labels, ARIA)
- **Performance:** `will-change`, `requestAnimationFrame`, throttling, sin dependencias

---

## 🛠️ Stack

- **HTML5** semántico
- **CSS3** (variables, Grid/Flex, `backdrop-filter`, keyframes, custom properties `--delay`)
- **JavaScript** vanilla (ES6+, Canvas API, IntersectionObserver, Fetch)
- **Fuentes:** Space Grotesk + JetBrains Mono (Google Fonts)

---

## 📁 Estructura

```
Open Code/
├── index.html   # Estructura y contenido (CV completo)
├── styles.css   # Sistema de diseño, animaciones, responsive
├── script.js    # Partículas, typing, reveal, parallax, radar, form
└── README.md    # Este archivo
```

### Mapa de contenido (`index.html`)

| Sección | ID | Contenido |
|---|---|---|
| Hero | `#inicio` | Nombre, typing, descripción, CTAs, social, code-window |
| Sobre mí | `#sobre-mi` | Perfil, stats animados, radar canvas |
| Experiencia | `#experiencia` | Kodland (Dic 2024-Feb 2025), Univ. Reformada (2023) |
| Habilidades | `#habilidades` | Desarrollo, Frontend, Soporte, Diseño, Ofimática, Idiomas |
| Certificados | `#certificados` | Rally 2º lugar, EF SET B2, SoftSkills HCL, Industrias 5.0 |
| Formación | `#formacion` | Ing. Software (UCC), Ing. Informática (CUR), Bachiller |
| Contacto | `#contacto` | Info + formulario FormSubmit |
| Footer | — | Copy + links |

---

## 📬 Formulario de contacto

El formulario en `index.html:405` está conectado a **FormSubmit** para que te llegue directo a `edwinternera2@gmail.com` sin backend:

```html
<form action="https://formsubmit.co/edwinternera2@gmail.com" method="POST">
  <input type="hidden" name="_captcha" value="false">
  <input type="hidden" name="_template" value="table">
  <input type="hidden" name="_subject" value="Nuevo mensaje desde tu portafolio">
  <input type="text" name="_honey" style="display:none"> <!-- anti-spam -->
  <input type="hidden" name="_autoresponse" value="¡Gracias por escribirme!...">
```

`script.js:320` (`initContactForm`) intercepta el submit y hace:

```js
fetch('https://formsubmit.co/ajax/edwinternera2@gmail.com', {
  method: 'POST',
  body: new FormData(form),
  headers: { 'Accept': 'application/json' }
})
```

Estados: `Enviando…` → `¡Mensaje enviado!` → reset. Si falla muestra error con fallback a `edwinternera2@gmail.com`.

> **Primer envío:** FormSubmit te envía un correo de activación. Ábrelo y pulsa *Confirm* una sola vez. Luego todo llega automáticamente y el remitente recibe el autoresponse.

**Alternativas previas:** se probó `mailto:` (opción 2) pero depende del cliente del visitante; se migró a FormSubmit por fiabilidad.

---

## 🎨 Sistema de diseño

```css
--bg: #0a0f1a;
--primary: #00d4aa;
--secondary: #6366f1;
--accent: #f59e0b;
--ease-out-expo: cubic-bezier(0.16,1,0.3,1);
--ease-out-quart: cubic-bezier(0.25,1,0.5,1);
```

- Radios: 8 / 12 / 20px
- Sombras: `var(--shadow-glow)` con tinte primary
- Tipografía: Sans para UI, Mono para código

### Animaciones clave (`styles.css`)

- `.reveal` → `opacity 0→1`, `translateY(24px)→0`, `blur(6px)→0`, `scale(0.98)→1`, 900ms `ease-out-expo`, delay por `--delay`
- `.hero-enter .hero-greeting/name/titles/...` → `heroIn` / `heroScaleIn` escalonados
- `.float-card` → `float` 5.2s `ease-in-out-quart` infinita
- `.code-window` → `perspective(1100px) rotateY/rotateX` con lerp en scroll

---

## ⚙️ Uso y personalización

1. **Editar contenido:** abre `index.html` y cambia textos. Todo el CV está ya volcado (perfil, formación, experiencia, competencias, idiomas).
2. **Colores:** edita `:root` en `styles.css:3`.
3. **Typing:** array `typingTexts` en `script.js:141`.
4. **Radar:** valores en `script.js:369` (`skills` array).
5. **Redes:** ya configuradas:
   - GitHub: `https://github.com/Xwin-tex`
   - LinkedIn: `https://www.linkedin.com/in/edwin-ternera-699399164/`
   - Email: `edwinternera2@gmail.com`

---

## 🚢 Despliegue

**Vercel / Netlify (recomendado, 1 clic):**
- Arrastra la carpeta o conecta el repo. No hay build command, solo publica los 3 archivos.

**GitHub Pages:**
```bash
git init
git add index.html styles.css script.js
git commit -m "feat: portafolio Edwin Ternera"
git branch -M main
git remote add origin https://github.com/Xwin-tex/portafolio.git
git push -u origin main
# Settings → Pages → Deploy from branch → main / root
```

---

## ♿ Accesibilidad y performance

- Respeta `prefers-reduced-motion` (desactiva partículas y transiciones largas)
- `scroll-behavior: smooth` con `scroll-padding-top` para nav fijo
- Imágenes no usadas; todo es vector/canvas para LCP rápido
- Partículas limitadas a 72 max y conexiones con `maxDist` para no saturar CPU
- `will-change` solo donde aporta, `passive: true` en listeners de scroll

---

## 📄 Licencia

Código del portafolio libre para uso personal de Edwin Ternera. Si lo reutilizas, deja crédito.

---

## 👤 Autor

**Edwin de Jesús Ternera Escobar** — Santa Marta, Colombia  
Ing. de Software (en curso) — Universidad Cooperativa de Colombia (2024–Actualidad)  
2º Lugar Rally Latinoamericano de Innovación 2023 (SMART_CITY) · EF SET B2 (52/100)

Hecho con código y café ☕
