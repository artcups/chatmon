import React from "react"
import { connect } from "react-redux"
import { Router, Route, Link, hashHistory } from 'react-router'
import { push } from 'react-router-redux'
import { sendMessage } from "../actions/messagesActions"
import { setSidemenuState } from "../actions/applicationActions"
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
} from 'react-onsenui';
import ons from 'onsenui';
import Navbar from "./../components/Navbar";



@connect((store) => {
	return {
		messages: store.messages.messages,
		location: store.location,
		application: store.application
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
	toggleSideMenu() {
		if(this.props.application.sideMenuIsOpen)
			this.props.dispatch(setSidemenuState(false))
		else
			this.props.dispatch(setSidemenuState(true))
	}
	hide() {
		this.props.dispatch(setSidemenuState(false))
	}

	render() {

		const { messages } = this.props;
		//const mappedMessages = messages.map(messages => <li>{messages}</li>)
		return	<Splitter>
					<SplitterSide
						side='left'
						collapse={true}
						isOpen={this.props.application.sideMenuIsOpen}
						onClose={this.hide.bind(this)}
						isSwipeable={true}>
						<Page>
							<List
								dataSource={['Profile', 'Followers', 'Settings']}
								renderRow={(title) => (
								<ListItem key={title} onClick={this.hide.bind(this)} tappable>{title}</ListItem>
							  )}
							/>
						</Page>
					</SplitterSide>
					<SplitterContent>
							<Page class="page"
								  renderToolbar={() =>
								<Navbar toggleSideMenu={this.toggleSideMenu.bind(this)} headerText="Messages"/>
							 }>
							<Button onClick={ this.sendMessage.bind(this) }>New messages!</Button>
							<LazyList
								length={messages.length}
								renderRow={this.renderRow.bind(this)}
								calculateItemHeight={() => ons.platform.isAndroid() ? 48 : 44}
							/>
						</Page>
					</SplitterContent>
				</Splitter>
	}
}