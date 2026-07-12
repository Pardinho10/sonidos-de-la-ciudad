// =========================================================================
// LÓGICA DE COMPRA DE ENTRADAS
// =========================================================================

// 1. Array de eventos oficiales con sus respectivas fechas y lugares fijos
var eventosJSON = [
  { id: "rock-2026", titulo: "Los Redonditos de Ricota (Tributo)", fecha: "Viernes 14 de Noviembre, 2026", lugar: "Estadio Madre de Ciudades" },
  { id: "edm-2026", titulo: "Varios DJs Nacionales", fecha: "Sábado 15 de Noviembre, 2026", lugar: "Complejo Urbano" },
  { id: "jazz-2026", titulo: "Trío de Jazz Local", fecha: "Domingo 16 de Noviembre, 2026", lugar: "Bar Cultural La Ferretería" }
];

// 2. Cargar las opciones en el desplegable automáticamente al entrar
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

// 3. Manejar el cambio de show: MOSTRAR texto de aviso y ACTIVVAR formulario de pago
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

    // Buscamos el show seleccionado
    for (var i = 0; i < eventosJSON.length; i++) {
      if (eventosJSON[i].id === idSeleccionado) {
        eventoEncontrado = eventosJSON[i];
      }
    }

    if (eventoEncontrado) {
      // Inyectamos los datos en los textos del aviso
      avisoFecha.textContent = eventoEncontrado.fecha;
      avisoLugar.textContent = eventoEncontrado.lugar;
      
      // con un solo .style para que funcione perfecto
      contenedorInfo.style.display = "block";
      seccionPago.style.display = "block";
    } else {
      // Si el usuario vuelve a poner la opción por defecto, escondemos todo otra vez
      contenedorInfo.style.display = "none";
      seccionPago.style.display = "none";
    }
  });
}

// 4. Detectar franquicia de tarjeta (Visa, MasterCard, Amex)
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

// 5. Filtrar entradas y aplicar máscaras a los campos de pago (UX)
function aplicarMascarasValidacion() {
  var inputDni = document.getElementById("pago-dni");
  var inputNumero = document.getElementById("tarjeta-numero");
  var inputVence = document.getElementById("tarjeta-vence");
  var inputCcv = document.getElementById("tarjeta-ccv");

  // Validación DNI: Solo números, máximo 8 dígitos
  if (inputDni) {
    inputDni.addEventListener("input", function(e) {
      e.target.value = e.target.value.replace(/\D/g, "").slice(0, 8);
    });
  }

  // Validación Tarjeta: Solo números, máximo 16 dígitos
  if (inputNumero) {
    inputNumero.addEventListener("input", function(e) {
      e.target.value = e.target.value.replace(/\D/g, "").slice(0, 16);
    });
  }

  // Máscara de Vencimiento: Agrega la barra / automáticamente (MM/AA)
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

  // Validación CCV: Solo números, máximo 4 dígitos (por si es AMEX)
  if (inputCcv) {
    inputCcv.addEventListener("input", function(e) {
      e.target.value = e.target.value.replace(/\D/g, "").slice(0, 4);
    });
  }
}

// 6. Escuchar el envi del formulario y simular el éxito de la compra
function configurarEnvioFormulario() {
  var formulario = document.getElementById("form-reserva-pago");
  var selectEvento = document.getElementById("evento-select");
  var inputNombre = document.getElementById("pago-nombre");

  if (!formulario || !selectEvento || !inputNombre) return;

  formulario.addEventListener("submit", function(e) {
    e.preventDefault();
      if (!window.validarTodosLosCamposCecilia()) {
      return;
  }

    // Obtenemos el nombre del show seleccionado para el cartel
    var nombreShow = selectEvento.options[selectEvento.selectedIndex].text;
    var titular = inputNombre.value.trim();

  
    alert(
      "¡Procesando Pago!\n\n" +
      "Muchas gracias " + titular + ".\n" +
      "Tu compra para '" + nombreShow + "' se ha realizado con éxito.\n" +
      "En breve recibirás las entradas en tu correo electrónico."
    );

    // Reiniciar el formulario después de comprar y ocultar secciones
    formulario.reset();
    document.getElementById("info-evento-contenedor").style.display = "none";
    document.getElementById("seccion-pago").style.display = "none";
    
    // Reseteamos también el emoji de la franquicia de la tarjeta
    var contenedorLogo = document.getElementById("tarjeta-marca");
    if (contenedorLogo) {
      contenedorLogo.textContent = "💳";
    }
  });
}

// 7. Inicializador del módulo (Actualizado con las nuevas funciones)
function inicializarModuloReservaPago() {
  cargarSelectorEventos();
  escucharCambioEvento();
  detectarFranquiciaTarjeta();
  aplicarMascarasValidacion(); // <- Ejecuta los filtros de texto
  configurarEnvioFormulario();  // <- Ejecuta la simulación de compra
}

// Arranca todo cuando la página termina de cargar
document.addEventListener("DOMContentLoaded", inicializarModuloReservaPago);
