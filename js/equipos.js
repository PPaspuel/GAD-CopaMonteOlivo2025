document.addEventListener("DOMContentLoaded", function () {
    cargarNominadeEquipos();
});

function cargarJSON(url, callback) {
    fetch(url)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => console.error("Error cargando " + url, error));
}

function cargarNominadeEquipos() {
    cargarJSON("data/equipos.json", function (equipos) {
        let listaEquipos = document.querySelector("#lista-equipos");
        listaEquipos.innerHTML = ""; // Limpiar la lista

        equipos.forEach(equipo => {
            let item = document.createElement("li");
            item.innerHTML = `<a class="dropdown-item" href="#" data-nombre="${equipo.nombre}" data-jugadores='${JSON.stringify(equipo.jugadores)}'>${equipo.nombre}</a>`;
            item.addEventListener("click", function () {
                mostrarJugadores(equipo.nombre, equipo.jugadores);
            });
            listaEquipos.appendChild(item);
        });
    });
}

function mostrarJugadores(nombre, jugadores) {
    document.querySelector("#dropdownEquipos").textContent = nombre; // Actualiza el botón del dropdown
    document.querySelector("#nombre-equipo").textContent = nombre; // Muestra el nombre del equipo en la primera fila de la tabla

    let tabla = document.querySelector("#tabla-nomina");
    tabla.innerHTML = ""; // Limpiar la tabla

    // Agregar jugadores en filas numeradas
    jugadores.forEach((jugador, index) => {
        let filaJugador = `<tr><td>${index + 1}</td><td>${jugador}</td></tr>`;
        tabla.innerHTML += filaJugador;
    });
}