
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
 * Inicializa el menú hamburguesa para dispositivos móviles
 */
function initMenuToggle() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!menuToggle || !navLinks) return;

  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('active');
  });

  // Cerrar menú al hacer clic en un enlace (móvil)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('active');
    });
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
