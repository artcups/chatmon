import types from "../actions/types"

export default function reducer(state={
	sideMenuIsOpen: false,
	chatTab: 0,
	channelJoinDialogIsOpen: false
}, action) {

	switch (action.type) {
		case types.application.TOGGLE_SIDEMENU: {
			return { ...state, sideMenuIsOpen: !state.sideMenuIsOpen}
		}
		case types.application.SET_CHANNELJOINDIALOG: {
			return { ...state, channelJoinDialogIsOpen: action.data}
		}

	}

	return state
}