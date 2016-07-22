
import types from "./types"
export function sendMessage(message){
	return { type: types.server.SEND_MESSAGE, data: message}
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