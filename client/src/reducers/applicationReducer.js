import types from "../static/types"

export default function reducer(state={
	sideMenuIsOpen: false,
	sideMenuSwipeAble: true,
	chatTab: 0,
	channelJoinDialogIsShown: false,
	isPokestopDialogShown: false,
	isGymDialogShown: false,
	isPokemonDialogShown: false,
	dest: {
		name: "root",
		_id: -1
	}

}, action) {

	switch (action.type) {
		case types.application.TOGGLE_SIDEMENU: {
			return { ...state, sideMenuIsOpen: !state.sideMenuIsOpen}
		}
		case types.application.SET_SIDE_MENU_SHOWN: {
			return { ...state, sideMenuIsOpen: action.data}
		}
		case types.application.SET_CHANNELJOINDIALOG: {
			return { ...state, channelJoinDialogIsShown: action.data}
		}
		case types.application.SET_POKESTOP_DIALOG_SHOWN: {
			return { ...state, isPokestopDialogShown: action.data}
		}
		case types.application.SET_GYM_DIALOG_SHOWN: {
			return { ...state, isGymDialogShown: action.data}
		}
		case types.application.SET_POKEMON_DIALOG_SHOWN: {
			return { ...state, isPokemonDialogShown: action.data}
		}
		case types.application.SET_SIDE_MENU_SWIPE_ABLE: {
			return { ...state, sideMenuSwipeAble: action.data}
		}
		case types.message.UPDATE_DEST: {
			return { ...state, dest: {name: action.data}}
		}
	}

	return state
}