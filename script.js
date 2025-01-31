document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const messageBox = document.getElementById('messageBox');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const messageInput = document.getElementById('messageInput');
  const sendMessageButton = document.getElementById('sendMessage');
  const clearMessageButton = document.getElementById('clearMessage');
  const messagesList = document.getElementById('messagesList');

  const validCredentials = [
    { username: "Tony", password: "0102" },
    { username: "Tiff", password: "0102" },
  ];

  let messages = [];

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;

    const isValidUser = validCredentials.some(
      (user) => user.username === username && user.password === password
    );

    if (isValidUser) {
      gsap.to(loginForm, { duration: 0.5, opacity: 0, y: -50 });
      setTimeout(() => {
        loginForm.classList.add('hidden');
        messageBox.classList.remove('hidden');
        gsap.fromTo(messageBox, { opacity: 0, y: 50 }, { opacity: 1, y: 0 });
      }, 500);
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  });

  sendMessageButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
      messages.push({ content: message, sender: "You" });
      updateMessages();
      messageInput.value = '';
    }
  });

  clearMessageButton.addEventListener('click', () => {
    messageInput.value = '';
  });

  function updateMessages() {
    messagesList.innerHTML = '';
    messages.forEach((msg) => {
      const div = document.createElement('div');
      div.className = `message-item ${msg.sender === "You" ? "sender" : ""}`;
      div.textContent = msg.content;
      messagesList.appendChild(div);
    });
    messagesList.scrollTop = messagesList.scrollHeight;
  }
});
