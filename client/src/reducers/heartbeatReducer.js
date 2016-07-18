export default function reducer(state={
		hearbeats: []
	}, action) {

		switch (action.type) {
			case "HEARTBEAT": {
				return { ...state, hearbeats: [...state.hearbeats, action.data]}
			}
		}
		return state
}