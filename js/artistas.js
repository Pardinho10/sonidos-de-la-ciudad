
document.addEventListener("DOMContentLoaded", function() {
  console.log("Módulo de artistas cargado correctamente al 100%.");

  // 1. CONTROL DE AUDIO INTELIGENTE 
  var reproductores = document.querySelectorAll("audio");

  reproductores.forEach(function(audioActual) {
    audioActual.addEventListener("play", function() {
      reproductores.forEach(function(otroAudio) {
        if (otroAudio !== audioActual) {
          otroAudio.pause();
          otroAudio.currentTime = 0; 
        }
      });
    });
  });

  // 2. INTERACTIVIDAD EN LA LISTA DE GÉNEROS 
  var itemsGeneros = document.querySelectorAll(".festival-genres li");
  var tarjetasArtistas = document.querySelectorAll(".artista-card");

  itemsGeneros.forEach(function(item) {
    item.style.cursor = "pointer";

    item.addEventListener("click", function() {
      var generoSeleccionado = item.textContent.trim().toLowerCase();

      tarjetasArtistas.forEach(function(tarjeta) {
        var badge = tarjeta.querySelector(".badge-genre");
        if (badge) {
          var generoTarjeta = badge.textContent.trim().toLowerCase();

          if (generoTarjeta.includes(generoSeleccionado) || generoSeleccionado.includes(generoTarjeta)) {
            tarjeta.style.transform = "scale(1.03)";
            tarjeta.style.transition = "transform 0.3s ease";
            tarjeta.style.boxShadow = "0 8px 16px rgba(255, 107, 107, 0.2)";
            
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