// =========================================================================
// LÓGICA DE COMPRA DE ENTRADAS Y VALIDACIONES (UNIFICADO Y CORREGIDO)
// ========================================================

// 1. Array de eventos oficiales con sus respectivas fechas y lugares fijos
var eventosJSON = [
  { id: "rock-2026", titulo: "Los Redonditos de Ricota (Tributo)", fecha: "Viernes 14 de Noviembre, 2026", lugar: "Estadio Madre de Ciudades" },
  { id: "edm-2026", titulo: "Varios DJs Nacionales", fecha: "Sábado 15 de Noviembre, 2026", lugar: "Complejo Urbano" },
  { id: "jazz-2026", titulo: "Trío de Jazz Local", fecha: "Domingo 16 de Noviembre, 2026", lugar: "Bar Cultural La Ferretería" }
];

// 2. Patrones de Validación por Expresiones Regulares 
var patrones = {
    'interesado-nombre': {
      regex: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,}$/,
      mensajeError: 'Solo letras y espacios (mínimo 3 caracteres).'
  },

    'cantidad-entradas': {
      regex: /^[1-6]$/,
      mensajeError: 'Debe ser un número entre 1 y 6.'
    },

  'interesado-dni': {
      regex: /^[0-9]{7,8}$/,
      mensajeError: 'El DNI debe tener 7 u 8 dígitos.'
  },

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

// 4. Función global para validar el formulario antes de enviar
window.validarTodosLosCamposCecilia = function () {
  var todosValidos = true;
  
  Object.keys(patrones).forEach(function(id) {
    var input = document.getElementById(id);
    if (!input) return;

    // Si el contenedor de pago no es visible todavía, ignoramos la validación visual 
    var seccionPago = document.getElementById("seccion-pago");
    var seccionPagoVisible = seccionPago && seccionPago.style.display === "block";

    // Si la sección de pago no se abrió y el campo es de los nuevos o de la tarjeta, no validamos aún
    if (!seccionPagoVisible && (id === 'interesado-nombre' || id === 'interesado-dni' || id.startsWith('tarjeta') || id.startsWith('pago'))) {
      return; 
    }

    if (!validarCampo(id)) {
      todosValidos = false;
    }
  });
  
  return todosValidos;
};

// 5. Inicializar escuchadores para validación en tiempo real
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
      
      // Desplegamos ambos contenedores
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

// 9. Filtrar entradas y aplicar máscaras a los campos de pago 
function aplicarMascarasValidacion() {
  var inputDni = document.getElementById("pago-dni");
  var inputNumero = document.getElementById("tarjeta-numero");
  var inputVence = document.getElementById("tarjeta-vence");
  var inputCcv = document.getElementById("tarjeta-ccv");
  var inputTelefono = document.getElementById("pago-telefono");
  var inputNacimiento = document.getElementById("pago-fecha-nacimiento");
  var inputDniInteresado = document.getElementById("interesado-dni");
  if (inputDniInteresado) {
    inputDniInteresado.addEventListener("input", function(e) {
      e.target.value = e.target.value.replace(/\D/g, "").slice(0, 8);
    });
  }
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

// Precios fijos por tipo de entrada
var PRECIOS_ENTRADA = {
  'general': 15000,
  'vip': 30000,
  'palco': 50000  // Experiencia completa las 3 noches
};

function calcularPrecioTotal() {
  var tipoEntrada = document.getElementById('tipo-entrada');
  var cantidad = document.getElementById('cantidad-entradas');
  var mostrarPrecio = document.getElementById('precio-total-mostrado');

  if (!tipoEntrada || !cantidad || !mostrarPrecio) return;

  var precioUnitario = PRECIOS_ENTRADA[tipoEntrada.value] || 0;
  var cantidadNum = parseInt(cantidad.value, 10);

  // Validación: cantidad debe ser mayor a 0 y no exceder 6
  if (isNaN(cantidadNum) || cantidadNum <= 0) {
    mostrarPrecio.textContent = '$0';
    return;
  }
  if (cantidadNum > 6) {
    cantidadNum = 6;
    cantidad.value = 6;
  }

  var total = precioUnitario * cantidadNum;

  // Validación: el monto total debe ser mayor a cero para habilitar
  if (total <= 0) {
    mostrarPrecio.textContent = '$0 (seleccioná tipo y cantidad)';
  } else {
    mostrarPrecio.textContent = '$' + total.toLocaleString('es-AR');
  }
}

function activarCalculoPrecio() {
  var tipoEntrada = document.getElementById('tipo-entrada');
  var cantidad = document.getElementById('cantidad-entradas');
  if (tipoEntrada) tipoEntrada.addEventListener('change', calcularPrecioTotal);
  if (cantidad) cantidad.addEventListener('input', calcularPrecioTotal);
}

// 10. Escuchar el envío del formulario y simular el éxito de la compra
function configurarEnvioFormulario() {
  var formulario = document.getElementById("form-reserva-pago");
  var selectEvento = document.getElementById("evento-select");
  var inputNombreTarjeta = document.getElementById("pago-nombre"); // El dueño de la tarjeta
  var inputInteresado = document.getElementById("interesado-nombre");
  var inputInteresadoDni = document.getElementById("interesado-dni");
  var inputEmail = document.getElementById("pago-email");
  var selectTipoEntrada = document.getElementById("tipo-entrada");

  if (!formulario || !selectEvento || !inputNombreTarjeta) return;

  formulario.addEventListener("submit", function(e) {
    e.preventDefault();
    
    if (!window.validarTodosLosCamposCecilia()) {
      alert("Por favor, complete correctamente todos los campos marcados en rojo.");
      return;
    }

    var nombreShow = selectEvento.options[selectEvento.selectedIndex].text;
    var titularTarjeta = inputNombreTarjeta.value.trim();
    var nombreAsistente = inputInteresado ? inputInteresado.value.trim() : titularTarjeta;
    var dniAsistente = inputInteresadoDni ? inputInteresadoDni.value.trim() : "";
    var emailDestino = inputEmail ? inputEmail.value.trim() : "correo@ejemplo.com";
    
    var tipoEntrada = "General";
    if (selectTipoEntrada && selectTipoEntrada.selectedIndex !== -1) {
      tipoEntrada = selectTipoEntrada.options[selectTipoEntrada.selectedIndex].text;
    }

    // 1. Limpiar QR anterior
    var contenedorQR = document.getElementById("qrcode");
    if (contenedorQR) contenedorQR.innerHTML = "";
    
    // 2. EL CAMBIO CLAVE: El QR se genera con los datos del interesado real (Asistente)
    var datosQR = `Show: ${nombreShow}\nAsistente: ${nombreAsistente}\nDNI: ${dniAsistente}\nTipo: ${tipoEntrada}`;
    
    if (typeof QRCode !== "undefined" && contenedorQR) {
      new QRCode(contenedorQR, {
        text: datosQR,
        width: 128,
        height: 128,
        correctLevel: 0 
      });
    }

    // 3. Vinculamos el ID del dueño de la entrada con el nombre del asistente real
    var elMail = document.getElementById("mail-destino");
    var elShow = document.getElementById("mail-show");
    var elTipo = document.getElementById("mail-tipo-entrada");
    var elDuenio = document.getElementById("mail-duenio-entrada"); 

    if (elMail) elMail.textContent = emailDestino;
    if (elShow) elShow.textContent = nombreShow;
    if (elTipo) elTipo.textContent = tipoEntrada;
    
    // Acá forzamos que use 'nombreAsistente' en lugar del propietario de la tarjeta 
    if (elDuenio) elDuenio.textContent = nombreAsistente;

    // 4. Mostrar el comprobante del mail
    var modalEmail = document.getElementById("comprobante-email-modal");
    if (modalEmail) modalEmail.style.display = "block";

    // 5. Alerta final personalizada
    alert(`¡Compra Exitosa!\n\nSe generó la entrada para ${nombreAsistente}. El pago fue procesado con la tarjeta de ${titularTarjeta}.`);

    // Reseteo
    formulario.reset();
    var infoCont = document.getElementById("info-evento-contenedor");
    var secPago = document.getElementById("seccion-pago");
    if (infoCont) infoCont.style.display = "none";
    if (secPago) secPago.style.display = "none";
    
    var contenedorLogo = document.getElementById("tarjeta-logo");
    if (contenedorLogo) contenedorLogo.textContent = "💳";
  });
}

// 11. Inicializador general del módulo
function inicializarModuloReservaPago() {
  cargarSelectorEventos();
  escucharCambioEvento();
  detectarFranquiciaTarjeta();
  aplicarMascarasValidacion();
  activarValidacionesTiempoReal();
   activarCalculoPrecio(); 
  configurarEnvioFormulario();
}

document.addEventListener("DOMContentLoaded", inicializarModuloReservaPago);
