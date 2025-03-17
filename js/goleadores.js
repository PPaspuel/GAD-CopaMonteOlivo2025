document.addEventListener("DOMContentLoaded", function () {
    cargarTablaGoleadores();
    configurarMenuHamburguesa(); // Nueva función añadida
});

// =================== FUNCIONALIDAD MENÚ RESPONSIVE ===================
function configurarMenuHamburguesa() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');

    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
        document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Cerrar menú al hacer clic en enlaces
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navList.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
}

async function cargarTablaGoleadores() {
    try {
        const response = await fetch('../data/goleadores.json');
        const data = await response.json();
        renderizarTabla(data);
    } catch (error) {
        console.error('Error cargando datos:', error);
        mostrarError();
    }
}

function renderizarTabla(data) {
    const contenedor = document.getElementById('contenedor-tabla');
    const jugadoresOrdenados = ordenarJugadores(data.goleadores);
    
    const tablaHTML = `
        <table class="tabla-goleadores">
            <thead>
                <tr>
                    <th>Posición</th>
                    <th>Jugador</th>
                    <th>Equipo</th>
                    <th>Goles</th>
                </tr>
            </thead>
            <tbody>
                ${jugadoresOrdenados.map((jugador, index) => `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${jugador.nombre}</td>
                        <td>${jugador.equipo}</td>
                        <td>${jugador.goles}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    contenedor.innerHTML = tablaHTML;
}

function ordenarJugadores(jugadores) {
    return jugadores.sort((a, b) => b.goles - a.goles);
}

function mostrarError() {
    document.getElementById('contenedor-tabla').innerHTML = 
        '<p class="error">Error al cargar los goleadores</p>';
}