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

  const validUsers = ["Tony", "Tiff"];
  let currentUser = null;
  let messages = JSON.parse(localStorage.getItem('messages')) || [];

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();

    if (validUsers.includes(username)) {
      currentUser = username;
      gsap.to(loginForm, { duration: 0.5, opacity: 0, y: -50 });
      setTimeout(() => {
        loginForm.classList.add('hidden');
        messageBox.classList.remove('hidden');
        gsap.fromTo(messageBox, { opacity: 0, y: 50 }, { opacity: 1, y: 0 });
      }, 500);
      loadMessages();
    } else {
      alert("Usuario no válido");
    }
  });

  sendMessageButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message && currentUser) {
      messages.push({ content: message, sender: currentUser });
      localStorage.setItem('messages', JSON.stringify(messages));
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
      div.className = `message-item ${msg.sender === currentUser ? "sender" : ""}`;
      div.textContent = `${msg.sender}: ${msg.content}`;
      messagesList.appendChild(div);
    });
    messagesList.scrollTop = messagesList.scrollHeight;
  }

  function loadMessages() {
    updateMessages();
  }
});
