document.addEventListener("DOMContentLoaded", () => {
    // Cargar datos iniciales y configurar eventos
    cargarPartidos('proxi-partidos');
    configurarBotonesFiltro();
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

// =================== FUNCIONALIDAD PRINCIPAL ===================
async function cargarPartidos(archivo) {
    try {
        const response = await fetch(`../data/${archivo}.json`);
        const data = await response.json();
        mostrarFechas(procesarDatos(data, archivo), archivo);
    } catch (error) {
        console.error(`Error cargando ${archivo}:`, error);
        mostrarError();
    }
}

function procesarDatos(data) {
    const grupos = {};

    data.forEach(fecha => {
        // Crear clave única combinando jornada + fecha
        const clave = `${fecha.jornada}:${fecha.fecha}`; // Ej: "Fecha1-Sábado7/3"
        
        if (!grupos[clave]) {
            grupos[clave] = {
                titulo: `${fecha.jornada} : ${fecha.fecha}`, // Ej: "Fecha 1 - Sábado 7/3"
                partidos: []
            };
        }
        grupos[clave].partidos.push(...fecha.partidos);
    });

    return Object.values(grupos);
}

function mostrarFechas(fechas, tipo) {
    const contenedor = document.getElementById('agrupador-fechas');
    contenedor.innerHTML = fechas.map(fecha => `
        <div class="grupo-fecha">
            <div class="fecha-header" onclick="toggleFecha(this)">
                <h3 class="fecha-titulo">
                    ${fecha.titulo}
                    <i class="fas fa-chevron-down"></i>
                </h3>
            </div>
            <div class="partidos-fecha">
                ${fecha.partidos.map(partido => `
                    <div class="partido-card">
                        <div class="partido-info ${tipo === 'anter-partidos' ? 'resultado-estilo' : 'proximo-estilo'}">
                            ${tipo === 'anter-partidos' ? 
                                `<div class="equipos-resultado">
                                    <span class="equipo">${partido.local}</span>
                                    <span class="resultado">${partido.resultado}</span>
                                    <span class="equipo">${partido.visitante}</span>
                                </div>` : 
                                `<div class="equipos-proximos">
                                    <span class="equipo">${partido.local}</span>
                                    <span class="vs">VS</span>
                                    <span class="equipo">${partido.visitante}</span>
                                </div>`
                            }
                        </div>
                        <div class="detalles-partido">
                            <div class="hora-serie">
                                ${partido.hora ? `<div class="hora">${partido.hora}</div>` : ''}
                                ${partido.serie?.length > 0 ? 
                                    `<div class="serie">Serie ${partido.serie.join(' - ')}</div>` : ''}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function toggleFecha(elemento) {
    const partidos = elemento.nextElementSibling;
    partidos.classList.toggle('activo');
    elemento.querySelector('i').classList.toggle('fa-chevron-up');
}

function configurarBotonesFiltro() {
    document.querySelectorAll('.btn-filtro').forEach(boton => {
        boton.addEventListener('click', function() {
            document.querySelectorAll('.btn-filtro').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            cargarPartidos(this.dataset.archivo);
        });
    });
}

function mostrarError() {
    document.getElementById('agrupador-fechas').innerHTML = `
        <p class="error">Error al cargar los datos. Intente recargar la página.</p>
    `;
}