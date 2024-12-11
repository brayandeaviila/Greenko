// Función para mostrar los cultivos del usuario en el dashboard
function mostrarCultivosEnDashboard() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));  // Obtener el usuario logueado
    const cultivosList = document.getElementById('user-cultivos-list');  // La lista donde se mostrarán los cultivos
    const allEvents = JSON.parse(localStorage.getItem('events')) || {};  // Obtener todos los eventos (siembras)

    // Limpiar la lista antes de agregar nuevos cultivos
    cultivosList.innerHTML = '';

    // Si el usuario tiene cultivos, mostrarlos
    if (allEvents[loggedInUser.idNumber]) {
        const userEvents = allEvents[loggedInUser.idNumber];  // Obtener los eventos del usuario

        // Recorrer los eventos y mostrarlos como cultivos
        Object.keys(userEvents).forEach(date => {
            userEvents[date].forEach(event => {
                const li = document.createElement('li');
                li.textContent = `${event.cultivo} - Fecha: ${date} - Área: ${event.area} m²`;
                cultivosList.appendChild(li); // Agregar el cultivo a la lista
            });
        });
    } else {
        cultivosList.innerHTML = '<li>No tienes cultivos registrados.</li>';  // Mensaje si no hay cultivos
    }
}

// Llamar a la función para mostrar los cultivos cuando la página se cargue
document.addEventListener('DOMContentLoaded', function() {
    mostrarCultivosEnDashboard();  // Mostrar los cultivos en el dashboard
});
