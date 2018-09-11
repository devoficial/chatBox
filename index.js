import express from 'express';
const app = express();
import http from 'http';
const server = http.Server(app);
const PORT = 3000;
// settingup socket.io
const io = require('socket.io')(server);
app.use(express.static('public'));
// Index page
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});
// server "/" get the index.html file
app.get('/friends', (req, res) => {
	res.sendFile(__dirname + '/public/friends.html');
});

app.get('/family', (req, res) => {
	res.sendFile(__dirname + '/public/family.html');
});

// Friends namespace
const chat = io.of('/chat');
chat.on('connection',(socket) => {
	socket.emit('message',{
		chat:'chatbox'
	});
	socket.emit('welcome',{
		data:'welcome to friends chat box'
	});


	// Adding the messages
	socket.on('join',(data) => {
		socket.join(data.room);
		chat.in(data.room).emit('msg',`
			New user joins the ${data.room} room!
		`);
	});

	socket.on('msg',(data) => {
		chat.in(data.room).emit('msg',data.msg);
	});

	socket.on('disconnect',() => {
		chat.emit('msg','user diconnected');
	});
});

// Family namespace
const chatf = io.of('/chatf');
chatf.on('connection',(socket) => {
	socket.emit('message',{
		chat:'chatbox'
	});
	socket.emit('welcome',{
		data:'welcome to family chat box'
	});


	// Adding the messages
	socket.on('join',(data) => {
		socket.join(data.room);
		chatf.in(data.room).emit('msg',`
			New user joins the ${data.room} room!
		`);
	});

	socket.on('msg',(data) => {
		chatf.in(data.room).emit('msg',data.msg);
	});

	socket.on('disconnect',() => {
		chatf.emit('msg','user diconnected');
	});
});


// server listeing...........
server.listen(PORT,() => {
	console.log(`The server is listening on port ${PORT}`);
});
