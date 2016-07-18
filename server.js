var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
var https = require('https');
var axios = require('axios');

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

io.on('connection', function (socket) {
  console.log('New connection from ' + socket.handshake.address);
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
    console.log('Auth req from: ' + data.username + ' with token ' + data.token);
    checkAuth(data.token, function(res){
      if (!res)
        return;
      io.emit('chatMessage', {
        message: res.email + ' connected to the server, lets welcome him!',
        username: 'server'
      });
    });
  });
});

function checkAuth(token, callback){
  var url = 'https://www.googleapis.com/oauth2/v3/tokeninfo';
  axios.get(url, {
   params: {
     id_token: token
   }
 })
 .then(function (response) {
   console.log(response);
    //if (response.email exist in db) auth OK else create user?
    callback(response.data);
 })
 .catch(function (error) {
   console.log(error);
 });
}