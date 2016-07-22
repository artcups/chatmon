var axios = require('axios'),
		config = require('./config').config;

var Auth = (function () {
	var _dl;
	function Auth(dl) {
		_dl = dl;
	}
	
	function authUserConnection(data, callback){
		/*if (data.email == 's.lundh@gmail.com')
		{
			_dl.getUser('s.lundh@gmail.com', function(user){
				callback(true, user);
				return;
			});
		}*/
		checkAuth(data, function(res, user){
			if (!res && user)
			{
				callback(false, user);
				return;
			}
			else if (!res)
			{
				callback(false);
				return;
			}
			callback(true, user);
		});
	}

	function checkAuth(data, callback){
		var url = 'https://www.googleapis.com/oauth2/v3/tokeninfo';
		axios.get(url, {
		 params: {
		 id_token: data.token
		 }
	 })
	 .then(function (response) {
			if (response.data.aud == config.server.google.aud){
				_dl.getUser(response.data.email, function(user){
					if (!user){
						callback(false, data);
					}
					else
					{
						callback(true, user);
					}
				});
			}
			else
				callback(false);
	 })
	 .catch(function (error) {
		 console.log(error);
	 });
	}
	
	Auth.prototype = {
    authUserConnection: function (data, callback) {
      authUserConnection(data, callback);
    }
  }
  return Auth;
})();

module.exports = Auth;