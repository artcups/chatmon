import React from "react"
import { connect } from "react-redux"
import { Router, Route, Link, browserHistory } from 'react-router'
import { push } from 'react-router-redux'
import { sendMessage } from "../actions/messagesActions"

@connect((store) => {
	return {
		messages: store.messages.messages
	};
})
export default class Login extends React.Component {

	render() {
		return <div>LOGIN</div>
	}
}