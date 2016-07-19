import React from "react"
import { ReactRedux, connect } from "react-redux"
import { Router, Route, Link, hashHistory } from 'react-router'
import { push } from 'react-router-redux'
import GoogleLogin from 'react-google-login'
import { authenticateUser } from "./../actions/userActions"


class Login extends React.Component {
	responseGoogle(response){
		debugger;
		const {hg, wc} = response;
		this.props.dispatch(authenticateUser({token: hg.id_token, email: wc.hg}));
	}

	componentWillUpdate(nextProps, nextState){

		debugger;
		console.log(Router.state)
		if(nextProps.user != undefined && nextProps.user.id !== null){
			this.props.dispatch(push(nextProps.routing.query.next))

		}

	}

	render() {
		return <GoogleLogin
			clientId="1012200602922-lb4cd19omjm7ku7jijef0dvf7pnhgdff.apps.googleusercontent.com"
			buttonText="Login"
			callback={this.responseGoogle.bind(this)} />
	}
}
var mapStateToProps = function(state){
	// This component will have access to `state.battlefield` through `this.props.battle`
	debugger;
	return {
		user: state.user.user,
		routing: state.routing.locationBeforeTransitions
	};
};
export default connect(mapStateToProps)(Login);