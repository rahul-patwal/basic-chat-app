const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const connect = require('./config/db-config');
const io = new Server(server);
// app.use('/', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}))
// middleware


io.on('connection', (socket) =>{
    console.log("A user is connected..", socket.id);

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
      });
      
    //   socket.on('from_client', () =>{
    //     console.log("recieved event from cleint");
    //   })
    //   setInterval(function f(){
    //     socket.emit('from_server');
    //   }, 3000)

    socket.on("join_room", (data) =>{
      console.log("inside join_room ========== ", data);
      console.log("joining a room", data.roomid);
      socket.join(data.roomid);
    })

    socket.on('new_message', (data) =>{
      //  io.emit('msg_recieved', data) // it send to all
        // to send same client
        //socket.emit('msg_recieved', data) //to particular
       // socket.broadcast.emit('msg_recieved', data) //to particular
        io.to(data.roomid).emit('msg_recieved', data);
    })
})


app.get('/chat/:roomid/:user', async(req , res) =>{
  res.render('index', {roomid : req.params.roomid, user: req.params.user})
})

app.get('/group', async(req , res) =>{
  res.render('group')
})

app.post('/group', async(req , res) =>{
     console.log(req.body)
})


server.listen(3000, async() => {
  console.log('listening on *:3000');
  // await connect();
  console.log("DB Connected ..")
});