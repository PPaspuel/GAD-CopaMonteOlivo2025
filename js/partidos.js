document.addEventListener("DOMContentLoaded", function () {
    cargarProximosPartidos();
});

function cargarProximosPartidos() {
    cargarJSON("/data/partidos.json", function (partidos) {
        let lista = document.querySelector("#lista-partidos");
        lista.innerHTML = "";
        partidos.forEach(partido => {
            let item = `<li>${partido.fecha} - ${partido.equipo1} vs ${partido.equipo2}</li>`;
            lista.innerHTML += item;
        });
    });
}