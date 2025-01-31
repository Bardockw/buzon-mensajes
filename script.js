// Configuración básica del script
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const messageBox = document.getElementById('messageBox');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const messageInput = document.getElementById('messageInput');
  const sendMessageButton = document.getElementById('sendMessage');
  const clearMessageButton = document.getElementById('clearMessage');
  const messagesList = document.getElementById('messagesList');

  // Simulador de credenciales (debe ser reemplazado por autenticación segura)
  const validCredentials = [
    { username: "Tony", password: "0102" },
    { username: "Tiff", password: "0102" },
  ];

  let messages = []; // Almacena los mensajes enviados

  // Verificar las credenciales de acceso
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;

    const isValidUser = validCredentials.some(
      (user) => user.username === username && user.password === password
    );

    if (isValidUser) {
      // Animación para cambiar de pantalla
      gsap.to(loginForm, { duration: 0.5, opacity: 0, y: -20 });
      setTimeout(() => {
        loginForm.classList.add('hidden');
        messageBox.classList.remove('hidden');
        gsap.fromTo(
          messageBox,
          { opacity: 0, y: 20 },
          { duration: 0.5, opacity: 1, y: 0 }
        );
      }, 500);
    } else {
      alert("Usuario o contraseña incorrectos. Inténtalo de nuevo.");
    }
  });

  // Enviar mensaje
  sendMessageButton.addEventListener('click', () => {
    const message = messageInput.value.trim();

    if (message) {
      messages.push(message);
      updateMessagesList();
      messageInput.value = ''; // Limpiar el campo de texto
    } else {
      alert("El mensaje no puede estar vacío.");
    }
  });

  // Borrar el mensaje actual
  clearMessageButton.addEventListener('click', () => {
    messageInput.value = '';
  });

  // Actualizar la lista de mensajes
  function updateMessagesList() {
    messagesList.innerHTML = ''; // Limpiar la lista
    messages.forEach((msg, index) => {
      const li = document.createElement('li');
      li.textContent = msg;
      li.className = 'message-item';

      // Agregar botón de eliminar mensaje
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Eliminar';
      deleteButton.className = 'delete-button';
      deleteButton.addEventListener('click', () => {
        messages.splice(index, 1); // Eliminar mensaje
        updateMessagesList();
      });

      li.appendChild(deleteButton);
      messagesList.appendChild(li);
    });
  }
});
