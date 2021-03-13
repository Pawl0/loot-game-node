console.log('> Script started')
const express = require('express')
const cors = require('cors')
const webApp = express()
const webServer = require('http').createServer(webApp)
// webServer.use(cors)
const io = require("socket.io")(webServer, {
    cors: {
      origin: "http://localhost:3001",
      methods: ["GET", "POST"]
    }
  });

var middleware = require('socketio-wildcard')();

io.use(middleware);

// setInterval(() => {
//   io.emit('concurrent-connections', io.engine.clientsCount)
//   console.log("emitting socket")
// }, 5000)

io.on('connection', function(socket){
  
    console.log("Client "+socket.id+" connected")
    
    socket.on('disconnect', () => {
        console.log("disconnect")
    })
    
    socket.on("*", (event) => {
        console.log(`got ${event}`);
    });
    socket.on("message", () => console.log("message received"))
    socket.on("message", (data) => console.log(data))

});

webServer.listen(3000, function(){
  console.log('> Server listening on port:',3000)
});