
import types from "./types"
export function sendMessage(){
	return { type: types.server.SEND_MESSAGE, data:'Hello!'}
}