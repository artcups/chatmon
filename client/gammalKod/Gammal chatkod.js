/*renderRow(idx) {
 return (
 /!*<LazyList length={messages.messages.length}
 renderRow={this.renderRow.bind(this)}
 calculateItemHeight={() => ons.platform.isAndroid() ? 48 : 44} />*!/
 <ListItem ref="myIndput" className="chatRow" key={idx}>
 <div className="left avatar"><img src={pokeball} /></div>
 <div className="center chatMessage">
 <label className="userName">{this.props.messages.messages[idx].sender.userName} posted:</label>
 <p className="chatText">{this.props.messages.messages[idx].text}</p>
 </div>
 </ListItem>
 );
 }


var googleapi = {
    authorize: function(options) {
        var deferred = $.Deferred();

        //Build the OAuth consent page URL
        var authUrl = 'https://accounts.google.com/o/oauth2/auth?' + $.param({
                client_id: options.client_id,
                redirect_uri: options.redirect_uri,
                response_type: 'code',
                scope: options.scope
            });

        //Open the OAuth consent page in the InAppBrowser
        var authWindow = window.open(authUrl, '_blank', 'location=no,toolbar=no');

        //The recommendation is to use the redirect_uri "urn:ietf:wg:oauth:2.0:oob"
        //which sets the authorization code in the browser's title. However, we can't
        //access the title of the InAppBrowser.
        //
        //Instead, we pass a bogus redirect_uri of "http://localhost", which means the
        //authorization code will get set in the url. We can access the url in the
        //loadstart and loadstop events. So if we bind the loadstart event, we can
        //find the authorization code and close the InAppBrowser after the user
        //has granted us access to their data.
        $(authWindow).on('loadstart', function(e) {
            var url = e.originalEvent.url;
            var code = /\?code=(.+)$/.exec(url);
            var error = /\?error=(.+)$/.exec(url);

            if (code || error) {
                //Always close the browser when match is found
                authWindow.close();
            }

            if (code) {
                //Exchange the authorization code for an access token
                $.post('https://accounts.google.com/o/oauth2/token', {
                    code: code[1],
                    client_id: options.client_id,
                    client_secret: options.client_secret,
                    redirect_uri: options.redirect_uri,
                    grant_type: 'authorization_code'
                }).done(function(data) {
                    deferred.resolve(data);
                }).fail(function(response) {
                    deferred.reject(response.responseJSON);
                });
            } else if (error) {
                //The user denied access to the app
                deferred.reject({
                    error: error[1]
                });
            }
        });

        return deferred.promise();
    }
};

$(document).on('deviceready', function() {
    var $loginButton = $('#login a');
    var $loginStatus = $('#login p');

    $loginButton.on('click', function() {
        googleapi.authorize({
            client_id: '1012200602922-lb4cd19omjm7ku7jijef0dvf7pnhgdff.apps.googleusercontent.com',
            client_secret: 'Ij51Ixsli6vxrEBEbmYbRTKy',
            redirect_uri: 'http://localhost',
            scope: 'https://www.googleapis.com/auth/userinfo.profile'
        }).done(function(data) {
            $loginStatus.html('Access Token: ' + data.access_token);
        }).fail(function(data) {
            $loginStatus.html(data.error);
        });
    });
});*/