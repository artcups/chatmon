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
			text: "fsdfdf"
		}
	}, action) {

		switch (action.type) {
			case types.message.RECEIVE_MESSAGE: {
				return { ...state, messages: [...state.messages, action.data]}
			}
			case types.message.UPDATE_NEW_MESSAGE_VALUE:{
				let newLatestMessage = { text: action.data};
				return { ...state, latestMessage: newLatestMessage }

			}
		}
		return state
}