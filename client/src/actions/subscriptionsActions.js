
import types from "../static/types"
export function addSubscription(name){
	return { type: types.server.NEW_DEST, data: {name: name, key: ""} }
}
