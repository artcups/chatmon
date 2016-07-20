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
import ons from 'onsenui';
import Navbar from "./../components/Navbar";

class Login extends React.Component {
	responseGoogle(response){
		const {hg, wc} = response;
		this.props.dispatch(authenticateUser({token: hg.id_token, email: wc.hg}));
	}

	componentWillUpdate(nextProps, nextState){
		console.log(Router.state)
		if(nextProps.user != undefined && nextProps.user.id !== null){
			this.props.dispatch(push(nextProps.routing.query.next))
		}

	}


	render() {
		var divStyle = {
			width: '80%',
			"text-align": 'center',
			margin: '0 auto 0'
		};
		return <Page id="login"
					 renderToolbar={() =>
             	<Navbar headerText="Login" />
             } >

			<div style={divStyle}>
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


			</Page>
	}
}
var mapStateToProps = function(state){
	// This component will have access to `state.battlefield` through `this.props.battle`
	return {
		user: state.user.user,
		routing: state.routing.locationBeforeTransitions
	};
};
export default connect(mapStateToProps)(Login);