# Memory

## Project Overview

- **Proyecto:** Sonidos de la Ciudad - Sitio web para festival de música local
- **Tipo:** HTML + CSS + JavaScript vanilla (sin frameworks)
- **Propósito:** Proyecto académico - Programación III (2026)
- **Equipo:** 4 personas (P1=Líder, P2=Diseñador/UI, P3=JS Dev, P4=Maquetador/QA)
- **Entregas:** TAP1 (HTML), TAP2 (CSS), TAP3 (JavaScript)
- **Documentación:** Ver @GUÍA-DEL-PROYECTO.md para instrucciones del equipo

## Última sesión (2026-07-15)

### Rama activa: `feature/pardinho-inicio`
Es la rama de integración donde se juntó el trabajo de todos los integrantes sin contaminación cruzada. Desplegada en Vercel como Production Branch.

### Estado del repositorio
- **Repositorio remoto:** `https://github.com/Pardinho10/sonidos-de-la-ciudad.git`
- **Ramas remotas:** `feature/pardinho-inicio` (producción), `feature/sol-pagina-artistas`, `feature-logica-cecilia`, `feature/druiddas-entrada-contacto`, `main`
- `main` no tiene contenido relevante aún.

### Archivos por integrante (ya integrados en feature/pardinho-inicio)

| Integrante | Rama original | Archivos | Último commit usado |
|---|---|---|---|
| P1 (Pardinho) | feature/pardinho-inicio | index.html, navbar, footer, style.css | HEAD local |
| P2 (Sol) | feature/sol-pagina-artistas | artistas.html, css/artistas.css, js/artistas.js | d634802 |
| P3 (Cecilia) | feature-logica-cecilia | cronograma.html, ubicacion.html, compra.html + CSS/JS, data/events.json | 26a9d33 |
| P4 (Druiddas) | feature/druiddas-entrada-contacto | entradas.html, contacto.html + CSS, js/entradas.js | 9cdc7c2 |

### Cambios realizados en el navbar
- Botón hamburguesa reemplazado por `fa-solid fa-bars` de Font Awesome
- Botón de cierre reemplazado por `fa-solid fa-xmark`
- Ícono SVG del logo (`assets/img/index/citysound 2.svg`) agregado a la izquierda del texto "Sonidos de la Ciudad"
- CSS del logo usa `clamp(1.05rem, 2vw, 1.5rem)` + `white-space: nowrap` para escalar sin romperse
- Media query intermedio a 1150px compacta links antes del breakpoint del menú hamburguesa

### Cambios en artistas (responsive)
- Grilla: `auto-fit, minmax(280px, 1fr)` en desktop
- Tablet (≤768px): `repeat(2, 1fr)` con textos cómodos
- Móvil (≤480px): 1 sola columna con `!important` para pisar el auto-fit

### Favicon
- `assets/img/icons/favicon.ico` + PNGs (16, 32, 192, 512) + apple-touch-icon
- Creado `site.webmanifest` para PWA
- Las 7 páginas HTML tienen los `<link>` actualizados con la ruta correcta

### Vercel
- Proyecto desplegado desde `feature/pardinho-inicio`
- Para cambiar rama de producción: Settings → Git → Production Branch

### Cómo actualizar archivos de otras ramas (sin contaminación)
```bash
# Traer archivos específicos desde un commit de otra rama
git checkout <commit-hash> -- <archivo1> <archivo2> ...

# Ejemplo: traer artistas.html de Sol desde su commit d634802
git checkout d634802 -- artistas.html css/artistas.css js/artistas.js
```

## Code Style Guidelines

- HTML5 semántico (header, nav, main, section, article, footer)
- CSS con variables (custom properties) en :root
- JavaScript vanilla (sin frameworks ni librerías)
- Componentes reutilizables (navbar, footer) cargados con fetch()
- Nombres de clases en kebab-case
- Comentarios descriptivos en español

## Architecture Notes

- **Componentes compartidos:** navbar.html y footer.html se cargan dinámicamente con fetch() desde la carpeta components/
- **CSS organizado:** style.css (global) + navbar.css + footer.css + un CSS por página
- **JS organizado:** js/components/ (navbar.js, footer.js) + js/main.js + scripts por página
- **Paleta de colores:** Desert Groove (Terracotta #E2725B, Sage #8A9A5B, Charcoal #2D2D2D, Sand #F5E6CC, Ochre #CC7722)
- **Tipografías:** Fraunces (títulos) + Plus Jakarta Sans (cuerpo)
- **Efecto visual:** grain-overlay (textura sutil en todas las páginas)

## Project Structure

```
sonidos-de-la-ciudad/
├── index.html, artistas.html, cronograma.html, entradas.html, compra.html, ubicacion.html, contacto.html
├── components/     → navbar.html, footer.html (HTML parcial)
├── css/            → style.css (global) + navbar.css + footer.css + CSS por página
├── js/             → components/ (navbar.js, footer.js) + main.js + scripts por página
├── assets/         → img/ (artists, banners, index, icons) + audio/
├── data/           → events.json (TAP3)
└── site.webmanifest
```

## Common Workflows

- **Ver sitio:** Abrir index.html en navegador (necesita servidor local para fetch)
- **Iniciar servidor:** `npx serve .` o `python -m http.server` en la carpeta del proyecto
- **Git:** Trabajar en ramas feature/NOMBRE-descripcion, merge a main solo por el líder

## Key Files

- **CSS Global:** css/style.css (variables, reset, tipografía, utilidades)
- **Navbar:** components/navbar.html + css/navbar.css + js/components/navbar.js
- **Footer:** components/footer.html + css/footer.css + js/components/footer.js
- **Cronograma:** cronograma.html + css/cronograma.css (tabla de horarios, lista numerada con animaciones, badges de género, responsive 3 breakpoints)
- **Ubicación:** ubicacion.html + css/ubicacion.css (iframe Google Maps, grid transporte, animaciones hover/rotación, responsive 3 breakpoints)
- **Guía equipo:** GUÍA-DEL-PROYECTO.md

## Design Reference

- **Paleta:** Propuesta "Desert Groove" (orgánica y alternativa)
- **Inspiración:** Estilo artesanal, premium, tonos tierra, tipografías con personalidad

## Constraints

- Sin frameworks (React, Vue, Angular, etc.)
- Sin preprocessadores CSS (SASS, LESS)
- Sin librerías JS externas (jQuery, etc.)
- Solo HTML, CSS y JavaScript vanilla
- Google Fonts y Font Awesome permitidos
