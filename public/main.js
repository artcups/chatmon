var socket;

function setUpSocket(token, email) {
	socket = io('localhost:3000');
	socket.emit('authConnection', {
		token: token,
		username: email
	});
	socket.on('chatMessage', function(msg){
		console.log(msg.username + ': ' + msg.message);
	  $('#messages').append($('<li>').text(msg));
	});
}

function send(message) {
	socket.emit('chatMessage', {
		username: socket.username,
		message: message
	});
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());
  var id_token = googleUser.getAuthResponse().id_token;
  setUpSocket(id_token, profile.getEmail());
  console.log(id_token);
}

function signOut() {
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function () {
	  console.log('User signed out.');
	});
}