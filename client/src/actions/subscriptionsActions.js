
import types from "./types"
export function addSubscription(name){
	return { type: types.server.ADD_SUBSCRIPTION, data: {name: name, key: ""} }
}
