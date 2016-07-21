import types from "../actions/types";

export default function reducer(state={
    user: {
        id: "",
        name: "",
        userName: "",
        team: -1,
        subscriptions: [
            {id: 1, name: "Bästa rummet"},
            {id: 2, name: "Näst bästa rummet"}
        ]
    },
    newUser: {
        authEmail: "",
        token: "",
        newUserName: "",
        createNewUser: false,
        userNameOk: true
    }

  }, action) {

    switch (action.type) {
        case types.user.SET_USER: {
            return {...state, user: action.data}
        }
        case types.user.CREATE_NEW_USER: {
            return { ...state, createNewUser: action.data.createNewUser }
        }
        case types.server.AUTHENTICATE_USER: {
            return { ...state, token: action.data.token, authEmail: action.data.email }
        }
        case types.user.UPDATE_NEW_USERNAME_VALUE: {
            let username = {newUserName: action.data};
            return {...state, ...state.newUser, username}
        }
    }

    return state
}