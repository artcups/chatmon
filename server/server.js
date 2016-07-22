var DataLayer = require('./dl'),
		CommunicationLayer = require('./coms'),
		Auth = require('./auth');

function init() {
	var _dl, _coms, _auth;
	
	_dl = new DataLayer();
	_auth = new Auth(_dl);
	_coms = new CommunicationLayer(_auth, _dl);
	
	/*_dl.addUser('tobias.rolfson@gmail.com', 'toobiaas', 0).then(function(user){
		console.log(user);
		_dl.addMessage(user, "pikachu", "hi guys i found a pikachu here", "55.607310, 12.984392").then(function(message){
			console.log(message);
		});
	});*/
	/*_dl.addSubscription('Pikachu', '').then(function(subscription){
		console.log(subscription);
	});*/
/*	_dl.getUser('tobias.rolfson@gmail.com', function(user){
		_dl.addMessage(user, user.subscriptions[0], "hi guys i found a pikachu here", "55.607310, 12.984392").then(function(message){
			console.log(message);
		});
		_dl.getSubscription('Pikachu', function(sub){
			user.subscriptions.push(sub);
			user.save();
		})
		_dl.getMessages(user, function(messages){
			console.log(messages);
		})
		_dl.getMessages(user, function(messages){
			console.log(messages);
		});
	})*/

}

//Make the magic happen!
init();