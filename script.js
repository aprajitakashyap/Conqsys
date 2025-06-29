document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for navigation
  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Dark Mode Toggle
  const toggle = document.getElementById('modeToggle');
  toggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
  });
  // Chatbot functionality
  const form = document.getElementById('chatForm');
  const input = document.getElementById('userInput');
  const chatBox = document.getElementById('chatBox');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userText = input.value.trim();
    if (!userText) return;

    appendMessage('user', userText);
    input.value = '';

    // Show typing...
    appendMessage('bot', 'Typing...');

    // Use your API key securely on server-side in production
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_OPENAI_API_KEY"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userText }]
      })
    });

    const data = await response.json();
    const botReply = data.choices[0].message.content;

    // Remove typing...
    chatBox.removeChild(chatBox.lastChild);
    appendMessage('bot', botReply);
  });

  function appendMessage(sender, text) {
    const message = document.createElement('div');
    message.className = `chat-message ${sender}`;
    message.textContent = text;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

});