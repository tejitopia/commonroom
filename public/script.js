document.addEventListener("DOMContentLoaded", () => {
    const socket = io(); // Connect to the WebSocket server
    
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-button");
    const chatContainer = document.getElementById("chat-container");
    const timerValue = document.getElementById("timer-value");
    
    function appendMessage(username, message, color) {
        const chatMessage = document.createElement("div");
        chatMessage.classList.add("chat-message");
        chatMessage.innerHTML = `<span class="username" style="color: ${color};">${username}:</span> ${message}`;
        chatContainer.appendChild(chatMessage);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message !== "") {
            appendMessage("You", message, "#007bff");
            socket.emit("chat message", { username: "You", message, color: "#007bff" });
            messageInput.value = "";
        }
    }
    
    sendButton.addEventListener("click", () => {
        sendMessage();
    });
    
    messageInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
    
    socket.on("chat message", (data) => {
        appendMessage(data.username, data.message, data.color);
    });
    
    socket.on('room assigned', (data) => {
        console.log(`Assigned to room: ${data.room} with duration ${data.duration}`);
        startTimer(data.duration);
    });
    
    function startTimer(duration) {
        let minutes = Math.floor(duration / 60);
        let seconds = duration % 60;
    
        const timerInterval = setInterval(function() {
            seconds--;
            if (seconds < 0) {
                minutes--;
                seconds = 59;
            }
    
            timerValue.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
            if (minutes <= 0 && seconds <= 0) {
                clearInterval(timerInterval);
                alert('Your chat session has ended.');
                window.location.reload(); // Reload the page to start a new chat session
            }
        }, 1000);
    }
});
