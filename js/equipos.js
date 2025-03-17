document.addEventListener("DOMContentLoaded", function () {
    cargarNominadeEquipos();
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

function cargarJSON(url, callback) {
    fetch(url)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => console.error("Error cargando " + url, error));
}

function cargarNominadeEquipos() {
    cargarJSON("../data/equipos.json", function (equipos) {
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

// Modificación en el JavaScript
function mostrarJugadores(nombre, jugadores) {
    document.querySelector("#dropdownEquipos").textContent = nombre;
    document.querySelector("#nombre-equipo").textContent = nombre;

    let tabla = document.querySelector("#tabla-nomina");
    tabla.innerHTML = "";

    jugadores.forEach((jugador, index) => {
        let filaJugador = `<tr>
            <td>${index + 1}</td>
            <td>${jugador.numero}</td>
            <td>${jugador.nombre}</td>
        </tr>`;
        tabla.innerHTML += filaJugador;
    });
}