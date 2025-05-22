// Ваши Firebase-конфигурационные данные (замените на свои)
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "glovimplaye-b1023.firebaseapp.com",
  databaseURL: "https://glovimplaye-b1023-default-rtdb.firebaseio.com",
  projectId: "glovimplaye-b1023",
  storageBucket: "glovimplaye-b1023.firebasestorage.app",
  messagingSenderId: "553440591519",
  appId: "1:553440591519:web:b7be45a9253689f322acaa"
};

// Инициализация Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Элементы DOM
const chatList = document.getElementById('chat-list');
const chatTitle = document.getElementById('chat-title');
const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

let currentDialog = null;

// Обработка клика по элементам списка диалогов
chatList.addEventListener('click', (e) => {
  if (e.target && e.target.tagName === 'LI') {
    currentDialog = e.target.getAttribute('data-dialog');
    chatTitle.textContent = e.target.textContent;
    // Очистка сообщений при выборе нового диалога
    chatMessages.innerHTML = '';
    loadMessages(currentDialog);
  }
});

sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

function sendMessage() {
  const msg = messageInput.value.trim();
  if (!msg || !currentDialog) return;

  const messageData = {
    text: msg,
    timestamp: Date.now()
  };

  // Сохраняем сообщение в Firebase Realtime Database
  const dialogRef = db.ref('messages/' + currentDialog);
  dialogRef.push(messageData);

  // Отображаем отправленное сообщение (стилизация как своё сообщение)
  addMessage(msg, 'user');
  messageInput.value = '';
}

function loadMessages(dialog) {
  const dialogRef = db.ref('messages/' + dialog);
  // Убираем предыдущие слушатели, если есть
  dialogRef.off();
  // Слушаем добавление новых сообщений
  dialogRef.on('child_added', snapshot => {
    const data = snapshot.val();
    // Если сообщение уже отображено как своё, то пропускаем (на клиенте добавляется сразу)
    if (data.text && !isMessageDisplayed(data.timestamp)) {
      addMessage(data.text, 'other');
    }
  });
}

// Простой механизм для избежания повторного отображения сообщения
let displayedMessages = new Set();
function isMessageDisplayed(timestamp) {
  if (displayedMessages.has(timestamp)) return true;
  displayedMessages.add(timestamp);
  return false;
}

function addMessage(text, type) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', type);
  msgDiv.textContent = text;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
