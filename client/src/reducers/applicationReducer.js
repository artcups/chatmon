import types from "../actions/types"

export default function reducer(state={
	sideMenuIsOpen: false
}, action) {

	switch (action.type) {
		case types.application.SET_SIDEMENU: {
			return { ...state, sideMenuIsOpen: action.data}
		}

	}

	return state
}