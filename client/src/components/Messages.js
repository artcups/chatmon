import React from "react"
import { connect } from "react-redux"
import { Router, Route, Link, hashHistory } from 'react-router'
import { push } from 'react-router-redux'
import { sendMessage } from "../actions/messagesActions"
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

@connect((store) => {
	return {
		messages: store.messages.messages,
		location: store.location
	};
})
export default class Messages extends React.Component {
	sendMessage(){
		debugger;
		this.props.dispatch(sendMessage())
	}

	render() {
		debugger;
		const { messages } = this.props;
		
		const mappedMessages = messages.map(messages => <li>{messages}</li>)

		return <div>
			<Button onClick={this.sendMessage.bind(this)}>Click on me!</Button>
			<ul>{mappedMessages}</ul>
		</div>
	}
}