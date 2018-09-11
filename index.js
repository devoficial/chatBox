import express from 'express';
const app = express();
import http from 'http';
const server = http.Server(app);
const PORT = 3000;
// settingup socket.io
const io = require('socket.io')(server);
// serving static file
app.use(express.static('public'));


// server "/" get the index.html file
app.get('/', (req, res) => {
	res.sendFile('index.html');
});

// Socket event listener
io.on('connection',(socket) => {
	console.log('A user is connected');
	socket.emit('message',{
		chat:'chatbox'
	});
	socket.on('chat',(data) => {
		console.log(data);
	});
});

// server listeing...........
server.listen(PORT,() => {
	console.log(`The server is listening on port ${PORT}`);
});
