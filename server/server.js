var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
var https = require('https');
var axios = require('axios');
var config = require('./config').config;
var DataLayer = require('./dl');
var fs = require('fs');
//Test

/*
fs.readdirSync(__dirname + '/models').forEach(function(filename) {
 if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
});
*/
var _dl = new DataLayer();
_dl.getAllUsers();

server.listen(port, function () {
	console.log('Server listening at port %d', port);
	setInterval(() => {
		io.emit("action", {type:"HEARTBEAT", data: "This is a heartbeat!"})
	}, 30000);
});

io.on('connection', function (socket) {
  console.log('New connection from ' + socket.handshake.address);

  socket.on('action', (action) => {
	switch(action.type) {
		case "server/SEND_MESSAGE":
			console.log("SEND_MESSAGE")
			io.emit("action", {type:"RECEIVE_MESSAGE", data: "This is a message!"})
			break;
		case "server/AUTHENTICATE_USER":
			authConnection(socket, io, action.data)
			console.log("AUTHENTICATE_USER")
			break;
		default:
			console.log("Nothing there")
	}

	if(action.type === 'server/hello'){
	  console.log('Got hello data!', action.data);
	  socket.emit('action', {type:'message', data:'good day!'});
	}
  });

  socket.emit('chatMessage', {
	message: 'Welcome ' + socket.handshake.address,
	username: 'server'
  });
  var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('chatMessage', function (data) {
	// we tell the client to execute 'new message'
	console.log(data.message);
	io.emit('chatMessage', {
	  message: data.message,
	  username: 'server'
	});
  });
  socket.on('authConnection', function (data) {

  });
});

function authConnection(io, socket, data){
	console.log('Auth req from: ' + data.email + ' with token ' + data.token);
	checkAuth(data.token, function(user){
		console.log(user)
		if (!user)
			return;
		io.emit("action", {type: "NEW_MESSAGE", data: {text: user.name + ' connected to the server, lets welcome him!'}});
		socket.emit("action", {type: "SET_USER", data: user});
	});
}

function checkAuth(token, callback){
  var url = 'https://www.googleapis.com/oauth2/v3/tokeninfo';
  axios.get(url, {
   params: {
	 id_token: token
   }
 })
 .then(function (response) {
   	console.log(response);
		if (response.aud == config.server.google.aud){
			//if (response.email exist in db) auth OK else create user?
			_dl.getUser(response.email, function(user){
				if (!user){
					//User doesn't exist - create?
				}
				else
				{
					
				}
			});
		}
	callback({
		id:  new Date().getTime(),
		name: response.data.name
	});
 })
 .catch(function (error) {
   console.log(error);
 });
}