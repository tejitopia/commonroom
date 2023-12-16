document.addEventListener("DOMContentLoaded", () => {
    const socket = io();
    
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-button");
    const chatContainer = document.getElementById("chat-container");
    const roomInfo = document.getElementById("room-info");
    
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
    roomInfo.innerHTML = `Room: ${data.room} | Duration: ${Math.floor(data.duration / 60)} minutes`;
    
    // Initialize the countdown timer
    startTimer(data.duration);
    });
    
    // Function to handle the countdown timer
    function startTimer(duration) {
    let minutes = Math.floor(duration / 60);
    let seconds = duration % 60;
    
    const timerElement = document.getElementById("timer");
    timerElement.innerHTML = `${minutes} minutes and ${seconds} seconds`;
    
    const interval = setInterval(() => {
    if (duration > 0) {
    minutes = Math.floor(duration / 60);
    seconds = duration % 60;
    
    timerElement.innerHTML = `${minutes} minutes and ${seconds} seconds`;
    
    duration--;
    } else {
    clearInterval(interval);
    // Redirect user to a new room when the timer ends
    window.location.reload();
    }
    }, 1000);
    }
    })