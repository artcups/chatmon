import React from "react"
import ReactDOM from "react-dom"
import { connect } from "react-redux"
import { Router, Route, Link, hashHistory } from 'react-router'
import { push } from 'react-router-redux'
import { updateNewMessageValue, sendMessage, latestMessages, updateDest, newDest } from "../actions/messagesActions"
import { addSubscription } from "../actions/subscriptionsActions"
import { setSidemenuState, setChannelJoinDialogState } from "../actions/applicationActions"
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

import FilteredMessageList from "./../components/FilteredMessageList";


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
	sendMessage(){
		debugger;
		this.props.dispatch(sendMessage({content: this.props.messages.latestMessage.content, source: this.props.user, coord: "55.6078469,12.9859076", dest: this.props.messages.latestMessage.dest }));
		this.props.dispatch(updateNewMessageValue(""));
	}
	addSubscription(){
		this.props.dispatch(addSubscription(this.props.messages.latestMessage.content));
		this.props.dispatch(updateNewMessageValue(""));
	}
	render() {

		const { user, messages, onMessageValueChange } = this.props;
		const { latestMessage } = messages;
		return <div>
			<Button ripple onClick={ this.sendMessage.bind(this) }>New messages!</Button>
			<Button ripple onClick={ this.addSubscription.bind(this) }>Lägg till ny kanal!</Button>
			<FilteredMessageList onValueChange={onMessageValueChange} messages={messages.messages} />

			<div><ons-row verticalAlign="bottom">
				<Input	value={latestMessage.content}
						  placeholder="Say something..."
						  modifier="material"
						  type="text"
						  onChange={ onMessageValueChange.bind(this) } />
			</ons-row>
			</div>
		</div>
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

function mapDispatchToProps(dispatch) {
	return {
		onMessageValueChange: (e) => {
			dispatch(updateNewMessageValue(e.target.value))
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatLayout);
