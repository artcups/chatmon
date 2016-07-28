import { combineReducers } from "redux"
import { routerReducer } from 'react-router-redux'

import tweets from "./tweetsReducer"
import messages from "./messagesReducer"
import user from "./userReducer"
import application from "./applicationReducer"
import map from "./mapReducer"

export default combineReducers({
	messages,
  	tweets,
  	user,
	application,
	map,
	routing: routerReducer
})