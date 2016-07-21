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