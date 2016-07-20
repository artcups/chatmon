var mongoose = require('mongoose'),
    config = require('./config').config;

var DataLayer = (function () {
  var _userSchema, _db;
  var User;
  
  function DataLayer() {
    mongoose.connect(config.server.mongodb.host);
    initSchemas();
    
    _db = mongoose.connection;
    _db.on('error', console.error.bind(console, 'connection error:'));
    _db.once('open', function() {
      console.log('Connected to db!');
    });
  }
  
  function initSchemas(){
    _userSchema = new mongoose.Schema({
      id: String,
      name: String
    });
    User = mongoose.model('user', _userSchema);
  }
  
  function getUser(id, callback){
    User.find({id: id}, function(user){
      callback(user);
    });
  };
  
  function getAllUsers(callback){
    User.find(function(err, users) {
       console.log(users);
    });
  }
  
  function addUser(name, id, callback){
    var newUser = new User({id: id, name: name});
    newUser.save(function(err, user){
      if (err)
        return console.error(err);
    });
  }
  
  DataLayer.prototype = {
    getAllUsers: function (callback) {
      getAllUsers(callback);
    },
    getUser: function(id, callback) {
      getUser(id, callback);
    },
    addUser: function(name, id, callback){
      addUser(name, id, callback);
    }
  }
  return DataLayer;
})();

module.exports = DataLayer;
