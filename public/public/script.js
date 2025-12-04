const socket = io("https://real-time-chatbox-f4k1.onrender.com");

// Select elements
const msgInput = document.getElementById("msgInput");
const messagesDiv = document.getElementById("messages");

// Send message
function sendMessage() {
    const text = msgInput.value.trim();
    if (text === "") return;

    // Show instantly on your screen
    addMessage(text, true);

    // Send to server
    socket.emit("chatMessage", text);

    msgInput.value = "";
}

// Receive messages from server
socket.on("chatMessage", (msg) => {
    addMessage(msg, false);
});

// Function to add message to chat UI
function addMessage(text, isSelf) {
    const div = document.createElement("div");
    div.classList.add("msg");
    if (isSelf) div.classList.add("self");

    div.textContent = text;
    messagesDiv.appendChild(div);

    // Auto scroll to bottom
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Send message on Enter key
msgInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});