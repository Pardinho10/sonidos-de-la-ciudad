
document.addEventListener("DOMContentLoaded", function() {
  console.log("Módulo de artistas cargado correctamente al 100%.");

  // 1. CONTROL DE AUDIO INTELIGENTE (Usa los <audio> que ya tenés en el HTML)
  var reproductores = document.querySelectorAll("audio");

  reproductores.forEach(function(audioActual) {
    audioActual.addEventListener("play", function() {
      // Cuando un audio empieza a sonar, pausamos todos los demás
      reproductores.forEach(function(otroAudio) {
        if (otroAudio !== audioActual) {
          otroAudio.pause();
          otroAudio.currentTime = 0; // Reinicia el audio pausado para que no quede colgado
        }
      });
    });
  });

  // 2. INTERACTIVIDAD EN LA LISTA DE GÉNEROS (Usa los <li> que ya tenés en el HTML)
  var itemsGeneros = document.querySelectorAll(".festival-genres li");
  var tarjetasArtistas = document.querySelectorAll(".artista-card");

  itemsGeneros.forEach(function(item) {
    // Le agregamos un estilo de cursor de manito para que el usuario sepa que puede clickearlos
    item.style.cursor = "pointer";

    item.addEventListener("click", function() {
      // Detecta si clickeó Rock, Electrónica o Jazz
      var generoSeleccionado = item.textContent.trim().toLowerCase();

      tarjetasArtistas.forEach(function(tarjeta) {
        var badge = tarjeta.querySelector(".badge-genre");
        if (badge) {
          var generoTarjeta = badge.textContent.trim().toLowerCase();

          // Si la tarjeta coincide con el género clickeado, le mete un resalte visual
          if (generoTarjeta.includes(generoSeleccionado) || generoSeleccionado.includes(generoTarjeta)) {
            tarjeta.style.transform = "scale(1.03)";
            tarjeta.style.transition = "transform 0.3s ease";
            tarjeta.style.boxShadow = "0 8px 16px rgba(255, 107, 107, 0.2)";
            
            // Vuelve a la normalidad después de segundo y medio
            setTimeout(function() {
              tarjeta.style.transform = "none";
              tarjeta.style.boxShadow = "none";
            }, 1500);
          }
        }
      });
    });
  });
});