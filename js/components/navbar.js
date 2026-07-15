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