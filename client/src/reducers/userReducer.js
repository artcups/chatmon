import types from "../actions/types";

export default function reducer(state={
    user: {
        id: "",
        email: "",
        userName: "",
        team: -1,
        subscriptions: [

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
            return { ...state, newUser: {...state.newUser, createNewUser: action.data.createNewUser}}
        }
        case types.server.AUTHENTICATE_USER: {

            return { ...state, newUser: {...state.newUser, token: action.data.token, authEmail: action.data.email} }
        }
        case types.user.UPDATE_NEW_USERNAME_VALUE: {
            return { ...state, newUser: {...state.newUser, newUserName: action.data}}
        }
        case types.user.NOT_AUTH: {
            let user = {
                id: "",
                email: "",
                userName: "",
                team: -1,
                subscriptions: []
            };
            return {...state, user: user}
        }
    }

    return state
}