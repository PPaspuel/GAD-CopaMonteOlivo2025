document.addEventListener("DOMContentLoaded", function () {
    cargarTablaPosiciones();
    cargarProximosPartidos();
    cargarTablaGoleadores();
    cargarNominadeEquipos();
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
                <td>${equipo.nombre}</td>
                <td>${equipo.puntos}</td>
                <td>${equipo.jugados}</td>
                <td>${equipo.goles}</td>
            </tr>`;
            tabla.innerHTML += fila;
        });
    });
}

function cargarProximosPartidos() {
    cargarJSON("data/partidos.json", function (partidos) {
        let lista = document.querySelector("#lista-partidos");
        lista.innerHTML = "";
        partidos.forEach(partido => {
            let item = `<li>${partido.fecha} - ${partido.equipo1} vs ${partido.equipo2}</li>`;
            lista.innerHTML += item;
        });
    });
}

function cargarTablaGoleadores() {
    cargarJSON("data/goleadores.json", function (goleadores) {
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

function cargarNominadeEquipos() {
    cargarJSON("data/equipos.json", function (equipos) {
        let lista = document.querySelector("#lista-equipos");
        lista.innerHTML = "";
        equipos.forEach(equipo => {
            let item = `<li>${equipo.nombre}: ${equipo.jugadores.join(", ")}</li>`;
            lista.innerHTML += item;
        });
    });
}


fetch("data/posiciones.json")
    .then(response => response.text()) // Convertimos a texto en lugar de JSON
    .then(text => {
        console.log("Contenido recibido:", text); // Ver qué está recibiendo el fetch
        return JSON.parse(text); // Intentar parsear manualmente
    })
    .then(data => console.log("JSON parseado correctamente:", data))
    .catch(error => console.error("Error al cargar JSON:", error));
