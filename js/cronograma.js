document.addEventListener("DOMContentLoaded", function () {
  fetch("data/events.json")
    .then(function (resp) {
      if (!resp.ok) throw new Error("Error al cargar events.json");
      return resp.json();
    })
    .then(function (eventos) {
      llenarTablaEscenarios(eventos);
    })
    .catch(function (err) {
      console.error("No se pudo cargar el cronograma:", err);
    });
});

function llenarTablaEscenarios(eventos) {
  var tbody = document.getElementById("tabla-escenarios");
  if (!tbody) return;

  var claseBadge = {
    "Rock": "badge-rock",
    "Electrónica": "badge-electronica",
    "Jazz": "badge-jazz"
  };

  var diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  var meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

  eventos.forEach(function (evento) {
    var tr = document.createElement("tr");

    // Día corto desde fecha: "Viernes 17 de Julio, 2026" → "Viernes 17/07"
    var diaCorto = "";
    try {
      var partesFecha = evento.fecha.replace(",", "").split(" ");
      var diaNum = partesFecha[1];
      var mesNombre = partesFecha[3];
      var mesNum = meses.indexOf(mesNombre.substring(0, 3)) + 1;
      if (mesNum < 1) mesNum = 7;
      diaCorto = partesFecha[0] + " " + diaNum + "/" + (mesNum < 10 ? "0" + mesNum : mesNum);
    } catch (e) {
      diaCorto = evento.fecha;
    }

    var filas = [
      { valor: evento.lugar },
      { valor: evento.titulo },
      { valor: evento.genero, esBadge: true },
      { valor: diaCorto },
      { valor: evento.horario }
    ];

    filas.forEach(function (celda) {
      var td = document.createElement("td");

      if (celda.esBadge) {
        var span = document.createElement("span");
        span.className = "badge " + (claseBadge[celda.valor] || "badge-rock");
        span.textContent = celda.valor;
        td.appendChild(span);
      } else {
        td.textContent = celda.valor;
      }

      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });
}
