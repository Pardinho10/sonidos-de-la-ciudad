# Componente Navbar — Sonidos de la Ciudad

> Documento actualizado el 15/07/2026 desde la rama `feature/pardinho-inicio`.
> Cambios: el menú hamburguesa ahora se activa también en tablets, el panel
> ocupa el 100% de la pantalla, el botón "Comprar Entradas" se mueve dentro
> del menú en tablet/móvil, el botón de cierre (X) queda fijo arriba a la
> izquierda, y se agregó un efecto de revelado circular con aparición
> escalonada de los links.

---

## HTML (`components/navbar.html`)

```html
<header>
  <div class="nav-container">
    <div class="logo">
      <a href="index.html">Sonidos de la Ciudad</a>
    </div>
    <nav>
      <button class="menu-toggle" aria-label="Abrir menú" aria-expanded="false" aria-controls="nav-links">
        <span class="hamburger"></span>
      </button>

      <ul class="nav-links" id="nav-links">
        <button class="menu-close" aria-label="Cerrar menú">
          <span class="close-icon"></span>
        </button>

        <li><a href="index.html">Inicio</a></li>
        <li><a href="artistas.html">Artistas</a></li>
        <li><a href="cronograma.html">Cronograma</a></li>
        <li><a href="entradas.html">Entradas</a></li>
        <li><a href="ubicacion.html">Ubicación</a></li>
        <li><a href="contacto.html">Contacto</a></li>

        <!-- Solo visible dentro del menú en tablet/móvil -->
        <li class="nav-cta-item">
          <a href="compra.html" class="nav-cta nav-cta--mobile">Comprar Entradas</a>
        </li>
      </ul>

      <!-- Solo visible en el navbar de escritorio -->
      <a href="compra.html" class="nav-cta nav-cta--desktop">Comprar Entradas</a>
    </nav>
  </div>
</header>
```

**Cambios:**
- El botón "Comprar Entradas" ahora existe **dos veces**: `nav-cta--desktop` (navbar normal, visible solo en desktop) y `nav-cta--mobile` (dentro de `.nav-links`, visible solo cuando el menú está desplegado en tablet/móvil). El CSS decide cuál se muestra según el ancho de pantalla — no requiere mover nodos por JS.
- Se agregó `.menu-close` (botón X) **dentro** de `.nav-links`, para poder posicionarlo fijo arriba a la izquierda del panel una vez desplegado.
- Se quitó el `.nav-overlay`: ahora que el panel ocupa el 100% de la pantalla en tablet/móvil, no queda "fondo" visible detrás que oscurecer.

---

## CSS (`css/navbar.css`)

```css
/* ============================================
   NAVBAR - Estilos del componente de navegación
   Estilo: Desert Groove (orgánico y sofisticado)
   ============================================ */

header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 50;
  backdrop-filter: blur(12px);
  background-color: rgba(255, 248, 242, 0.8);
  border-bottom: 1px solid transparent;
}

header .nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.25rem 4rem;
  height: 5rem;
}

header .logo a {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-terracotta);
  letter-spacing: -0.02em;
  margin-right: 2.5rem;
}

header .logo a:hover {
  color: var(--color-primary);
}

nav {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2.5rem;
  align-items: center;
}

.nav-links a {
  color: rgba(34, 27, 11, 0.7);
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 500;
  position: relative;
}

.nav-links a:hover {
  color: var(--color-terracotta);
}

.nav-links a.active {
  color: var(--color-terracotta);
  font-weight: 600;
}

.nav-links a.active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--color-terracotta);
  border-radius: 1px;
}

/* --- Botón CTA --- */
.nav-cta {
  background-color: var(--color-terracotta);
  color: var(--color-on-primary);
  padding: 0.75rem 2rem;
  border-radius: var(--border-radius-full);
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.nav-cta:hover {
  background-color: var(--color-primary);
  color: var(--color-on-primary);
}

/* En desktop se ve el CTA del navbar; el de dentro del menú queda oculto */
.nav-cta-item {
  display: none;
}

/* --- Botón hamburguesa (trigger, oculto en desktop) --- */
.menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 100;
}

.hamburger {
  display: block;
  width: 24px;
  height: 2px;
  background-color: var(--color-on-background);
  position: relative;
}

.hamburger::before,
.hamburger::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 2px;
  background-color: var(--color-on-background);
}

.hamburger::before {
  top: -7px;
}

.hamburger::after {
  top: 7px;
}

/* Una vez que el menú está abierto, se oculta el trigger (queda el botón X) */
.menu-toggle[aria-expanded="true"] {
  display: none;
}

/* --- Botón de cierre (X), fijo arriba a la izquierda --- */
.menu-close {
  display: none;
  position: fixed;
  top: 1.5rem;
  left: 1.5rem;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 110;
  opacity: 0;
  transform: rotate(-90deg);
  transition: opacity 0.3s ease 0.25s, transform 0.4s ease 0.25s;
}

.close-icon {
  position: relative;
  width: 22px;
  height: 22px;
}

.close-icon::before,
.close-icon::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--color-on-background);
}

.close-icon::before {
  transform: rotate(45deg);
}

.close-icon::after {
  transform: rotate(-45deg);
}

/* ============================================
   RESPONSIVE — Tablet y móvil (≤1024px)
   El comportamiento es el mismo en ambos casos:
   menú a pantalla completa activado por hamburguesa.
   ============================================ */
@media (max-width: 1024px) {
  header .nav-container {
    padding: 1rem 1.5rem;
  }

  .menu-toggle {
    display: block;
  }

  /* El CTA de escritorio desaparece; solo queda el de dentro del menú */
  .nav-cta--desktop {
    display: none;
  }

  .nav-cta-item {
    display: block;
    margin-top: 1rem;
  }

  .nav-links {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100vh;
    background-color: var(--color-background);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.75rem;
    z-index: 95;

    /* Efecto de revelado circular desde el botón hamburguesa */
    clip-path: circle(0% at calc(100% - 2.5rem) 2.75rem);
    transition: clip-path 0.6s cubic-bezier(0.65, 0, 0.35, 1);
    pointer-events: none;
  }

  .nav-links.active {
    clip-path: circle(150% at calc(100% - 2.5rem) 2.75rem);
    pointer-events: auto;
  }

  .nav-links.active .menu-close {
    display: flex;
    opacity: 1;
    transform: rotate(0deg);
  }

  .nav-links a {
    font-size: 1.25rem;
  }

  /* --- Aparición escalonada de cada item del menú --- */
  .nav-links li {
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.4s ease, transform 0.4s ease;
  }

  .nav-links.active li {
    opacity: 1;
    transform: translateY(0);
  }

  .nav-links.active li:nth-child(2) { transition-delay: 0.15s; }
  .nav-links.active li:nth-child(3) { transition-delay: 0.20s; }
  .nav-links.active li:nth-child(4) { transition-delay: 0.25s; }
  .nav-links.active li:nth-child(5) { transition-delay: 0.30s; }
  .nav-links.active li:nth-child(6) { transition-delay: 0.35s; }
  .nav-links.active li:nth-child(7) { transition-delay: 0.40s; }
  .nav-links.active li:nth-child(8) { transition-delay: 0.45s; }
}

/* Bloqueo de scroll del body cuando el menú está abierto */
body.nav-open {
  overflow: hidden;
}
```

**Cambios clave:**
- **Un solo breakpoint (`≤1024px`)** que trata igual a tablets y móviles: antes el hamburguesa solo se activaba a 768px, por eso no aparecía en tablets.
- `.nav-links` pasa a `inset: 0` + `width: 100%` + `height: 100vh` → ocupa toda la pantalla en vez del panel lateral de 70%/300px.
- **Revelado circular** (`clip-path: circle(...)`) que nace desde la esquina donde está el botón hamburguesa y crece hasta cubrir toda la pantalla. Es una alternativa más elegante al slide lateral típico.
- **Aparición escalonada**: cada `<li>` (6 links + el CTA) entra con un pequeño `transition-delay` creciente, dándole un efecto prolijo tipo "cascada" en vez de que todo aparezca de golpe.
- `.nav-cta--desktop` se oculta y `.nav-cta-item` (dentro del menú) se muestra en `≤1024px` — el botón "Comprar Entradas" migra al menú desplegado como pediste.
- Botón `.menu-close` fijo en `top: 1.5rem; left: 1.5rem` (arriba a la izquierda), con una pequeña animación de rotación + fade al aparecer, coherente con el resto de las transiciones.
- El trigger hamburguesa (`.menu-toggle`) se oculta automáticamente cuando `aria-expanded="true"`, así no conviven dos botones en pantalla a la vez.

---

## JavaScript (`js/components/navbar.js`)

```js
/**
 * navbar.js - Carga el componente navbar mediante fetch
 * y gestiona el menú hamburguesa para tablet y móvil
 */

document.addEventListener('DOMContentLoaded', () => {
  const navbarContainer = document.getElementById('navbar-container');

  if (!navbarContainer) return;

  fetch('components/navbar.html')
    .then(response => {
      if (!response.ok) throw new Error('Error al cargar el navbar');
      return response.text();
    })
    .then(html => {
      navbarContainer.innerHTML = html;
      initMenuToggle();
      highlightCurrentPage();
    })
    .catch(error => console.error('Error:', error));
});

/**
 * Inicializa el menú hamburguesa: apertura/cierre, bloqueo de
 * scroll, cierre con Escape y manejo de foco accesible
 */
function initMenuToggle() {
  const menuToggle = document.querySelector('.menu-toggle');
  const menuClose = document.querySelector('.menu-close');
  const navLinks = document.querySelector('.nav-links');

  if (!menuToggle || !navLinks) return;

  const firstLink = navLinks.querySelector('a');

  function openMenu() {
    menuToggle.setAttribute('aria-expanded', 'true');
    navLinks.classList.add('active');
    document.body.classList.add('nav-open');
    // Espera a que termine el revelado circular antes de mover el foco
    setTimeout(() => firstLink?.focus(), 350);
  }

  function closeMenu() {
    menuToggle.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('active');
    document.body.classList.remove('nav-open');
    menuToggle.focus();
  }

  menuToggle.addEventListener('click', openMenu);
  menuClose?.addEventListener('click', closeMenu);

  // Cerrar menú al hacer clic en un enlace (tablet/móvil)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Cerrar menú con la tecla Escape
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    }
  });
}

/**
 * Resalta el enlace de la página actual en el navbar
 */
function highlightCurrentPage() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-links a');

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
}
```

**Cambios clave:**
- Ahora hay **dos botones separados**: `.menu-toggle` (hamburguesa, abre) y `.menu-close` (X, cierra) — cada uno con su propio listener, más simple que alternar un solo botón con lógica condicional.
- El foco al primer link se retrasa `350ms` para esperar a que termine la animación de revelado circular; si se movía antes, el scroll saltaba abruptamente mientras el clip-path seguía animando.
- Al cerrar (por link, X o Escape) el foco vuelve al botón hamburguesa, manteniendo la navegación por teclado prolija.
- Se quitó toda la lógica del overlay (ya no existe, ver sección HTML).

---

## Resumen de lo corregido

| Problema reportado | Solución aplicada |
|---|---|
| El menú no se mostraba en tablets | Unificado el breakpoint del hamburguesa a `≤1024px` (antes solo `≤768px`) |
| El panel no ocupaba el 100% | `.nav-links` ahora usa `inset: 0` + `width: 100%` + `height: 100vh` |
| Faltaba un efecto de aparición/desaparición | Revelado circular (`clip-path`) + aparición escalonada de los links |
| "Comprar Entradas" debía moverse al menú en tablet/móvil | CTA duplicado: versión desktop en el navbar, versión mobile dentro de `.nav-links`, cada una mostrada/ocultada por CSS según el ancho |
| La X debía quedar arriba a la izquierda | Nuevo botón `.menu-close` fijo en `top: 1.5rem; left: 1.5rem` |

## Notas técnicas
- `clip-path: circle()` tiene soporte amplio en navegadores modernos (Chrome, Firefox, Safari, Edge actuales). Si necesitás soportar navegadores muy viejos, avisame y armo un fallback con `opacity` + `scale` en vez del círculo.
- Como el CTA ahora existe duplicado en el DOM (desktop/mobile), si en el futuro cambian el texto o el link del botón, hay que actualizarlo en los **dos** lugares del HTML.
- El delay de `350ms` en el JS antes de mover el foco está sincronizado con la duración de `0.6s` del `clip-path`, pero devuelve el foco un poco antes de que termine la animación completa para que se sienta responsivo sin cortar la transición visual.
