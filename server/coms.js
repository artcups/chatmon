var express = require('express'),
		app = express(),
		server = require('http').createServer(app),
		io = require('socket.io')(server),
		port = process.env.PORT || 3000;

var CommunicationLayer = (function () {
	var _auth, _dl, _sockets;
	
	function CommunicationLayer(auth, dl){
		_auth = auth;
		_dl = dl;
		_sockets = [];
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
			console.log('CONNECTION FROM ' + socket.handshake.address);
			socket.on('action', (action) => {
			console.log(action);
			switch(action.type) {
				case "server/SEND_MESSAGE":
					if (!socket.user)
					{
						console.log("Unauthed socket tried to send msg", action.data);
						socket.emit("action", {type: "NOT_AUTH", data: action.data});
						return;
					}
					console.log("SEND_MESSAGE FROM " + socket.user.userName);
					_dl.addMessage(socket.user, action.data.dest, action.data.content, action.data.long, action.data.lat).then(function(message){
						broadCast(message);
					});
					break;
				case "server/SEND_POI":
					if (!socket.user)
					{
						console.log("Unauthed socket tried to send POI", action.data);
						socket.emit("action", {type: "NOT_AUTH", data: action.data});
						return;
					}
					console.log("SEND_POI FROM " + socket.user.userName);
					_dl.addPOI(socket.user, action.data.dest, action.data.content, action.data.long, action.data.lat).then(function(message){
						broadCast(message);
					});
					break;
				case "server/AUTHENTICATE_USER":
					_auth.authUserConnection(action.data, function(userExists, res){
						if (userExists){
							socket.user = res;
							_sockets.push(socket);
							socket.emit("action", {type: "SET_USER", data: res});
							console.log("USER " + res.userName + " LOGGED IN.");
						}
						else{
							socket.emit("action", {type: "CREATE_NEW_USER", data: {createNewUser: true}});
							console.log('User not found, sent CREATE_NEW_USER');
						}
					});
					break;
				case "server/CREATE_USER":
					_auth.authUserConnection(action.data, function(userExists, res){
						if (userExists){
							//User already exist
							res.userNameOk = false;
							socket.emit("action", {type: "USER_ALREADY_EXIST", data: res});
						}
						else{
							_dl.addUser(res.email, res.userName, res.team).then(function(user){
								socket.user = user;
								_sockets.push(socket);
								socket.emit("action", {type: "SET_USER", data: user});
								console.log('User ' + user.userName + '(' + user.email + ') created');
							})
						}
					});
					break;
				case "server/GET_MESSAGES":
					_dl.getMessages(action.data, 0, function(messages){
						socket.emit("action", {type: "LATEST_MESSAGES", data: messages})
					})
					break;
				case "server/GET_POI":
					_dl.getMessages(action.data, 1, function(messages){
						socket.emit("action", {type: "LATEST_POI", data: messages})
					})
					break;
				case "server/NEW_DEST":
					if (!socket.user)
						return;
					_dl.getSubscription(action.data.name, function(subscription){
						if (!subscription)
						{
							_dl.addSubscription(action.data.name, action.data.key).then(function(subscription){
								console.log("ADDED SUBSCRIPTION:", subscription);
								socket.user.subscriptions.push(subscription);
								socket.user.save();
								socket.emit("action", {type: "SET_USER", data: socket.user});
								return;
							})
						}
						else
						{
							if (action.data.key != subscription.key){
								socket.emit("action", {type: "WRONG_KEY_ROOM_EXISTS", data: {name: subscription.name}});
								return;
							}
							else
							{
								if (socket.user.subscriptions.filter(function(val) {return subscription.name == val.name;}).length > 0)
								{
									socket.emit("action", {type: "ALREADY_JOINED_SUBSCRIPTION", data: subscription.name});
									return;
								}
								socket.user.subscriptions.push(subscription);
								socket.user.save();
								socket.emit("action", {type: "SET_USER", data: socket.user});
								_dl.getMessages(subscription.name, function(messages){
									socket.emit("action", {type: "LATEST_MESSAGES", data: messages})
								});
								return;
							}
						}
					})
				default:
					{
						console.log("Nothing there")
						break;
					}
				}
			});
		});
	}
	
	function broadCast(message){
		if (message.dest.name == 'root')
			io.emit("action", {type:"RECEIVE_MESSAGE", data: message});
		else
		{
			_sockets.forEach(function(socket){
				if (socket.user.subscriptions.filter(function(val) {return message.dest.id == val.id;}).length > 0)
				{
					socket.emit("action", {type:"RECEIVE_MESSAGE", data: message});
				}
			});
		}
	}
	
	return CommunicationLayer;
})();

module.exports = CommunicationLayer;