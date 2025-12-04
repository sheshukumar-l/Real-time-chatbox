const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
    cors: { origin: "*" }
});

app.use(express.static("public"));

io.on("connection", (socket) => {

    socket.on("userJoined", (name) => {
        io.emit("userJoined", name);
    });

    socket.on("chatMessage", (data) => {
        io.emit("chatMessage", data);
    });
});

http.listen(3000, () => console.log("Server running"));