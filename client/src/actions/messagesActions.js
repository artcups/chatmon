
import types from "../static/types"
export function sendMessage(content, dest){
	return function(dispatch) {
		//Google login window.nånting nånting then action boom

		dispatch({type: types.message.SENDING_MESSAGE})
		navigator.geolocation.getCurrentPosition(
			(position) => {
				console.log("success")
				dispatch({ type: types.server.SEND_MESSAGE, data: {content, lat: position.coords.latitude, long: position.coords.longitude, dest}})
			},
			(error) => {
				console.log("error")
				dispatch({type: types.map.FETCH_POSITION_ERROR, data: error.message})
			}, { timeout: 5000, enableHighAccuracy: true })
	}
}
export function sendPio(content, dest){
	return { type: types.server.SEND_PIO, data: {content, lat: 59.326633, long: 18.071737, dest}}
	/*return function(dispatch) {
		//Google login window.nånting nånting then action boom

		dispatch({type: types.message.SENDING_PIO})
		navigator.geolocation.getCurrentPosition(
			(position) => {
				console.log("success")
				dispatch({ type: types.server.SEND_PIO, data: {content, lat: position.coords.latitude, long: position.coords.longitude, dest}})
			},
			(error) => {
				console.log("error")
				dispatch({type: types.map.FETCH_POSITION_ERROR, data: error.message})
			}, { timeout: 5000, enableHighAccuracy: true })
	}*/
}
export function updateNewMessageValue(text){
	return { type: types.message.UPDATE_NEW_MESSAGE_VALUE, data: text}
}
export function latestMessages(dest){
	return { type: types.server.GET_MESSAGES, data: dest}
}
export function latestPointOfInterest(dest){
	return { type: types.server.GET_POI, data: dest}
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