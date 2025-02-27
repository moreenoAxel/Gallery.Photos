// JavaScript source code
// Variables globales
let allPhotos = [];
const apiUrl = 'http://localhost:5242/api/Fotos';
const galleryElement = document.getElementById('gallery');
const searchInput = document.getElementById('search');
const messageElement = document.getElementById('message');
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const closeModal = document.getElementById('closeModal');

// Función para cargar las fotos desde la API
async function loadPhotos() {
    try {
        messageElement.textContent = 'Cargando imágenes...';
        messageElement.className = 'max-w-lg mx-auto mb-4 text-center text-yellow-300';

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        allPhotos = data;

        if (allPhotos.length === 0) {
            messageElement.textContent = 'No hay imágenes para mostrar. ¡Sube algunas!';
            messageElement.className = 'max-w-lg mx-auto mb-4 text-center text-yellow-300';
        } else {
            messageElement.textContent = '';
            displayPhotos(allPhotos);
        }
    } catch (error) {
        console.error('Error al cargar las fotos:', error);
        messageElement.textContent = `No se pudieron cargar las imágenes: ${error.message}`;
        messageElement.className = 'max-w-lg mx-auto mb-4 text-center text-red-300';
    }
}

// Función para mostrar las fotos en la galería
function displayPhotos(photos) {
    galleryElement.innerHTML = '';

    photos.forEach(photo => {
        // Crear elemento de imagen
        const imgContainer = document.createElement('div');
        imgContainer.className = 'relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105';
        imgContainer.setAttribute('data-aos', 'zoom-in');

        const img = document.createElement('img');
        // Asegurarse de que la URL sea absoluta
        img.src = photo.url.startsWith('http') ? photo.url : `http://localhost:5242${photo.url}`;
        img.alt = photo.name;
        img.className = 'w-full h-64 object-cover cursor-pointer';

        // Agregar evento para abrir modal al hacer clic
        img.addEventListener('click', () => {
            openModal(photo);
        });

        // Añadir título de la imagen
        const imgTitle = document.createElement('div');
        imgTitle.className = 'absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2 text-center truncate';
        imgTitle.textContent = photo.name;

        // Añadir al contenedor
        imgContainer.appendChild(img);
        imgContainer.appendChild(imgTitle);
        galleryElement.appendChild(imgContainer);
    });
}

// Función para filtrar fotos
function filterPhotos(query) {
    if (!query) {
        displayPhotos(allPhotos);
        return;
    }

    const filteredPhotos = allPhotos.filter(photo =>
        photo.name.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredPhotos.length === 0) {
        messageElement.textContent = 'No se encontraron imágenes que coincidan con tu búsqueda.';
        messageElement.className = 'max-w-lg mx-auto mb-4 text-center text-yellow-300';
    } else {
        messageElement.textContent = '';
    }

    displayPhotos(filteredPhotos);
}

// Función para abrir el modal
function openModal(photo) {
    modalImage.src = photo.url.startsWith('http') ? photo.url : `http://localhost:5242${photo.url}`;
    modalTitle.textContent = photo.name;
    imageModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevenir scroll
}

// Función para cerrar el modal
function closeModalFunction() {
    imageModal.classList.add('hidden');
    document.body.style.overflow = ''; // Restaurar scroll
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadPhotos();

    // Buscar imágenes al escribir
    searchInput.addEventListener('input', () => {
        filterPhotos(searchInput.value);
    });

    // Cerrar el modal
    closeModal.addEventListener('click', closeModalFunction);

    // También cerrar el modal al hacer clic fuera de la imagen
    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) {
            closeModalFunction();
        }
    });

    // Cerrar modal con la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !imageModal.classList.contains('hidden')) {
            closeModalFunction();
        }
    });
});