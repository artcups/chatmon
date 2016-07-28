import types from "./types";


export function fetchUser() {
  return {
    type: "FETCH_USER_FULFILLED",
    payload: {
      name: "Will",
      age: 35,
    }
  }
}

export function createUser(token, email, userName, team) {
  return {
    type: types.server.CREATE_USER,
    data: { token, email, userName, team },
  }
}

export function authenticateUser({token, email}){
  return {
    type: types.server.AUTHENTICATE_USER,
    data: {token, email}
  }
}

export function updateNewUserNameValue(value) {
  return {
    type: types.user.UPDATE_NEW_USERNAME_VALUE,
    data: value
  }
}
export function authenticateGoogle(){
    return function(dispatch) {
        dispatch({type: types.user.INIT_LOGIN})
        window.plugins.googleplus.login(
            {
              'scopes': 'email openid profile',
              'webClientId': '1012200602922-lb4cd19omjm7ku7jijef0dvf7pnhgdff.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
            },
            function (res) {
                dispatch({type: types.server.AUTHENTICATE_USER, data: {token: res.idToken, email: res.email}})
            },
            function (msg) {
              alert('error: ' + msg);
            }
        );
  }
}