const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 4444
var counter = 1

// TODO: add a public page that redirects to the GitHub repository
// app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.send('<h1>Hello http://localhost:8888/</h1>');
});


function onConnection(socket) {
  socket.on('skeleton', data => {
    console.log(counter + " "+ `Message received: ${data}`)
    counter++
    socket.broadcast.emit('skeleton', data)  
    ///will send the message to all the other clients except the newly created connection
  })
}

io.on('connection', onConnection)

http.listen(port, () => console.log('listening on port ' + port))
