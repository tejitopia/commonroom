document.addEventListener('DOMContentLoaded', () => {
    const socket = io(); // Connect to the WebSocket server
    console.log('Socket connected');
    
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const chatContainer = document.getElementById('chat-container');
    
    const userColors = {
    user1: '#007bff', // Blue
    user2: '#28a745', // Green
    user3: '#dc3545', // Red
    user4: '#ffc107', // Yellow
    user5: '#17a2b8', // Cyan
    };
    
    // Function to append a new message to the chat container
    function appendMessage(username, message, color) {
    const chatMessage = document.createElement('div');
    chatMessage.classList.add('chat-message');
    chatMessage.innerHTML = `
    <span class="username" style="color: ${color};">${username}:</span> ${message}
    `;
    chatContainer.appendChild(chatMessage);
    // Scroll to the bottom of the chat container
    chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
    // Function to send a message to the server
    function sendMessage() {
    const message = messageInput.value.trim();
    if (message !== '') {
    // Emit a 'chat message' event to the server
    console.log('Sending message:', message);
    socket.emit('chat message', { username: 'YourUsername', message, color: '#007bff' });
    
    // Append the message to the chat container
    appendMessage('YourUsername', message, '#007bff');
    
    messageInput.value = ''; // Clear the input field
    }
    }
    
    // Event listener for sending a message when the button is clicked
    sendButton.addEventListener('click', () => {
    sendMessage();
    });
    
    // Event listener for sending a message when the "Enter" key is pressed
    messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
    sendMessage();
    }
    });
    
    // Event listener for receiving a message from the server
    socket.on('chat message', (data) => {
    console.log('Received message:', data);
    appendMessage(data.username, data.message, data.color);
    });
    
    // Emit a test event to the server
    socket.emit('test event', { message: 'This is a test message from the client' });
    
    // Listen for a test response event from the server
    socket.on('test response', (data) => {
    console.log('Received test response from server:', data.message);
    });
    });