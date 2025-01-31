document.addEventListener('DOMContentLoaded', () => {
  gsap.from(".login-container", { duration: 1, opacity: 0, y: 50, ease: "power2.out" });

  const loginForm = document.getElementById('loginForm');
  const messageBox = document.getElementById('messageBox');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const messageInput = document.getElementById('messageInput');
  const sendMessageButton = document.getElementById('sendMessage');
  const clearMessageButton = document.getElementById('clearMessage');
  const messagesList = document.getElementById('messagesList');

  let messages = JSON.parse(localStorage.getItem('messages')) || [];
  let currentUser = localStorage.getItem('currentUser');

  function saveMessages() {
    localStorage.setItem('messages', JSON.stringify(messages));
  }

  function loadMessages() {
    messagesList.innerHTML = '';
    messages.forEach(msg => {
      const div = document.createElement('div');
      div.className = `message-item ${msg.sender === "Tony" ? "message-tony" : "message-tiff"}`;
      div.textContent = msg.content;
      messagesList.appendChild(div);
    });
    messagesList.scrollTop = messagesList.scrollHeight;
  }

  if (currentUser) {
    loginForm.classList.add('hidden');
    messageBox.classList.remove('hidden');
    loadMessages();
  }

  document.getElementById('login').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();

    if (username === "Tony" || username === "Tiff") {
      localStorage.setItem('currentUser', username);
      currentUser = username;

      gsap.to(loginForm, { duration: 0.5, opacity: 0, y: -50 });
      setTimeout(() => {
        loginForm.classList.add('hidden');
        messageBox.classList.remove('hidden');
        gsap.fromTo(messageBox, { opacity: 0, y: 50 }, { opacity: 1, y: 0 });
      }, 500);
      loadMessages();
    } else {
      alert("Usuario incorrecto. Usa 'Tony' o 'Tiff'.");
    }
  });

  sendMessageButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
      messages.push({ content: message, sender: currentUser });
      saveMessages();
      loadMessages();
      messageInput.value = '';
    }
  });

  clearMessageButton.addEventListener('click', () => {
    messageInput.value = '';
  });

  window.addEventListener('storage', () => {
    messages = JSON.parse(localStorage.getItem('messages')) || [];
    loadMessages();
  });
});
