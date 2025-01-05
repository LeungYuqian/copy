
// put your code here...
const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-btn');
const nicknameInput = document.getElementById('nickname');
const joinButton = document.getElementById('join-btn');
const nicknameContainer = document.getElementById('nickname-container');
const chatInputContainer = document.getElementById('chat-input');

// 获取存储的聊天记录
const getMessages = () => JSON.parse(localStorage.getItem('messages')) || [];

// 保存消息到 localStorage
const saveMessage = (messages) => {
  localStorage.setItem('messages', JSON.stringify(messages));
};

// 显示所有消息
const renderMessages = () => {
  const messages = getMessages();
  messagesContainer.innerHTML = '';  // 清空现有消息
  messages.forEach(msg => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<strong>${msg.username}:</strong> ${msg.text}`;
    messagesContainer.appendChild(messageElement);
  });
  messagesContainer.scrollTop = messagesContainer.scrollHeight; // 滚动到底部
};

// 处理用户输入并发送消息
const sendMessage = () => {
  const messageText = messageInput.value.trim();
  const username = localStorage.getItem('username'); // 获取用户名

  if (messageText && username) {
    const messages = getMessages();
    messages.push({ username, text: messageText });
    saveMessage(messages);
    renderMessages();
    messageInput.value = ''; // 清空输入框
  }
};

// 加入聊天室
const joinChat = () => {
  const username = nicknameInput.value.trim();
  if (username) {
    localStorage.setItem('username', username); // 保存用户名到 localStorage
    nicknameContainer.style.display = 'none'; // 隐藏昵称输入框
    chatInputContainer.style.display = 'flex'; // 显示聊天输入框
    renderMessages(); // 显示历史消息
  } else {
    alert('请输入一个有效的昵称');
  }
};

// 监听发送按钮点击事件
sendButton.addEventListener('click', sendMessage);

// 监听回车键发送消息
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

// 监听加入聊天室按钮点击事件
joinButton.addEventListener('click', joinChat);

// 初始化
if (localStorage.getItem('username')) {
  nicknameContainer.style.display = 'none'; // 如果已经有用户名，直接隐藏昵称输入框
  chatInputContainer.style.display = 'flex'; // 显示聊天输入框
  renderMessages(); // 显示历史消息
} else {
  chatInputContainer.style.display = 'none'; // 初始时隐藏聊天输入框
}
