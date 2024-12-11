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
