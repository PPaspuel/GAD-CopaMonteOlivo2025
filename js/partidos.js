let datosActuales = [];

async function cargarPartidos(archivo) {
    try {
        const response = await fetch(`../data/${archivo}.json`);
        datosActuales = await response.json();
        mostrarFechas(archivo);
    } catch (error) {
        console.error('Error cargando los partidos:', error);
    }
}

function mostrarFechas(tipo) {
    const contenedor = document.getElementById('agrupador-fechas');
    contenedor.innerHTML = '';
    
    datosActuales.forEach(fechaData => {
        const seccionFecha = document.createElement('div');
        seccionFecha.className = 'grupo-fecha';
        
        // Encabezado con información específica
        const encabezadoFecha = document.createElement('h3');
        encabezadoFecha.className = 'fecha-titulo';
        
        if(tipo === 'proxi-partidos') {
            encabezadoFecha.innerHTML = `
                ${fechaData.fecha} 
                <span class="jornada">${fechaData.jornada}</span>
            `;
        } else {
            encabezadoFecha.textContent = fechaData.fecha;
        }

        const listaPartidos = document.createElement('ul');
        listaPartidos.className = 'lista-partidos';
        
        fechaData.partidos.forEach(partido => {
            const li = document.createElement('li');
            li.className = 'partido-item';
            
            li.innerHTML = `
                ${tipo === 'anter-partidos' ? 
                    `<div class="fecha-calendario">Fecha: ${partido.fechaCalendario}</div>` : ''}

                ${tipo === 'anter-partidos' ? 
                    `<div class="etapa-partido">Etapa: ${partido.etapa}</div>` : ''}
                
                <div class="hora"> Hora: ${partido.hora}</div>
                
                <div class="equipos">${partido.local} vs ${partido.visitante}</div>
                
                ${tipo === 'anter-partidos' ? 
                    `<div class="resultado"> Marcador Final: ${partido.resultado}</div>` : ''}
                
                <div class="info-partido">
                    ${partido.serie.length > 0 ? 
                        `<span class="serie"> Serie: ${partido.serie.join(' - ')}</span>` : ''}
                </div>
            `;
            
            listaPartidos.appendChild(li);
        });
        
        seccionFecha.appendChild(encabezadoFecha);
        seccionFecha.appendChild(listaPartidos);
        contenedor.appendChild(seccionFecha);
    });
}

// Manejo de botones
document.addEventListener('click', (e) => {
    if(e.target.classList.contains('btn-filtro')) {
        document.querySelectorAll('.btn-filtro').forEach(btn => 
            btn.classList.remove('active'));
        e.target.classList.add('active');
        cargarPartidos(e.target.dataset.archivo);
    }
});

// Cargar próximos partidos por defecto
document.addEventListener('DOMContentLoaded', () => cargarPartidos('proximos'));