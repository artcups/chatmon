import types from "../static/types";
import { push } from 'react-router-redux'


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
export function authenticateSilentGoogle(redirect){

    return function(dispatch) {
        debugger;
        if(window.plugins != undefined && window.plugins.googleplus != undefined){
            dispatch({type: types.user.INIT_LOGIN})
            window.plugins.googleplus.trySilentLogin(
                {
                    'scopes': 'email openid profile', // optional - space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
                    'webClientId': '1012200602922-lb4cd19omjm7ku7jijef0dvf7pnhgdff.apps.googleusercontent.com', // optional - clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
                    'offline': true, // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
                },
                function (res) {
                    dispatch({type: types.server.AUTHENTICATE_USER, data: {token: res.idToken, email: res.email}})
                },
                function (msg) {
                    dispatch(push(`/login?next=${redirect}`))
                }
            );
        }else{
            dispatch(push(`/login?next=${redirect}`))
        }

  }
}