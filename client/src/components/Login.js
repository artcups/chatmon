import React from "react"
import { ReactRedux, connect } from "react-redux"
import { Router, Route, Link, hashHistory } from 'react-router'
import { push } from 'react-router-redux'
import GoogleLogin from 'react-google-login'
import { authenticateUser } from "./../actions/userActions"
import {
	Page,
	Button,
	Toolbar,
	Icon,
	Input,
	ToolbarButton,
	Row
} from 'react-onsenui';

// load Onsen UI library
import ons from 'onsenui';


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
		return <div>
			<img id='logo' src={require('./../content/img/logo_react.png')} />
			<div id='logoTitle'>
				<img src={require('./../content/img/logo_title.png')} />
			</div>

			<Input value="" placeholder="Email" type="text" modifier="underbar" float />
			<Input value="" placeholder="Password" type="password" modifier="underbar" float />
			<Button id='signIn'>Sign In</Button>
			<Button id='forgetBtn' modifier="quiet">FORGOT PASSWORD?</Button>

			<GoogleLogin
				clientId="1012200602922-lb4cd19omjm7ku7jijef0dvf7pnhgdff.apps.googleusercontent.com"
				buttonText="Login"
				callback={this.responseGoogle.bind(this)} />
		</div>
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