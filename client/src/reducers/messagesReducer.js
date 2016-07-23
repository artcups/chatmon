import types from "../actions/types"

export default function reducer(state={
		/* a message
		 {
		 	text: string,
		 	sender: user,
		 	subscription: { id: int, name: string }
		 }
		* */
		messages: [],
		latestMessage: {
			content: "fsdfdf",
			dest: {
				name: "root"
			}
		}
	}, action) {

		switch (action.type) {
			case types.message.RECEIVE_MESSAGE: {
				return { ...state, messages: [...state.messages, action.data]}
			}
			case types.message.UPDATE_NEW_MESSAGE_VALUE:{
				return { ...state, latestMessage: {...state.latestMessage, content: action.data} }

			}
			case types.message.LATEST_MESSAGES:{
				console.log(action.data)
				return { ...state, messages: action.data }
			}
			case types.message.UPDATE_DEST: {
				return { ...state, latestMessage: {...state.latestMessage, dest: action.data}}
			}
		}
		return state
}