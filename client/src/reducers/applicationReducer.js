import types from "../actions/types"

export default function reducer(state={
	sideMenuIsOpen: false,
	chatTab: 0
}, action) {

	switch (action.type) {
		case types.application.SET_SIDEMENU: {
			return { ...state, sideMenuIsOpen: action.data}
		}

	}

	return state
}