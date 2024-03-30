const socket = io();

const messageContainer = document.getElementById('message-container');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

socket.on('initialMessages', (messages) => {
    messages.forEach(message => appendMessage(message));
});

socket.on('newMessage', (message) => {
    appendMessage(message);
});

sendButton.addEventListener('click', () => {
    const messageText = messageInput.value;
    if (messageText.trim() !== '') {
        const message = {
            text: messageText,
            sender: 'You'
        };
        appendMessage(message);
        socket.emit('sendMessage', message);
        messageInput.value = '';
    }
});

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    const senderElement = document.createElement('p');
    senderElement.classList.add('sender');
    senderElement.innerText = message.sender;
    const textElement = document.createElement('p');
    textElement.innerText = message.text;
    messageElement.appendChild(senderElement);
    messageElement.appendChild(textElement);
    messageContainer.appendChild(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}
