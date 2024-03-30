let messages = [];

function addMessage(message) {
    messages.push(message);
}

function getMessages() {
    return messages;
}

module.exports = {
    addMessage,
    getMessages
};
