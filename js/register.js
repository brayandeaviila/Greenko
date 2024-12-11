document.getElementById('register-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Evitar el comportamiento predeterminado del formulario

    // Obtener los valores del formulario
    const name = document.getElementById('name').value;
    const idType = document.getElementById('id-type').value;
    const idNumber = document.getElementById('id-number').value;
    const birthDate = document.getElementById('birth-date').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    // Crear el objeto de usuario
    const user = {
        name: name,
        idType: idType,
        idNumber: idNumber,
        birthDate: birthDate,
        phone: phone,
        email: email,
        password: password
    };

    // Obtener usuarios del localStorage o inicializar un array vacío
    let users = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Agregar el nuevo usuario
    users.push(user);

    // Guardar el array actualizado de usuarios en localStorage
    localStorage.setItem('usuarios', JSON.stringify(users));

    // Limpiar el formulario
    document.getElementById('register-form').reset();

    // Mostrar el mensaje de confirmación
    const confirmationMessage = document.getElementById('confirmation-message');
    confirmationMessage.style.display = 'block';

    // Ocultar el mensaje después de 3 segundos (opcional)
    setTimeout(function () {
        confirmationMessage.style.display = 'none';
    }, 3000);

    e.preventDefault();
    registerForm.style.display = "none";
    loginForm.style.display = "block";
    toggleLoginText.style.display = "none";
    toggleRegister.parentElement.style.display = "block";
    formTitle.textContent = "Iniciar Sesión";
});
