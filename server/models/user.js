var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  id: String,
  name: String
});

mongoose.model('user', userSchema);