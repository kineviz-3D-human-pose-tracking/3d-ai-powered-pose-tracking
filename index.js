const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 3333
var counter = 1

// TODO: add a public page that redirects to the GitHub repository
// app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.send('<h1>Hello http://localhost:3333/</h1>');
});


function onConnection(socket) {
  socket.on('skeleton', data => {
    var parsed = JSON.parse(data);
    console.log(counter + " " + `Message received: ` + JSON.stringify(parsed.position))
    console.log(" ")
    counter = counter + 1
    //socket.broadcast.emit('chat', data)
    socket.broadcast.emit('skeleton', JSON.stringify(parsed.position))  
  })
  setTimeout(function() {
    socket.send('Sent a message 4seconds after connection!');
 }, 4000);
}

io.on('connection', onConnection)

http.listen(port, () => console.log('listening on port ' + port))
