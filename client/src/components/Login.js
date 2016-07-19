import React from "react"
import { connect } from "react-redux"
import { Router, Route, Link, browserHistory } from 'react-router'
import { push } from 'react-router-redux'
import GoogleLogin from 'react-google-login';


@connect((store) => {
	return {
		messages: store.messages.messages
	};
})
export default class Login extends React.Component {


	responseGoogle(){
		console.log(response);
	}

	render() {

		return <GoogleLogin
			clientId="1012200602922-lb4cd19omjm7ku7jijef0dvf7pnhgdff.apps.googleusercontent.com"
			buttonText="Login"
			callback={this.responseGoogle.bind(this)} />

	}
}