document.addEventListener("DOMContentLoaded", function () {
  // Botón flotante "volver arriba"
  var btnScroll = document.createElement("button");
  btnScroll.className = "btn-scroll-top";
  btnScroll.setAttribute("aria-label", "Volver arriba");
  btnScroll.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  document.body.appendChild(btnScroll);

  btnScroll.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  function toggleScrollButton() {
    if (window.scrollY > 400) {
      btnScroll.classList.add("visible");
    } else {
      btnScroll.classList.remove("visible");
    }
  }

  window.addEventListener("scroll", toggleScrollButton);
  toggleScrollButton();
});
