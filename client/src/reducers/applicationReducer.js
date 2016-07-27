import types from "../actions/types"

export default function reducer(state={
	sideMenuIsOpen: false,
	channelJoinDialogIsOpen: false
}, action) {

	switch (action.type) {
		case types.application.SET_SIDEMENU: {
			return { ...state, sideMenuIsOpen: action.data}
		}
		case types.application.SET_CHANNELJOINDIALOG: {
			return { ...state, channelJoinDialogIsOpen: action.data}
		}

	}

	return state
}