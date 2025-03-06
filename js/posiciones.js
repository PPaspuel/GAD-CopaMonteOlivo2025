document.addEventListener("DOMContentLoaded", function () {
    cargarTablaPosiciones();
});

function cargarJSON(url, callback) {
    fetch(url)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => console.error("Error cargando " + url, error));
}

function cargarTablaPosiciones() {
    cargarJSON("data/posiciones.json", function (equipos) {
        let tabla = document.querySelector("#tabla-posiciones tbody");
        tabla.innerHTML = "";
        equipos.forEach((equipo, index) => {
            let fila = `<tr>
                <td>${index + 1}</td>
                <td>${equipo.nombre_equipo}</td>
                <td>${equipo.puntos}</td>
                <td>${equipo.partidos_jugados}</td>
                <td>${equipo.diferencia_goles}</td>
            </tr>`;
            tabla.innerHTML += fila;
        });
    });
}
