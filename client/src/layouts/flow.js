import React from "react"
import ReactDOM from "react-dom"
import { connect } from "react-redux"
import { Router, Route, Link, hashHistory } from 'react-router'
import { push } from 'react-router-redux'
import { updateNewMessageValue, sendMessage,sendPio, latestMessages, updateDest, newDest } from "../actions/messagesActions"
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
	Dialog,
	Ripple
} from 'react-onsenui';
import ons from 'onsenui';
import TiWeatherWindy from 'react-icons/lib/ti/weather-windy';
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

	sendPio(){
		debugger;
		this.props.dispatch(sendPio(this.props.messages.latestMessage.content, this.props.application.dest));
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
			<div className="messages">
				<FilteredMessageList onValueChange={onMessageValueChange} messages={messages.messages} />
			</div>
			<div className="newMessage">
				<Input
					class="input"
					value={latestMessage.content}
					placeholder="Say something..."
					type="text"
					onChange={ onMessageValueChange.bind(this) } />

				<div className="sendBtn" onClick={ this.props.sendMessage.bind(this) }><TiWeatherWindy color="#4384cd" size={30} /><Ripple color='rgba(109, 109, 109, 0.3)' /></div>
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
		},
		sendMessage: function(){
			debugger;
			dispatch(sendMessage(this.props.messages.latestMessage.content, this.props.application.dest));
			dispatch(updateNewMessageValue(""));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatLayout);
