async function cargarPartidos() {
    try {
        const response = await fetch('../data/partidos.json');
        const fechas = await response.json();
        mostrarFechas(fechas);
    } catch (error) {
        console.error('Error cargando los partidos:', error);
    }
}

function mostrarFechas(fechas) {
    const contenedor = document.getElementById('agrupador-fechas');
    
    fechas.forEach(fechaData => {
        const seccionFecha = document.createElement('div');
        seccionFecha.className = 'grupo-fecha';
        
        const encabezadoFecha = document.createElement('h3');
        encabezadoFecha.className = 'fecha-titulo';
        encabezadoFecha.textContent = fechaData.fecha;
        
        const listaPartidos = document.createElement('ul');
        listaPartidos.className = 'lista-partidos';
        
        fechaData.partidos.forEach(partido => {
            const li = document.createElement('li');
            li.className = 'partido-item';
            li.innerHTML = `
                <div class="hora">${partido.hora}</div>
                <div class="equipos">${partido.local} vs ${partido.visitante}</div>
                <div class="info-partido">
                    <span class="estadio">${partido.estadio}</span>
                    ${partido.serie.length > 0 ? 
                        `<span class="serie">${partido.serie.join(' - ')}</span>` : ''}
                </div>
            `;
            listaPartidos.appendChild(li);
        });
        
        seccionFecha.appendChild(encabezadoFecha);
        seccionFecha.appendChild(listaPartidos);
        contenedor.appendChild(seccionFecha);
    });
}

document.addEventListener('DOMContentLoaded', cargarPartidos);