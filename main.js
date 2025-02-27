document.addEventListener("DOMContentLoaded", () => {
    const welcomeModal = document.getElementById("welcomeModal");
    const closeModal = document.getElementById("closeModal");

    // Mostrar el modal solo al ingresar por primera vez
    if (!sessionStorage.getItem("modalShown")) {
        welcomeModal.classList.remove("hidden");
        sessionStorage.setItem("modalShown", "true");
    }

    // Cerrar el modal al hacer clic en el botón
    closeModal.addEventListener("click", () => {
        welcomeModal.classList.add("hidden");
    });
});

// JavaScript source code
