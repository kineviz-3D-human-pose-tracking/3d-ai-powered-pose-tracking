const express = require('express')
const app = express()
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});
//const https = require('https').Server(app)
const https = require('https')
const fs = require('fs');
const io = require('socket.io')(https, {
  cors: {
    origin: "*:*",
    // origin: "https://mt-cs.static.observableusercontent.com/",
    // methods: ["GET", "POST"],
    // allowedHeaders: ["kineviz"],
    // credentials: true
  }
});
const port = process.env.PORT || 3333
var counter = 1

// const options = {
//   key: fs.readFileSync('privkey.pem'),
//   cert: fs.readFileSync('fullchain.pem')
// };

// TODO: add a public page that redirects to the GitHub repository
// app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.send('<h1>Marisa and Barbora Port http://localhost:3333/</h1>');
});

function onConnection(socket) {
  socket.on('skeleton', data => {
    console.log('A user connected')
    // setTimeout(function() {
    //   socket.send('Sent a message 4seconds after connection!');
    // }, 4000);

    socket.on('disconnect', function () {
      console.log('A user disconnected');
    });

    // socket.setInterval(function timeout() {
    //   socket.ping();
    //   console.log('Pinging every 1sec (setInterval test)');
    // }, 1000);

    console.log(data)
    console.log(counter + " "+ `Message received: ${data}`)
    counter++
    socket.broadcast.emit('skeleton', data)  
    ///will send the message to all the other clients except the newly created connection
  })
}

io.on('connection', onConnection)

// https.listen(port, '0.0.0.0', () => console.log('listening on port ' + port))

// https.createServer(options, function (req, res) {
//   res.writeHead(200);
//   res.end("hello world marisa barbora\n");
// }).listen(port, '0.0.0.0');


https.createServer({
    key: fs.readFileSync('privkey.pem'),
    cert: fs.readFileSync('fullchain.pem'),
    // ca: fs.readFileSync('./test_ca.crt'),
    requestCert: false,
    rejectUnauthorized: false
}, app).listen(port);

// var io = require('socket.io').listen(server);

// io.sockets.on('connection',function (socket) {
//     ...
// });
