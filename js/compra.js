// =========================================================================
// LÓGICA DE COMPRA DE ENTRADAS Y VALIDACIONES (UNIFICADO Y CORREGIDO)
// =========================================================================

// 1. Array de eventos oficiales con sus respectivas fechas y lugares fijos
var eventosJSON = [
  { id: "rock-2026", titulo: "Los Redonditos de Ricota (Tributo)", fecha: "Viernes 14 de Noviembre, 2026", lugar: "Estadio Madre de Ciudades" },
  { id: "edm-2026", titulo: "Varios DJs Nacionales", fecha: "Sábado 15 de Noviembre, 2026", lugar: "Complejo Urbano" },
  { id: "jazz-2026", titulo: "Trío de Jazz Local", fecha: "Domingo 16 de Noviembre, 2026", lugar: "Bar Cultural La Ferretería" }
];

// 2. Patrones de Validación por Expresiones Regulares (Cecilia)
var patrones = {
  'comprador-nombre-completo': {
      regex: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,}$/,
      mensajeError: 'Solo letras y espacios (mínimo 3 caracteres).'
  },
  'pago-email': {
      regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      mensajeError: 'Ingrese un correo electrónico válido (ej: usuario@email.com).'
  },
  'pago-telefono': {
      regex: /^[0-9]{10,15}$/,
      mensajeError: 'Ingrese un teléfono válido (mínimo 10 dígitos, solo números).'
  },
  'pago-fecha-nacimiento': {
      regex: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/([0-9]{4})$/, 
      mensajeError: 'Formato inválido. Use DD/MM/AAAA (ej: 15/03/2000).'
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

// 3. Función para validar un campo individual
function validarCampo(id) {
  var input = document.getElementById(id);
  var span = document.getElementById(`error-${id}`);
  var config = patrones[id];

  if (!input || !span || !config) return false;

  var valor = input.value.trim();

  if (valor === '') {
    input.style.borderColor = '#ccc';
    span.textContent = '';
    return false;
  }

  var esValido = config.regex.test(valor);

  if (esValido) {
    input.style.borderColor = '#4caf50';
    span.textContent = '';
  } else {
    input.style.borderColor = '#e53935';
    span.textContent = config.mensajeError;
  }

  return esValido;
}

// 4. Función global para validar TODO el formulario antes de enviar
window.validarTodosLosCamposCecilia = function () {
  var todosValidos = true;
  Object.keys(patrones).forEach(function(id) {
    var input = document.getElementById(id);
    if (!input) return;
    if (!validarCampo(id)) {
      todosValidos = false;
    }
  });
  return todosValidos;
};

// 5. Inicializar escuchadores para validación en tiempo real (Input y Blur)
function activarValidacionesTiempoReal() {
  Object.keys(patrones).forEach(function(id) {
    var input = document.getElementById(id);
    if (!input) return;

    input.addEventListener('input', function() { validarCampo(id); });
    input.addEventListener('blur', function() { validarCampo(id); });
  });
}

// 6. Cargar las opciones en el desplegable automáticamente al entrar
function cargarSelectorEventos() {
  var selectEvento = document.getElementById("evento-select");
  if (!selectEvento) return;

  for (var i = 0; i < eventosJSON.length; i++) {
    var evento = eventosJSON[i];
    var opcion = document.createElement("option");
    opcion.value = evento.id;
    opcion.textContent = evento.titulo;
    selectEvento.appendChild(opcion);
  }
}

// 7. Manejar el cambio de show: MOSTRAR texto de aviso y ACTIVAR formulario de pago
function escucharCambioEvento() {
  var selectEvento = document.getElementById("evento-select");
  var contenedorInfo = document.getElementById("info-evento-contenedor");
  var avisoFecha = document.getElementById("aviso-fecha");
  var avisoLugar = document.getElementById("aviso-lugar");
  var seccionPago = document.getElementById("seccion-pago");

  if (!selectEvento || !contenedorInfo || !avisoFecha || !avisoLugar || !seccionPago) return;

  selectEvento.addEventListener("change", function(e) {
    var idSeleccionado = e.target.value;
    var eventoEncontrado = null;

    for (var i = 0; i < eventosJSON.length; i++) {
      if (eventosJSON[i].id === idSeleccionado) {
        eventoEncontrado = eventosJSON[i];
      }
    }

    if (eventoEncontrado) {
      avisoFecha.textContent = eventoEncontrado.fecha;
      avisoLugar.textContent = eventoEncontrado.lugar;
      
      contenedorInfo.style.display = "block";
      seccionPago.style.display = "block";
    } else {
      contenedorInfo.style.display = "none";
      seccionPago.style.display = "none";
    }
  });
}

// 8. Detectar franquicia de tarjeta (Visa, MasterCard, Amex)
function detectarFranquiciaTarjeta() {
  var inputNumero = document.getElementById("tarjeta-numero");
  var contenedorLogo = document.getElementById("tarjeta-logo");

  if (!inputNumero || !contenedorLogo) return;

  inputNumero.addEventListener("input", function(e) {
    var numero = e.target.value.trim();

    if (numero.length === 0) {
      contenedorLogo.textContent = "💳";
      return;
    }

    if (numero.startsWith("4")) {
      contenedorLogo.textContent = "VISA";
    } else if (numero.startsWith("5")) {
      contenedorLogo.textContent = "MasterCard";
    } else if (numero.startsWith("3")) {
      contenedorLogo.textContent = "AMEX";
    } else {
      contenedorLogo.textContent = "💳";
    }
  });
}

// 9. Filtrar entradas y aplicar máscaras a los campos de pago (UX) - LLAVES CORREGIDAS
function aplicarMascarasValidacion() {
  var inputDni = document.getElementById("pago-dni");
  var inputNumero = document.getElementById("tarjeta-numero");
  var inputVence = document.getElementById("tarjeta-vence");
  var inputCcv = document.getElementById("tarjeta-ccv");
  var inputTelefono = document.getElementById("pago-telefono");
  var inputNacimiento = document.getElementById("pago-fecha-nacimiento");

  if (inputDni) {
    inputDni.addEventListener("input", function(e) {
      e.target.value = e.target.value.replace(/\D/g, "").slice(0, 8);
    });
  }

  if (inputNumero) {
    inputNumero.addEventListener("input", function(e) {
      e.target.value = e.target.value.replace(/\D/g, "").slice(0, 16);
    });
  }

  if (inputVence) {
    inputVence.addEventListener("input", function(e) {
      var valor = e.target.value.replace(/\D/g, ""); 
      if (valor.length > 2) {
        e.target.value = valor.slice(0, 2) + "/" + valor.slice(2, 4);
      } else {
        e.target.value = valor;
      }
    });
  }

  if (inputCcv) {
    inputCcv.addEventListener("input", function(e) {
      e.target.value = e.target.value.replace(/\D/g, "").slice(0, 4);
    });
  }

  if (inputTelefono) {
    inputTelefono.addEventListener("input", function(e) {
      e.target.value = e.target.value.replace(/\D/g, "");
    });
  }

  if (inputNacimiento) {
    inputNacimiento.addEventListener("input", function(e) {
      var valor = e.target.value.replace(/\D/g, "");
      if (valor.length > 4) {
        e.target.value = valor.slice(0, 2) + "/" + valor.slice(2, 4) + "/" + valor.slice(4, 8);
      } else if (valor.length > 2) {
        e.target.value = valor.slice(0, 2) + "/" + valor.slice(2, 4);
      } else {
        e.target.value = valor;
      }
    });
  }
}

// 10. Escuchar el envío del formulario y simular el éxito de la compra
function configurarEnvioFormulario() {
  var formulario = document.getElementById("form-reserva-pago");
  var selectEvento = document.getElementById("evento-select");
  var inputNombre = document.getElementById("pago-nombre");
  
  var inputEmail = document.getElementById("pago-email");
  var inputComprador = document.getElementById("comprador-nombre-completo");
  var selectTipoEntrada = document.getElementById("tipo-entrada-select");

  if (!formulario || !selectEvento || !inputNombre) return;

  formulario.addEventListener("submit", function(e) {
    e.preventDefault();
    
    if (!window.validarTodosLosCamposCecilia()) {
      alert("Por favor, complete correctamente todos los campos marcados en rojo.");
      return;
    }

    var nombreShow = selectEvento.options[selectEvento.selectedIndex].text;
    var titular = inputNombre.value.trim();
    var emailDestino = inputEmail ? inputEmail.value.trim() : "correo@ejemplo.com";
    var nombreComprador = inputComprador ? inputComprador.value.trim() : titular;
    
    // Evitamos errores si no existe el select de tipo de entrada en el HTML todavía
    var tipoEntrada = "General";
    if (selectTipoEntrada && selectTipoEntrada.selectedIndex !== -1) {
      tipoEntrada = selectTipoEntrada.options[selectTipoEntrada.selectedIndex].text;
    }

    // 1. Limpiar QR anterior
    var contenedorQR = document.getElementById("qrcode");
    if (contenedorQR) contenedorQR.innerHTML = "";
    
    // 2. Generar QR Seguro (Evitando desbordamientos de texto)
    var datosQR = `Show: ${nombreShow} | Tipo: ${tipoEntrada} | Ticket: ${nombreComprador}`;
    
    if (typeof QRCode !== "undefined" && contenedorQR) {
      new QRCode(contenedorQR, {
        text: datosQR,
        width: 128,
        height: 128,
        correctLevel: 0 // Forzamos nivel L (baja redundancia) para máxima compatibilidad de texto
      });
    }

    // 3. Inyectar datos en la interfaz del correo simulado
    var elMail = document.getElementById("mail-destino");
    var elComp = document.getElementById("mail-comprador");
    var elShow = document.getElementById("mail-show");
    var elTipo = document.getElementById("mail-tipo-entrada");
    var elTitu = document.getElementById("mail-titular");

    if (elMail) elMail.textContent = emailDestino;
    if (elComp) elComp.textContent = nombreComprador;
    if (elShow) elShow.textContent = nombreShow;
    if (elTipo) elTipo.textContent = tipoEntrada;
    if (elTitu) elTitu.textContent = titular;

    // 4. Mostrar el contenedor del mail simulado
    var modalEmail = document.getElementById("comprobante-email-modal");
    if (modalEmail) modalEmail.style.display = "block";

    // 5. Mensaje de éxito
    alert("¡Pago Procesado con éxito!\n\nSe ha generado tu pase digital y enviado el comprobante.");

    // Reseteo de campos y vistas
    formulario.reset();
    var infoCont = document.getElementById("info-evento-contenedor");
    var secPago = document.getElementById("seccion-pago");
    if (infoCont) infoCont.style.display = "none";
    if (secPago) secPago.style.display = "none";
    
    var contenedorLogo = document.getElementById("tarjeta-logo");
    if (contenedorLogo) {
      contenedorLogo.textContent = "💳";
    }
  });
}

// 11. Inicializador general del módulo
function inicializarModuloReservaPago() {
  cargarSelectorEventos();
  escucharCambioEvento();
  detectarFranquiciaTarjeta();
  aplicarMascarasValidacion();
  activarValidacionesTiempoReal(); 
  configurarEnvioFormulario();
}

document.addEventListener("DOMContentLoaded", inicializarModuloReservaPago);
