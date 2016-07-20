import types from "../actions/types"

export default function reducer(state={
	Sidemenu: {isOpen: false}
}, action) {

	switch (action.type) {
		case types.message.RECEIVE_MESSAGE: {
			console.log(action.data);
			return { ...state, messages: [...state.messages, action.data]}
		}
	}

	return state
}