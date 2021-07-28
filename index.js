const express = require("express");
const fs = require("fs");
const https = require("https");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 9000;

app.options("*", cors());
app.use(cors());

const httpsServer = https
  .createServer(
    {
      key: fs.readFileSync("privkey.pem"),
      cert: fs.readFileSync("fullchain.pem"),
      requestCert: false,
      rejectUnauthorized: false
    },
    app
  )
  .listen(port, () => console.log("listening on port " + port));

const io = require("socket.io")(httpsServer);

app.get("/", (req, res) => {
  res.send("<h1>Marisa and Barbora Port 3333</h1>");
});

var counter = 1;

function onConnection(socket) {
  socket.on("skeleton", data => {
    console.log("A user connected");

    socket.on("disconnect", function() {
       console.log("A user disconnected");
    });

    console.log(data);
    console.log(counter + " " + `Message received: ${data}`);
    counter++;
    socket.broadcast.emit("skeleton", data);
  });
}

io.on("connection", onConnection);
