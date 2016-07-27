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
			content: "Latest message 123",
			dest: {
				name: "root"
			}
			//pointsOfInterest:
			//	{
			//		content: [
			//			{title: "Charizard", lat: 59.34541678, lng: 18.1822184},
			//			{title: "Bulbasaur", lat: 59.36392828, lng: 18.05248107},
			//			{title: "Pikachu", lat: 59.29262043, lng: 18.09982699},
			//			{title: "Squirtle", lat: 59.37168456, lng: 17.94860701},
			//			{title: "Venosaur", lat: 59.32854157, lng: 18.14709156},
			//			{title: "Mewtwo", lat: 59.3655718, lng: 17.98080168},
			//			{title: "Jynx", lat: 59.37156078, lng: 18.06419743},
			//			{title: "Onix", lat: 59.28866218, lng: 18.00586609},
			//			{title: "Poliwag", lat: 59.24203335, lng: 18.03614352},
			//			{title: "Poliwhirl", lat: 59.2657605, lng: 18.09346632}
			//		]
			//	}
		},
		newDest: {
			name: "",
			key: ""
		}

	}, action) {

		switch (action.type) {
			case types.message.RECEIVE_MESSAGE: {
				return { ...state, messages: [...state.messages, action.data]}
			}
			case types.message.UPDATE_NEW_MESSAGE_VALUE:{
				debugger;
				return { ...state, latestMessage: {...state.latestMessage, content: action.data} }

			}
			case types.message.LATEST_MESSAGES:{
				console.log(action.data)
				return { ...state, messages: action.data }
			}
			case types.message.UPDATE_DEST: {
				return { ...state, latestMessage: {...state.latestMessage, dest: action.data}}
			}
			case types.message.NEW_DEST: {
				return { ...state, newDest: action.data}
			}
		}
		return state
}