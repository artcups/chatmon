import types from "../static/types"

export default function reducer(state={
		/* a message
		 {
		 	text: string,
		 	sender: user,
		 	subscription: { id: int, name: string }
		 }
		* */


		messages: [],
		pointsOfInterest: [
			{content: "1", lat: 59.28866218, lng: 18.00586609},
			{content: "2", lat: 59.24203335, lng: 18.03614352},
			{content: "2", lat: 59.2657605, lng: 18.09346632},
			{content: "3|1", lat: 59.34541678, lng: 18.1822184},
			{content: "3|2", lat: 59.36392828, lng: 18.05248107},
			{content: "3|3", lat: 59.29262043, lng: 18.09982699},
			{content: "3|4", lat: 59.37168456, lng: 17.94860701},
			{content: "3|5", lat: 59.32854157, lng: 18.14709156},
			{content: "3|120", lat: 59.3655718, lng: 17.98080168},
			{content: "3|151", lat: 59.37156078, lng: 18.06419743}

		],

		latestMessage: {
			content: "",
			dest: {
				name: "root"
			}
		},
		newPoi: {
			content: "",
			dest: {
				name: "root"
			}
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
			case types.message.NEW_DEST: {
				return { ...state, newDest: action.data}
			}
		}
		return state
}