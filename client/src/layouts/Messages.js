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
	Row,
	ListItem,
	LazyList
} from 'react-onsenui';
import Navbar from "./../components/Navbar";

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
		this.props.dispatch(sendMessage())
	}

	renderRow(idx) {
		return (
			<ListItem key={idx}>
				{this.props.messages[idx]}
			</ListItem>
		);
	}

	render() {

		const { messages } = this.props;
		//const mappedMessages = messages.map(messages => <li>{messages}</li>)
		return <Page class="page"
					 renderToolbar={() =>
				<Navbar headerText="Messages"/>
             }>
			<Button onClick={ this.sendMessage.bind(this) }>New messages!</Button>
			<LazyList
				length={messages.length}
				renderRow={this.renderRow.bind(this)}
				calculateItemHeight={() => ons.platform.isAndroid() ? 48 : 44}
			/>
		</Page>
	}
}