document.addEventListener("DOMContentLoaded", function () {
    cargarTablaGoleadores();
});

function cargarJSON(url, callback) {
    fetch(url)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => console.error("Error cargando " + url, error));
}

function cargarTablaGoleadores() {
    cargarJSON("../data/goleadores.json", function (goleadores) {
        let tabla = document.querySelector("#tabla-goleadores tbody");
        tabla.innerHTML = "";
        goleadores.forEach(jugador => {
            let fila = `<tr>
                <td>${jugador.posicion}</td>
                <td>${jugador.nombre}</td>
                <td>${jugador.equipo}</td>
                <td>${jugador.goles}</td>
            </tr>`;
            tabla.innerHTML += fila;
        });
    });
}