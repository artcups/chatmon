var express = require('express'),
		app = express(),
		server = require('http').createServer(app),
		io = require('socket.io')(server),
		port = process.env.PORT || 3000;

var CommunicationLayer = (function () {
	var _auth, _dl;
	
	function CommunicationLayer(auth, dl){
		_auth = auth;
		_dl = dl;
		initServer();
	}
	function initServer() {
		server.listen(port, function () {
			console.log('Server listening at port %d', port);
			setInterval(() => {
				io.emit("action", {type:"HEARTBEAT", data: "This is a heartbeat!"})
			}, 30000);
		});
		
		io.on('connection', function (socket) {
			console.log('New connection from ' + socket.handshake.address);
			_dl.getAllUsers();
			socket.on('action', (action) => {
			switch(action.type) {
				case "server/SEND_MESSAGE":
					console.log("SEND_MESSAGE")
					io.emit("action", {type:"RECEIVE_MESSAGE", data: "This is a message!"})
					break;
				case "server/AUTHENTICATE_USER":
					_auth.authUserConnection(action.data, function(userExists, res){
						if (userExists){
							//Auth OK, send new message
							socket.user = res;
							io.emit("action", {type: "NEW_MESSAGE", data: {text: res.name + ' connected to the server, lets welcome him!'}});
							socket.emit("action", {type: "SET_USER", data: res});
						}
						else{
							socket.emit("action", {type: "CREATE_NEW_USER", data: {createNewUser: true}});
							console.log('Auth NOK, user not found, sent CREATE_NEW_USER');
							//Auth NOK, tell user
						}
					});
					break;
				case "server/CREATE_USER":
					_auth.authUserConnection(action.data, function(userExists, res){
						if (userExists){
							//User already exist
							socket.emit("action", {type: "USER_ALREADY_EXIST", data: res});
						}
						else{
							_dl.addUser(res.email, res.userName, function(res){
								socket.emit("action", {type: "SET_USER", data: res});
								console.log('User ' + res.userName + '(' + res.email + ') created');
							})
						}
					});
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
	}	
	return CommunicationLayer;
})();

module.exports = CommunicationLayer;