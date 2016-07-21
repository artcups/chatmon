var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email: String,
  userName: String
});

mongoose.model('user', userSchema);