const socket = io("https://real-time-chatbox-f4k1.onrender.com");

let username = "";

// Step 1: Set username
function setUsername() {
    const input = document.getElementById("usernameInput").value.trim();

    if (input.length === 0) return;
    username = input;

    document.getElementById("username-screen").classList.add("hidden");
    document.getElementById("chat-screen").classList.remove("hidden");

    document.getElementById("welcome").textContent = "Welcome, " + username + "!";

    socket.emit("userJoined", username);
}

// Step 2: Send message
function sendMessage() {
    const msg = document.getElementById("msgInput").value.trim();
    if (msg.length === 0) return;

    socket.emit("chatMessage", { username, msg });
    addMessage(username, msg, true);

    document.getElementById("msgInput").value = "";
}

// Step 3: Receive messages
socket.on("chatMessage", (data) => {
    addMessage(data.username, data.msg, false);
});

// Step 4: User joined
socket.on("userJoined", (name) => {
    const messages = document.getElementById("messages");
    const notice = document.createElement("div");
    notice.classList.add("join-notice");
    notice.textContent = name + " joined the chat!";
    messages.appendChild(notice);
});

// Step 5: Add message bubbles
function addMessage(user, text, isSelf) {
    const messages = document.getElementById("messages");

    const bubble = document.createElement("div");
    bubble.classList.add("msg");
    if (isSelf) bubble.classList.add("self");

    bubble.innerHTML = '<strong>${user}:</strong>${text}';
    messages.appendChild(bubble);

    messages.scrollTop = messages.scrollHeight;
}