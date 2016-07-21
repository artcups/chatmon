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
			email: String,
			userName: String,
			team: Number
    });
    User = mongoose.model('user', _userSchema);
  }
  
  function getUser(email, callback){
    User.findOne({email: email}).exec(function(err, user){
      callback(user);
    });
  };
  
  function getAllUsers(callback){
    User.find(function(err, users) {
       console.log(users);
    });
  }
  
  function addUser(email, username, team){
		var promise = new Promise((function(resolve, reject){
				var newUser = {email: email, userName: username, team: team};
				User.create(newUser, function(err, user){
					if (err)
						return console.error(err);
					console.log(user);
					resolve(user);
				});
			}).bind(this)); 
		return promise;
	}
		/*console.log(email, username, team);
    var newUser = {email: email, userName: username, team: team};
    User.create(newUser, function(err, user){
      if (err)
        return console.error(err);
			console.log(user);
			callback(user);
    });
  }*/
  
  DataLayer.prototype = {
    getAllUsers: function (callback) {
      getAllUsers(callback);
    },
    getUser: function(id, callback) {
      getUser(id, callback);
    },
    addUser: function(name, email, team){
      return addUser(name, email, team);
    }
  }
  return DataLayer;
})();

module.exports = DataLayer;
