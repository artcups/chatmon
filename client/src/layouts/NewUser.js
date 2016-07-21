import React from "react"
import { ReactRedux, connect } from "react-redux"
import { Router, Route, Link, hashHistory } from 'react-router'
import { push } from 'react-router-redux'
import GoogleLogin from 'react-google-login'
import { createUser, updateNewUserNameValue } from "./../actions/userActions"

import {
	Page,
	Button,
	Icon,
	Input
} from 'react-onsenui';
import ons from 'onsenui';
import Navbar from "./../components/Navbar";

class NewUser extends React.Component {
	createUser(){
		this.props.dispatch(createUser(this.props.user.newUser.token, this.props.user.newUser.authEmail, "Artcups", 1));
	}

	componentWillUpdate(nextProps, nextState){
		if(nextProps.user.user != undefined && nextProps.user.user.userName !== ""){
			if(nextProps.routing = "")
				this.props.dispatch(push("/"));
			else
				this.props.dispatch(push(nextProps.routing.query.next));

		}else if(nextProps.user.user != undefined && !nextProps.user.newUser.userNameOk){

		}
	}

	showUserNameLabel(hide){
		if(!hide)
			return <label>Username alreade exists</label>

	}
	render() {
		let { userName } = this.props.user.newUser;
		var divStyle = {
			width: '80%',
			"textAlign": 'center',
			margin: '0 auto 0'
		};
		return <Page id="login"
					 /*renderToolbar={() =>
             	<Navbar headerText="Login" />
             } */>

			<div style={divStyle}>
				<img id='logo' src={require('./../content/img/logo_react.png')} />
				<div id='logoTitle'>
					<img src={require('./../content/img/logo_title.png')} />
				</div>
				{this.showUserNameLabel(this.props.user.userNameOk)}
				<Input value={userName} onChange={ this.props.onValueChange.bind(this) }placeholder="Username" type="text" modifier="underbar" float />

				<Button onClick={this.createUser.bind(this)}>Sign In</Button>
			</div>


			</Page>
	}
}
const mapStateToProps = (state) => {
	// This component will have access to `state.battlefield` through `this.props.battle`
	return {
		user: state.user,
		routing: state.routing.locationBeforeTransitions
	};
};

const mapDispatchToProps = (dispatch) =>({

	onValueChange: (e) => {
		dispatch(updateNewUserNameValue(e.target.value))
	}

});

export default connect(mapStateToProps, mapDispatchToProps)(NewUser);