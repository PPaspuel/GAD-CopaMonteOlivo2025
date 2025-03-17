document.addEventListener("DOMContentLoaded", function () {
    // Cargar Serie A por defecto
    cargarTablaPosiciones('serie-a');
    configurarMenuHamburguesa(); // Nueva función añadida
    
    // Event listeners para los botones
    document.querySelectorAll('.boton-serie').forEach(boton => {
        boton.addEventListener('click', function() {
            // Remover clase active de todos los botones
            document.querySelectorAll('.boton-serie').forEach(b => b.classList.remove('active'));
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            // Cargar la serie correspondiente
            const serie = this.dataset.serie;
            cargarTablaPosiciones(serie);
        });
    });
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

async function cargarTablaPosiciones(serie) {
    try {
        const rutaJson = `../data/posiciones-${serie}.json`;
        const response = await fetch(rutaJson);
        const data = await response.json();
        renderizarTabla(data);
    } catch (error) {
        console.error('Error cargando datos:', error);
        document.getElementById('contenedor-tabla').innerHTML = 
            '<p class="error">Error al cargar los datos de la tabla</p>';
    }
}

function renderizarTabla(data) {
    const tablaHTML = `
        <table class="tabla-posiciones">
            <thead>
                <tr>
                    <th>Posiciones</th>
                    <th>Equipos</th>
                    <th>PJ</th>
                    <th>PTS</th>
                    <th>PG</th>
                    <th>PP</th>
                    <th>PE</th>
                    <th>GF</th>
                    <th>GC</th>
                    <th>DG</th>
                </tr>
            </thead>
            <tbody>
                ${data.equipos.map(equipo => `
                    <tr ${equipo.posicion === 16 ? 'class="zona-eliminacion"' : ''}>
                        <td>${equipo.posicion}</td>
                        <td>${equipo.nombre}</td>
                        <td>${equipo.pj}</td>
                        <td>${equipo.pts}</td>
                        <td>${equipo.pg}</td>
                        <td>${equipo.pp}</td>
                        <td>${equipo.pe}</td>
                        <td>${equipo.gf}</td>
                        <td>${equipo.gc}</td>
                        <td>${equipo.dg}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    document.getElementById('contenedor-tabla').innerHTML = tablaHTML;
}
