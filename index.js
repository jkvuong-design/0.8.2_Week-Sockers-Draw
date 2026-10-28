// Initialize the express 'app' object
let express = require("express");
let app = express();

// Initialize HTTP server
let http = require("http");
let server = http.createServer(app);

// Initialize Socket.IO
let io = require("socket.io");
io = new io.Server(server);

// Serve static files from the 'public' directory
app.use("/", express.static("public"));

// Socket connection handling
io.on("connection", (socket) => {
  console.log("Client connected: " + socket.id);

  // Listen for 'message' events containing emoji position payload { x, y, emoji, size }
  socket.on("message", (data) => {
    console.log(`Emoji payload from ${socket.id}:`, data);

    // Broadcast emoji trail data to ALL connected clients
    io.emit("message-share", data);
  });

  // Handle client disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected: " + socket.id);
  });
});

// Set port and start server
let port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("App listening on port: " + port);
});