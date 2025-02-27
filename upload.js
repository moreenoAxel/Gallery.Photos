document.getElementById("uploadForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita que se recargue la página
    const fileInput = document.getElementById("imageInput");
    const file = fileInput.files[0];
    if (!file) {
        alert("Por favor, selecciona una imagen.");
        return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
        // URL corregida para apuntar al controlador correcto
        const response = await fetch("http://localhost:5242/api/Fotos", {
            method: "POST",
            body: formData
        });
        if (response.ok) {
            const data = await response.json();
            alert("Recuerdo agregado a la galeria.");
            // Opcional: redirigir a la galería
            // window.location.href = "gallery.html";
        } else {
            const errorData = await response.text();
            alert("Error al subir la imagen: " + errorData);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("No se pudo conectar con la API.");
    }
});