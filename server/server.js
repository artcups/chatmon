var DataLayer = require('./dl'),
		CommunicationLayer = require('./coms'),
		Auth = require('./auth');

function init() {
	var _dl, _coms, _auth;
	
	_dl = new DataLayer();
	_auth = new Auth(_dl);
	_coms = new CommunicationLayer(_auth, _dl);
}

//Make the magic happen!
init();