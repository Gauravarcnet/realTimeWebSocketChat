const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);
const port = 8000;

server.listen(port, () => {
  console.log(`Server is running at port //${port}`);
});

app.get('/', (req,res) => {
  res.sendFile(__dirname + '/public/index.html');
});
app.get('/javascript', (req,res) => {
  res.sendFile(__dirname + '/public/javascript.html');
});

app.get('/css', (req,res) => {
  res.sendFile(__dirname + '/public/css.html');
});

app.get('/swift', (req,res) => {
  res.sendFile(__dirname + '/public/swift.html');
});
// tech namespace

const tech = io.of('/tech');
tech.on('connection',(socket) => {

  socket.on('join',(data)=>{
    socket.join(data.room);
    tech.in(data.room).emit('message',`New User joined:${data.room} room!`);
  });
  // socket.emit('message', {manny:'hwy how are you?'});
  // socket.on('another event', (data) => {
  //   console.log(data);
  // })


  socket.on('message',(data)=>{
    console.log(`message:${data.msg}`);
    tech.in(data.room).emit('message',data.msg);
  });

  socket.on('disconnect',()=>{
    console.log('user disconnected');
    tech.emit('message',"user disconnected");
  });

})
