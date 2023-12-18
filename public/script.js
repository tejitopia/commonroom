document.addEventListener("DOMContentLoaded", () => {
  // we will check if the user accepted the terms or not
  const userAcceptedTerms = localStorage.getItem("termsAccepted");
  if (userAcceptedTerms !== "true") {
    // if the user did not accept the terms, we will redirect him to the terms page
    window.location.href = "/terms.html";
  }

  const socket = io();

  const messageInput = document.getElementById("message-input");
  const sendButton = document.getElementById("send-button");
  const chatContainer = document.getElementById("chat-container");
  const roomInfo = document.getElementById("room-info");
  const usersXcolorMapping = {};

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
      appendMessage("You", message, usersXcolorMapping["thisUser"]);
      socket.emit(
        "message-sent",
        JSON.stringify({
          message,
        })
      );
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

  socket.on("message-received", (data) => {
    let inputData = JSON.parse(data);
    console.log(inputData);
    appendMessage(
      inputData.username,
      inputData.message,
      usersXcolorMapping[inputData.username]
    );
  });

  socket.on("total-online-users", (data) => {
    let inputData = JSON.parse(data);
    console.log(inputData);
    updateOnlineUsersCount(inputData.total_online_users);
  });

  socket.on("user-joined", (data) => {
    let inputData = JSON.parse(data);
    console.log(inputData);

    // lazy approach to find if the user is the current user or not
    // just count the number of chat messages, if it is one then it is the current user
    const chatMessages = document.getElementsByClassName("chat-message");

    let welcomeMessageUser = inputData.username;
    if (chatMessages.length === 0) {
      welcomeMessageUser = "You";
      usersXcolorMapping["thisUser"] = inputData.color;
    }

    console.log(``);

    usersXcolorMapping[inputData.username] = inputData.color;
    startTimer(inputData.time_left);
    appendMessage(welcomeMessageUser, ` joined the chat`, inputData.color);
    updateUsersCount(inputData.people_in_room);
  });

  socket.on("user-left", (data) => {
    let inputData = JSON.parse(data);
    console.log(`User ${data} left the chat`);
    appendMessage(inputData.username, ` left the chat`, inputData.color);
    updateUsersCount(inputData.people_in_room);
  });

  //   socket.on("room assigned", (data) => {
  //     console.log(
  //       `Assigned to room: ${data.room} with duration ${data.duration}`
  //     );
  //     roomInfo.innerHTML = `Room: ${data.room} | Duration: ${Math.floor(
  //       data.duration / 60
  //     )} minutes`;

  //     // Initialize the countdown timer
  //     startTimer(data.duration);
  //   });

  // Function to handle the countdown timer
  let interval;
  function startTimer(duration) {
    clearInterval(interval);
    let minutes, seconds;

    interval = setInterval(() => {
      // Calculate minutes and seconds from duration
      minutes = Math.floor(duration / 60);
      seconds = Math.floor(duration % 60);

      // Update the 'timer-value' span
      const timerValueElement = document.getElementById("timer-value");
      timerValueElement.textContent = `${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;

      // Decrease duration
      duration--;

      // If the duration is zero or less, clear the interval and reset the timer
      if (duration < 0) {
        clearInterval(interval);
        timerValueElement.textContent = "0:00";
        // Redirect user to a new room when the timer ends
        window.location.reload();
      }
    }, 1000);
  }

  // adding event click event listener to the about button
  document.getElementById("about-button").addEventListener("click", (e) => {
    // redirecting the user to the about page
    // window.location.href = "/about.html";
    e.preventDefault();
    document.getElementById("overlay-model").style.display = "block";
  });
});

function updateUsersCount(count) {
  const usersCount = document.getElementById("participant-count");
  usersCount.innerHTML = `👥 ${count}/5 People in Room`;

  if (count === 1) {
    const spinner = document.getElementById("spinner-container");
    // removing border bottom top for divs around spinner
    const chatContainer = document.getElementById("chat-container");
    chatContainer.style.borderBottom = "none";
    const messageInput = document.getElementById("message-input-container");
    messageInput.style.borderTop = "none";
    spinner.style.display = "flex";
  } else {
    const spinner = document.getElementById("spinner-container");

    // adding border bottom top for divs around spinner
    const chatContainer = document.getElementById("chat-container");
    chatContainer.style.borderBottom = "1px solid #dee2e6";
    const messageInput = document.getElementById("message-input-container");
    messageInput.style.borderTop = "1px solid #dee2e6";
    spinner.style.display = "none";
  }
}

function updateOnlineUsersCount(count) {
  const onlineUsersCount = document.getElementById("online-count");
  onlineUsersCount.innerHTML = `🌐 ${count} Online`;
}
