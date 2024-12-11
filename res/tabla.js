// Variables globales
let currentDate = new Date();
let events = JSON.parse(localStorage.getItem('events')) || {};
let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')); // Obtener el usuario logueado
let cultivos = JSON.parse(localStorage.getItem('cultivos')) || [];
let userEvents = JSON.parse(localStorage.getItem('events'))[loggedInUser ? loggedInUser.idNumber : null] || {}; // Obtener los eventos del usuario logueado

// Funciones de utilidad para guardar eventos de un usuario específico
function saveToLocalStorage() {
    let allEvents = JSON.parse(localStorage.getItem('events')) || {};
    allEvents[loggedInUser.idNumber] = userEvents;
    localStorage.setItem('events', JSON.stringify(allEvents));
}

function saveCultivosToLocalStorage() {
    localStorage.setItem('cultivos', JSON.stringify(cultivos));
}

// Manejo de pestañas
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
        document.getElementById(button.dataset.tab).classList.add('active');
    });
});

// Funcionalidad del calendario
function renderCalendar() {
    const monthYear = document.getElementById('calendar-month-year');
    const calendarBody = document.getElementById('calendar-body');

    monthYear.textContent = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    calendarBody.innerHTML = '';

    for (let i = 0; i < firstDay.getDay(); i++) {
        const emptyDiv = document.createElement('div');
        calendarBody.appendChild(emptyDiv);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
        const day = document.createElement('div');
        day.classList.add('calendar-day');
        day.textContent = i;

        const dateString = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
        if (userEvents[dateString]) {
            day.classList.add('has-event');
        }

        day.addEventListener('click', () => showEventDetails(dateString));

        calendarBody.appendChild(day);
    }
}

function showEventDetails(date) {
    const eventDetails = document.getElementById('event-details');
    if (userEvents[date]) {
        let detailsHTML = `<h3>Eventos para ${date}</h3>`;
        userEvents[date].forEach(event => {
            detailsHTML += `
                <div class="event-item">
                    <img src="${event.imagen || '/placeholder.svg?height=50&width=50'}" alt="${event.cultivo}" class="event-image">
                    <div class="event-details">
                        <strong>${event.cultivo}</strong>: ${event.area} m²
                    </div>
                </div>
            `;
        });
        eventDetails.innerHTML = detailsHTML;

        showModal(`Eventos para ${date}`, detailsHTML);
    } else {
        eventDetails.innerHTML = `<p>No hay eventos para ${date}</p>`;
    }
}

document.getElementById('prev-month').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

document.getElementById('next-month').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// Función para cerrar el modal cuando se hace clic en la "X"
document.querySelector('.close').onclick = function () {
    document.getElementById('eventModal').style.display = 'none';
}

// Función para cerrar el modal cuando se hace clic fuera del contenido del modal
window.onclick = function (event) {
    const modal = document.getElementById('eventModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Función para renderizar los cultivos en el combobox y lista
document.addEventListener('DOMContentLoaded', function() {

    renderCultivos();
});

// Función para renderizar los cultivos
function renderCultivos() {
    const cultivosList = document.getElementById('cultivos-list');
    const cultivoSelect = document.getElementById('cultivo-select');

    if (cultivosList && cultivoSelect) {
        cultivosList.innerHTML = ''; // Limpiar la lista de cultivos
        cultivoSelect.innerHTML = '<option value="">Seleccione un cultivo</option>'; // Limpiar y agregar opción por defecto

        cultivos.forEach((cultivo, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${cultivo}
                <button class="seleccionar-btn" data-index="${index}">Seleccionar</button>
                <button class="eliminar-btn" data-index="${index}">Eliminar</button>
            `;
            cultivosList.appendChild(li);

            const option = document.createElement('option');
            option.value = cultivo;
            option.textContent = cultivo;
            cultivoSelect.appendChild(option);
        });
    }
}

document.getElementById('nuevo-cultivo-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const nuevoCultivo = document.getElementById('nuevo-cultivo-nombre').value;
    if (nuevoCultivo && !cultivos.includes(nuevoCultivo)) {
        cultivos.push(nuevoCultivo);
        renderCultivos();
        saveCultivosToLocalStorage();
    }
    document.getElementById('nuevo-cultivo-nombre').value = '';
});

// Planificación de siembra
document.getElementById('planificar-siembra-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const cultivo = document.getElementById('cultivo-select').value;
    const area = document.getElementById('area-siembra').value;
    const fecha = document.getElementById('fecha-siembra').value;
    const imagenInput = document.getElementById('imagen-cultivo');

    if (cultivo && area && fecha) {
        let imagen = '/placeholder.svg?height=50&width=50';
        if (imagenInput.files && imagenInput.files[0]) {
            imagen = await readFileAsDataURL(imagenInput.files[0]);
        }

        if (!userEvents[fecha]) {
            userEvents[fecha] = [];
        }
        userEvents[fecha].push({ cultivo, area, imagen });
        saveToLocalStorage();
        renderCalendar();

        const eventDetails = `
            <div class="event-item">
                <img src="${imagen}" alt="${cultivo}" class="event-image">
                <div class="event-details">
                    <strong>${cultivo}</strong>: ${area} m²<br>
                    Fecha: ${fecha}
                </div>
            </div>
        `;
        showModal('Evento Registrado', eventDetails);
    }
});

// Función para leer archivo como Data URL
function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsDataURL(file);
    });
}

// Inicialización
renderCalendar();
renderCultivos();

// Add event listeners for new buttons
document.getElementById('cultivos-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('seleccionar-btn')) {
        const index = e.target.dataset.index;
        document.getElementById('cultivo-select').value = cultivos[index];
        document.querySelector('[data-tab="planificar"]').click();
    } else if (e.target.classList.contains('eliminar-btn')) {
        const index = e.target.dataset.index;
        cultivos.splice(index, 1);
        renderCultivos();
        saveCultivosToLocalStorage();
    }
});

// Modal functions
function showModal(title, content) {
    const modal = document.getElementById('eventModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');

    modalTitle.textContent = title;
    modalContent.innerHTML = content;
    modal.style.display = 'block';
}

// Close modal when clicking on <span> (x)
document.querySelector('.close').onclick = function () {
    document.getElementById('eventModal').style.display = 'none';
}

// Close modal when clicking outside of it
window.onclick = function (event) {
    const modal = document.getElementById('eventModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
