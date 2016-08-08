import types from "../static/types"

export default function reducer(state={
	position: {
		latitude: 59.326633,
		longitude: 18.071737
	},
	// -1: default coords, 0: error, 1: fetching, 2: done
	status: -1,
	statusMessage: ""
	}, action) {

		switch (action.type) {
			case types.map.FETCH_POSITION_FULFILLED: {
				return { ...state, position: action.data, statusMessage: "", status: 2}
			}
			case types.map.FETCH_POSITION_ERROR:{
				return { ...state, statusMessage: action.data.message, status: 0}
			}
			case types.map.FETCH_POSITION_FETCHING:{
				return { ...state, status: 1, statusMessage: "" }
			}
			case types.map.CHANGE_MAP_CENTER:{
				return { ...state, position: action.data}
			}
		}
		return state
}