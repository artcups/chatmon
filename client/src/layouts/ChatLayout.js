import React from "react"
import ReactDOM from "react-dom"
import { connect } from "react-redux"
import { Router, Route, Link, hashHistory } from 'react-router'
import { push } from 'react-router-redux'
import { updateNewMessageValue, latestMessages, updateDest, newDest } from "../actions/messagesActions"
import { addSubscription } from "../actions/subscriptionsActions"
import { toggleSideMenu, setChannelJoinDialogState } from "../actions/applicationActions"
import {
	Page,
	Button,
	Toolbar,
	Icon,
	Input,
	ToolbarButton,
	Row,
	List,
	ListItem,
	LazyList,
	Splitter,
	SplitterSide,
	SplitterContent,
	Tabbar,
	Tab,
	TabPage,
	Dialog
} from 'react-onsenui';
import ons from 'onsenui';

import Navbar from "./../components/Navbar";


//@connect(mapStateToProps, mapDispatchToProps)
export default class ChatLayout extends React.Component {
	constructor(){
		super();
		this.state = { messageText: ""}
		this.style = {
			width: "100",
			height: "100"
		}
	}

	hide() {
		this.props.dispatch(toggleSideMenu())
	}
	render() {

		const { user, messages, onMessageValueChange, toggleSideMenu,  children } = this.props;
		const { latestMessage } = messages;
		const style = {
			width: "100%",
			height: "100%"
		}
		debugger;
		return <Splitter>
					<SplitterSide 	side='left'
									collapse={true}
									isOpen={this.props.application.sideMenuIsOpen}
									onClose={this.props.toggleSideMenu.bind(this)}
									isSwipeable={true}>
						<Page>
							<Button onClick={this.props.toggleChannelJoinDialog.bind(this)} >Join/Create</Button>
							<Dialog isOpen={this.props.application.channelJoinDialogIsOpen}
									cancelable
									onCancel={this.props.hideChannelJoinDialog.bind(this)}>

								<label>Channel name:</label><br/>
								<Input id="channelNameValue" onChange={this.props.onChannelNameValueChange.bind(this)}/>
								<br/><label>Channel password:</label><br/>
									<Input id="channelPasswordValue" onChange={this.props.onChannelPasswordValueChange.bind(this)}/><br/>

								<Button>Join/Create</Button>
								<Button onClick={this.props.hideChannelJoinDialog.bind(this)}>
									Close
								</Button>
							</Dialog>
							<List 	dataSource={user.subscriptions}
									renderRow={(subscription) => ( <ListItem key={subscription._id} onClick={() => this.props.toogleDest(subscription)} tappable>{subscription.name}</ListItem> )} />
						</Page>
					</SplitterSide>
					<SplitterContent>
						<Page>
							<Navbar toggleSideMenu={toggleSideMenu.bind(this)} headerText="Messages" title="Messages" />
							<ul className="tabs">
								<li onClick={ () => { this.props.changeRoute("flow") }}>Chat</li>
								<li onClick={ () => { this.props.changeRoute("map") }} >Map</li>
							</ul>
							<div className="tabContent">
								{ children }
							</div>
						</Page>
					</SplitterContent>
				</Splitter>
	}
}

function mapStateToProps(state) {
	return {
		user: state.user.user,
		messages: state.messages,
		location: state.location,
		application: state.application
	};
}

function mapDispatchToProps(dispatch, ownProps, state) {
	return {
		onMessageValueChange: (e) => {
			dispatch(updateNewMessageValue(e.target.value))
		},
		onChannelNameValueChange: (e) => {
			dispatch(newDest(e.target.value, document.getElementById("channelPasswordValue").value))
		},
		onChannelPasswordValueChange: (e) => {
			dispatch(newDest(document.getElementById("channelNameValue").value, e.target.value))
		},
		changeRoute: (route) => {
			dispatch(push("/chat/" + route))
		},
		toggleSideMenu: function() {
			console.log(this)
			dispatch(toggleSideMenu())
		},toggleChannelJoinDialog(e) {
			if(this.props.application.channelJoinDialogIsOpen)
				dispatch(setChannelJoinDialogState(false))
			else
				dispatch(setChannelJoinDialogState(true))
		},
		hideChannelJoinDialog: function() {
			dispatch(setChannelJoinDialogState(false))
		},
		addSubscription: function(){
			dispatch(addSubscription(this.props.messages.latestMessage.content));
			dispatch(updateNewMessageValue(""));
		},

		toogleDest: function(subscription){
			dispatch(updateDest(subscription));
			dispatch(latestMessages(subscription));
		}
	};
}



export default connect(mapStateToProps, mapDispatchToProps)(ChatLayout);
