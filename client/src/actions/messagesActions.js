
import types from "./types"
export function sendMessage(content, source, dest){
	return function(dispatch) {
		//Google login window.nånting nånting then action boom

		dispatch({type: types.message.SENDING_MESSAGE})
		navigator.geolocation.getCurrentPosition(
			(position) => {
				console.log("success")
				dispatch({ type: types.server.SEND_MESSAGE, data: {content, source, coord: position.coords.latitude+","+position.coords.longitude, dest}})
			},
			(error) => {
				console.log("error")
				dispatch({type: types.map.FETCH_POSITION_ERROR, data: error.message})
			}, { timeout: 5000, enableHighAccuracy: true })
	}
}
export function updateNewMessageValue(text){
	return { type: types.message.UPDATE_NEW_MESSAGE_VALUE, data: text}
}
export function latestMessages(dest){
	return { type: types.server.GET_MESSAGES, data: dest}
}
export function updateDest(dest) {
	return {
		type: types.message.UPDATE_DEST,
		data: dest
	}
}
export function newDest(name, key) {
	return {
		type: types.message.NEW_DEST,
		data: {name: name, key: key}
	}
}