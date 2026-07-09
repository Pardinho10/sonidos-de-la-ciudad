# Memory

## Project Overview

- **Proyecto:** Sonidos de la Ciudad - Sitio web para festival de música local
- **Tipo:** HTML + CSS + JavaScript vanilla (sin frameworks)
- **Propósito:** Proyecto académico - Programación III (2026)
- **Equipo:** 4 personas (P1=Líder, P2=Diseñador/UI, P3=JS Dev, P4=Maquetador/QA)
- **Entregas:** TAP1 (HTML), TAP2 (CSS), TAP3 (JavaScript)
- **Documentación:** Ver @GUÍA-DEL-PROYECTO.md para instrucciones del equipo

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
├── js/             → components/ (navbar.js, footer.js) + main.js
├── assets/         → img/ (artists, banners, icons) + audio/
└── data/           → events.json (TAP3)
```

## Common Workflows

- **Ver sitio:** Abrir index.html en navegador (necesita servidor local para fetch)
- **Iniciar servidor:** `npx serve .` o `python -m http.server` en la carpeta del proyecto
- **Git:** Trabajar en ramas feature/NOMBRE-descripcion, merge a main solo por el líder

## Key Files

- **CSS Global:** css/style.css (variables, reset, tipografía, utilidades)
- **Navbar:** components/navbar.html + css/navbar.css + js/components/navbar.js
- **Footer:** components/footer.html + css/footer.css + js/components/footer.js
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
