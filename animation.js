document.addEventListener("DOMContentLoaded", () => {
    // Agrega clases de animación a los elementos
    document.body.classList.add("opacity-0", "translate-y-4");

    setTimeout(() => {
        document.body.classList.remove("opacity-0", "translate-y-4");
        document.body.classList.add("opacity-100", "translate-y-0", "transition-all", "duration-700");
    }, 200);
});