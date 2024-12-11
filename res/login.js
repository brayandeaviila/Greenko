document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const toggleRegister = document.getElementById("toggle-register");
    const toggleLogin = document.getElementById("toggle-login");
    const formTitle = document.getElementById("form-title");
    const toggleLoginText = document.getElementById("toggle-login-text");

    // Mostrar formulario de registro
    toggleRegister.addEventListener("click", function (e) {
        e.preventDefault();
        loginForm.style.display = "none";
        registerForm.style.display = "block";
        toggleRegister.parentElement.style.display = "none";
        toggleLoginText.style.display = "block";
        formTitle.textContent = "Registrarse";
    });

    // Mostrar formulario de inicio de sesión
    toggleLogin.addEventListener("click", function (e) {
        e.preventDefault();
        registerForm.style.display = "none";
        loginForm.style.display = "block";
        toggleLoginText.style.display = "none";
        toggleRegister.parentElement.style.display = "block";
        formTitle.textContent = "Iniciar Sesión";
    });
});


// Obtener el formulario de login y los elementos necesarios
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Event listener para el formulario de login
loginForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Evitar el comportamiento predeterminado del formulario

    // Obtener el correo y la contraseña del formulario
    const email = emailInput.value;
    const password = passwordInput.value;

    // Recuperar los usuarios desde localStorage
    const users = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Buscar el usuario que coincide con el correo electrónico y la contraseña
    const user = users.find(u => u.email === email && u.password === password);

    // Si el usuario existe, guardamos su nombre en el localStorage y redirigimos al dashboard
    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user)); // Guardar el usuario en localStorage
        window.location.href = 'dashboard.html'; // Redirigir al dashboard
    } else {
        alert('Usuario o contraseña incorrectos.'); // Mensaje de error si el login falla
    }
});

