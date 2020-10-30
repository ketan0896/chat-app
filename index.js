var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname+'/index.html');
});

io.on('connection', (socket) => {
	io.emit('connections',Object.keys(io.sockets.connected).length);

	socket.on('disconnect', () => {
		io.emit('connections',Object.keys(io.sockets.connected).length);
		//console.log('Disconnected');
	})

	socket.on('chat-message', (data)=>{
		socket.broadcast.emit('chat-message', data);
	});

	socket.on('typing', (data)=>{
		socket.broadcast.emit('typing', data);
	});

	socket.on('stopTyping', (data)=>{
		socket.broadcast.emit('stopTyping', data);
	});

	socket.on('joined', (data) => {
		socket.broadcast.emit('joined', data);
	})

	socket.on('leaved', (data) => {
		socket.broadcast.emit('leaved', data);		
	})
});

http.listen(port, () => {
  console.log('listening on *:' + port);
});
