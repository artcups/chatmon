import { combineReducers } from "redux"

import tweets from "./tweetsReducer"
import messages from "./messagesReducer"
import user from "./userReducer"
import { routerReducer as routing } from 'react-router-redux';


export default combineReducers({
	messages,
  	tweets,
  	user,
  	routing
})