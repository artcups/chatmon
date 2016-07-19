import { combineReducers } from "redux"
import { routerReducer } from 'react-router-redux'

import tweets from "./tweetsReducer"
import messages from "./messagesReducer"
import user from "./userReducer"

export default combineReducers({
	messages,
  	tweets,
  	user,
	routing: routerReducer
})