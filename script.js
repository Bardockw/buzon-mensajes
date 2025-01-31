// Credenciales permitidas
const validCredentials = [
    { username: "Tony", password: "0102" },
    { username: "Tiff", password: "0102" }
  ];
  
  // Variables
  const loginScreen = document.querySelector(".login-screen");
  const messageScreen = document.querySelector(".message-screen");
  const loginButton = document.getElementById("login-button");
  const errorMessage = document.getElementById("error-message");
  const messageInput = document.getElementById("message-input");
  const sendButton = document.getElementById("send-button");
  const clearButton = document.getElementById("clear-button");
  const messagesContainer = document.getElementById("messages-container");
  
  // Horarios
  const startHour = 23; // 11 PM
  const startMinute = 11;
  const endHour = 11; // 11 AM
  const endMinute = 11;
  
  // Función para verificar horario
  function isWithinSchedule() {
    const now = new Date();
    const peruTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Lima" }));
    const hours = peruTime.getHours();
    const minutes = peruTime.getMinutes();
  
    if (
      (hours > startHour || (hours === startHour && minutes >= startMinute)) ||
      (hours < endHour || (hours === endHour && minutes <= endMinute))
    ) {
      return true;
    }
    return false;
  }
  
  // Login
  loginButton.addEventListener("click", () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    const isValid = validCredentials.some(
      (cred) => cred.username === username && cred.password === password
    );
  
    if (!isValid) {
      errorMessage.classList.remove("hidden");
    } else if (!isWithinSchedule()) {
      alert("Esta página solo está disponible los domingos de 11:11 PM a 11:11 AM.");
    } else {
      loginScreen.classList.add("hidden");
      messageScreen.classList.remove("hidden");
    }
  });
  
  // Enviar mensaje
  sendButton.addEventListener("click", () => {
    const messageText = messageInput.value;
    if (messageText.trim() === "") return;
  
    const messageElement = document.createElement("div");
    messageElement.className = "message";
    messageElement.textContent = messageText;
  
    messagesContainer.appendChild(messageElement);
    messageInput.value = "";
  });
  
  // Eliminar texto
  clearButton.addEventListener("click", () => {
    messageInput.value = "";
  });
  