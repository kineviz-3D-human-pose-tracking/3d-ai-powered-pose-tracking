const express = require("express");
const fs = require("fs");
//const https = require('https').Server(app)
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
      // ca: fs.readFileSync('./test_ca.crt'),
      requestCert: false,
      rejectUnauthorized: false
    },
    app
  )
  .listen(port, () => console.log("listening on port " + port));

const io = require("socket.io")(httpsServer);

//app.use(function(req, res, next) {
//  res.header("Access-Control-Allow-Origin", "https://mt-cs.static.observableusercontent.com");
//  res.header("Access-Control-Allow-Headers", "X-Requested-With");
//  res.header("Access-Control-Allow-Headers", "Content-Type");
//  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
//  res.header("Access-Control-Allow-Credentials", "true");
//  next();
//});

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
    setInterval(function() {
      socket.broadcast.emit("skeleton", data);
    }, 2000);
    ///will send the message to all the other clients except the newly created connection
  });
  socket.on("chat", data => {
    // console.log(`Message received: ${data}`)
    socket.broadcast.emit("chat", data);
  });
}

io.on("connection", onConnection);
