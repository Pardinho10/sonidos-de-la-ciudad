const slides = document.querySelectorAll(".hero-slide");

let current = 0;

function cambiarSlide() {

    slides[current].classList.remove("active");

    current++;

    if (current >= slides.length) {

        current = 0;

    }

    slides[current].classList.add("active");

}

setInterval(cambiarSlide, 5000);