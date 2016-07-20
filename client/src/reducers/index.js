import { combineReducers } from "redux"
import { routerReducer } from 'react-router-redux'

import tweets from "./tweetsReducer"
import messages from "./messagesReducer"
import user from "./userReducer"
import application from "./applicationReducer"

export default combineReducers({
	messages,
  	tweets,
  	user,
	application,
	routing: routerReducer
})