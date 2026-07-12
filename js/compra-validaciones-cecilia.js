
document.addEventListener('DOMContentLoaded', () => {
 
  const patrones = {
    'comprador-nombre-completo': {
        regex: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,}$/,
        mensajeError: 'Solo letras y espacios (mínimo 3 caracteres).'
        },
    'pago-nombre': {
      regex: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,}$/,
      mensajeError: 'Solo letras y espacios (mínimo 3 caracteres).'
    },
    'pago-dni': {
      regex: /^[0-9]{7,8}$/,
      mensajeError: 'El DNI debe tener 7 u 8 dígitos.'
    },
    'tarjeta-numero': {
      regex: /^[0-9]{16}$/,
      mensajeError: 'Debe tener exactamente 16 dígitos.'
    },
    'tarjeta-vence': {
      regex: /^(0[1-9]|1[0-2])\/[0-9]{2}$/,
      mensajeError: 'Formato MM/AA (ej: 09/28).'
    },
    'tarjeta-ccv': {
      regex: /^[0-9]{3,4}$/,
      mensajeError: 'Debe tener 3 o 4 dígitos.'
    }

  };
 
  Object.keys(patrones).forEach(id => {
    const input = document.getElementById(id);
    if (!input) return;
 
    input.addEventListener('input', () => validarCampo(id));
    input.addEventListener('blur', () => validarCampo(id));
  });
 
  function validarCampo(id) {
    const input = document.getElementById(id);
    const span = document.getElementById(`error-${id}`);
    const config = patrones[id];
 
    if (!input || !span || !config) return false;
 
    const valor = input.value.trim();
 
    if (valor === '') {
      input.style.borderColor = '#ccc';
      span.textContent = '';
      return false;
    }
 
    const esValido = config.regex.test(valor);
 
    if (esValido) {
      input.style.borderColor = '#4caf50';
      span.textContent = '';
    } else {
      input.style.borderColor = '#e53935';
      span.textContent = config.mensajeError;
    }
 
    return esValido;
  }
 
  // Función reutilizable por si alguien del equipo necesita
  // saber si TODOS los campos con Regex están validados.
  window.validarTodosLosCamposCecilia = function () {
    let todosValidos = true;
    Object.keys(patrones).forEach(id => {
      const input = document.getElementById(id);
      if (!input) return;
      if (!validarCampo(id)) todosValidos = false;
    });
    return todosValidos;
  };
 
});