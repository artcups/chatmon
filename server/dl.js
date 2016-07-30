var mongoose = require('mongoose'),
    config = require('./config').config;

var DataLayer = (function () {
  var _userSchema, _messageSchema, _subscriptionSchema, _db;
  var User, Message, Subscription;
  
  function DataLayer() {
    mongoose.connect(config.server.mongodb.host);
    initSchemas();
    
    _db = mongoose.connection;
    _db.on('error', console.error.bind(console, 'connection error:'));
    _db.once('open', function() {
      console.log('DB OK');
    });
  }
  
  function initSchemas(){
		_subscriptionSchema = new mongoose.Schema({
			name: String,
			key: String
		})
		Subscription = mongoose.model('subscription', _subscriptionSchema);
		
    _userSchema = new mongoose.Schema({
			email: String,
			userName: String,
			team: Number,
			subscriptions: [_subscriptionSchema]
    });
    User = mongoose.model('user', _userSchema);
		
		_messageSchema = new mongoose.Schema({
			source: _userSchema,
			dest: _subscriptionSchema,
			content: String,
			long: String,
			lat: String,
			date: Date,
			type: Number
		});
		Message = mongoose.model('message', _messageSchema);
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
	
	function addMessage(source, dest, content, long, lat){
		var promise = new Promise((function(resolve, reject){
				var newMessage = {source: source, dest: dest, content: content, long: long, lat: lat, date: new Date(), type: 0};
				Message.create(newMessage, function(err, message){
					if (err)
						return console.error(err);
					resolve(message);
				});
			}).bind(this)); 
		return promise;
	}
	
	function addPOI(source, dest, content, long, lat){
		var promise = new Promise((function(resolve, reject){
				var newPOI = {source: source, dest: dest, content: content, long: long, lat: lat, date: new Date(), type: 1};
				Message.create(newMessage, function(err, message){
					if (err)
						return console.error(err);
					resolve(message);
				});
			}).bind(this)); 
		return promise;
	}
	
	function getMessages(dest, type, callback){
		Message.find({'dest._id': dest._id, type: type}).exec(function(err, messages){
      	callback(messages);
			});
	}
	
	function addSubscription(name, key){
		var promise = new Promise((function(resolve, reject){
				var newSubscription = {name: name, key: key};
				Subscription.create(newSubscription, function(err, subscription){
					if (err)
						return console.error(err);
					console.log(subscription);
					resolve(subscription);
				});
			}).bind(this)); 
		return promise;
	}
	
	function getSubscription(name, callback){
    Subscription.findOne({name: name}).exec(function(err, subscription){
      callback(subscription);
    });
  };
	
  DataLayer.prototype = {
    getAllUsers: function (callback) {
      getAllUsers(callback);
    },
    getUser: function(email, callback) {
      getUser(email, callback);
    },
    addUser: function(name, email, team){
      return addUser(name, email, team);
    },
    addMessage: function(source, dest, content, long, lat){
      return addMessage(source, dest, content, long, lat);
    },
		addPOI: function(source, dest, content, long, lat){
      return addPOI(source, dest, content, long, lat);
    },
		getMessages: function(user, type, callback){
			getMessages(user, type, callback);
		},
		addSubscription: function(name, key){
			return addSubscription(name, key);
		},
		getSubscription: function(name, callback){
			return getSubscription(name, callback);
		}
  }
  return DataLayer;
})();

module.exports = DataLayer;