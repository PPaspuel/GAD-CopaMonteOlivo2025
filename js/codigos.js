document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    function toggleMenu() {
        navList.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Cerrar menú al hacer clic en un enlace (opcional)
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
});