document.addEventListener("DOMContentLoaded", function () {
    cargarTablaGoleadores();
});

function cargarTablaGoleadores() {
    cargarJSON("/data/goleadores.json", function (goleadores) {
        let tabla = document.querySelector("#tabla-goleadores tbody");
        tabla.innerHTML = "";
        goleadores.forEach(jugador => {
            let fila = `<tr>
                <td>${jugador.nombre}</td>
                <td>${jugador.equipo}</td>
                <td>${jugador.goles}</td>
            </tr>`;
            tabla.innerHTML += fila;
        });
    });
}