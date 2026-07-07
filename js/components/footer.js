/**
 * footer.js - Carga el componente footer mediante fetch
 */

document.addEventListener('DOMContentLoaded', () => {
  const footerContainer = document.getElementById('footer-container');

  if (!footerContainer) return;

  fetch('components/footer.html')
    .then(response => {
      if (!response.ok) throw new Error('Error al cargar el footer');
      return response.text();
    })
    .then(html => {
      footerContainer.innerHTML = html;
    })
    .catch(error => console.error('Error:', error));
});
