const assert = require("chai").assert;
const Client = require('socket.io-client')
const express = require("express");
const fs = require("fs");
const https = require("https");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 9000;
app.options("*", cors());
app.use(cors());

const httpsServer = https.createServer
(
  {
    key: fs.readFileSync("privkey.pem"),
    cert: fs.readFileSync("fullchain.pem"),
    requestCert: false,
    rejectUnauthorized: false
  },app
).listen(port, () => console.log("listening on port " + port));

const io = require("socket.io")(httpsServer);

describe('3D AI server test', function() {
  var socket;

  before(function(done) {
    // Setup
    socket = Client.connect('https://summerproject.kineviz.com:9000', {
      'reconnection delay' : 0
      , 'reopen delay' : 0
      , 'force new connection' : true
      , transports: ['websocket']
    });

    socket.on('connect', () => {
      done();
    });

    socket.on('disconnect', () => {
      console.log('disconnected...');
    });
  });

  after((done) => {
    // Cleanup
    if(socket.connected) {
      socket.disconnect();
    }
    io.close();
    done();
  });

  it('should pass sending Hello World', (done) => {
    // once connected, emit Hello World
    io.emit('test1', 'Hello World');

    socket.once('test1', (message) => {
      // Check that the message matches
      assert.equal(message, "Hello World");
      done();
    });
  });

  it('should pass sending Skeleton', (done) => {
    let skeleton = {xPoint:0.2525, yPoint:1.2524, bodyPart:"Nose"};
    io.emit('skeleton', skeleton);

    socket.once('skeleton', (message) => {
      // Check that the message matches
      let skeleton = {xPoint:0.2525, yPoint:1.2524, bodyPart:"Nose"};
      console.log("msg => ",message);
      assert.equal(message.xPoint, skeleton.xPoint);
      assert.equal(message.yPoint, skeleton.yPoint);
      assert.equal(message.bodyPart, skeleton.bodyPart);
      done();
    });
  });
});
