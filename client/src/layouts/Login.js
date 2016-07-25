import React from "react"
import { ReactRedux, connect } from "react-redux"
import { Router, Route, Link, hashHistory } from 'react-router'
import { push } from 'react-router-redux'
import GoogleLogin from 'react-google-login'
import { authenticateUser, authenticateGoogle } from "./../actions/userActions"
import {
	Page,
	Button,
	Toolbar,
	Icon,
	Input,
	ToolbarButton,
	Row
} from 'react-onsenui';
import ons from 'onsenui';


class Login extends React.Component {
	responseGoogle(response){
		const {hg, wc} = response;
		this.props.dispatch(authenticateUser({token: hg.id_token, email: wc.hg}));
	}

	componentWillUpdate(nextProps, nextState){
		debugger;
		if(nextProps.user.user != undefined && nextProps.user.user.id !== ""){
			this.props.dispatch(push(nextProps.routing.query.next))
		}else if(nextProps.user.newUser.createNewUser && nextProps.user.newUser.authEmail != ""){
			const newRedirect = nextProps.routing.query.next;
			this.props.dispatch(push(`/newUser?next=${newRedirect}`));
		}
	}

	testLogin(){
		debugger;
		this.props.dispatch(authenticateGoogle())
	}
	render() {
		var divStyle = {
			width: '80%',
			"textAlign": 'center',
			margin: '0 auto 0'
		};

		let loginButton;
		if(ons.platform.isWebView())
			loginButton = <Button ripple onClick={ this.testLogin.bind(this) }>Lägg till ny kanal!</Button>
		else{
			loginButton = <GoogleLogin
				clientId="1012200602922-lb4cd19omjm7ku7jijef0dvf7pnhgdff.apps.googleusercontent.com"
				buttonText="Login"
				callback={this.responseGoogle.bind(this)}
				redirectUri="http://localhost"/>
		}

		return <Page id="login"
					 /*renderToolbar={() =>
             	<Navbar headerText="Login" /> }*/ >

				<div style={divStyle}>
					<img id='logo' src={require('./../content/img/logo_react.png')} />
					<div id='logoTitle'>
						<img src={require('./../content/img/logo_title.png')} />
					</div>
					{ loginButton }
				</div>


			</Page>
	}
}
var mapStateToProps = function(state){
	// This component will have access to `state.battlefield` through `this.props.battle`
	return {
		user: state.user,
		routing: state.routing.locationBeforeTransitions
	};
};
export default connect(mapStateToProps)(Login);