document.addEventListener('DOMContentLoaded', function() {
    // Código del menú hamburguesa
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    function toggleMenu() {
        navList.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Cerrar menú al hacer clic en un enlace
        if (navList.classList.contains('active')) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navList.classList.remove('active');
                    menuToggle.classList.remove('active');
                });
            });
        }
    }

    menuToggle.addEventListener('click', toggleMenu);

    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar') && navList.classList.contains('active')) {
            navList.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

   // Carrusel de imágenes
const carouselSlides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let currentSlide = 0;

function updateButtons() {
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === carouselSlides.length - 1;
    
    // Opcional: agregar clase CSS para estilos visuales
    prevBtn.classList.toggle('disabled', currentSlide === 0);
    nextBtn.classList.toggle('disabled', currentSlide === carouselSlides.length - 1);
}


function showSlide(index) {
    // Validación de límites
    if (index < 0 || index >= carouselSlides.length) return;

    carouselSlides.forEach(slide => slide.classList.remove('active'));
    carouselSlides[index].classList.add('active');
    currentSlide = index;
    
    updateButtons();
}
function nextSlide() {
    if (currentSlide < carouselSlides.length - 1) {
        showSlide(currentSlide + 1);
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        showSlide(currentSlide - 1);
    }
}

   // Event listeners
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Inicialización
showSlide(0);
updateButtons();

    // Cambio automático cada 5 segundos (opcional)
    // setInterval(nextSlide, 5000);
});