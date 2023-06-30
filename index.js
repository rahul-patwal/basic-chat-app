const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// middleware
app.use('/', express.static(__dirname + '/public'));


io.on('connection', (socket) =>{
    console.log("A user is connected..", socket.id);
    // console.log("A user is connected..", socket);
    // console.log("A user is connected..", socket.id);
    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
      });
      
    //   socket.on('from_client', () =>{
    //     console.log("recieved event from cleint");
    //   })

    //   setInterval(function f(){
    //     socket.emit('from_server');
    //   }, 3000)

    socket.on('new_message', (data) =>{
      //  io.emit('msg_recieved', data) // it send to all
        // to send same client
        //socket.emit('msg_recieved', data) //to particular
        socket.broadcast.emit('msg_recieved', data) //to particular

    })
})






server.listen(3000, () => {
  console.log('listening on *:3000');
});