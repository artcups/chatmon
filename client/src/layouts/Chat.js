import React from "react"
import ReactDOM from "react-dom"
import { connect } from "react-redux"
import { Router, Route, Link, hashHistory } from 'react-router'
import { push } from 'react-router-redux'
import { updateNewMessageValue, sendMessage, latestMessages, updateDest } from "../actions/messagesActions"
import { addSubscription } from "../actions/subscriptionsActions"
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
import FilteredMessageList from "./../components/FilteredMessageList";


//@connect(mapStateToProps, mapDispatchToProps)
export default class Messages extends React.Component {
	constructor(){
		super();
		this.state = { messageText: ""}
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

	toogleDest(subscription){
		this.props.dispatch(updateDest(subscription));
		this.props.dispatch(latestMessages(subscription));
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

		const { user, messages, onValueChange } = this.props;
		const { latestMessage } = messages;
		debugger;

		return <Splitter>
					<SplitterSide 	side='left'
									collapse={true}
									isOpen={this.props.application.sideMenuIsOpen}
									onClose={this.hide.bind(this)}
									isSwipeable={true}>
						<Page>
							<List 	dataSource={user.subscriptions}
									renderRow={(subscription) => ( <ListItem key={subscription._id} onClick={() => this.toogleDest(subscription)} tappable>{subscription.name}</ListItem> )} />
						</Page>
					</SplitterSide>
					<SplitterContent>
						<Page class="page" renderToolbar={() => <Navbar toggleSideMenu={this.toggleSideMenu.bind(this)} headerText="Messages"/> }>
							<Button ripple onClick={ this.sendMessage.bind(this) }>New messages!</Button>
							<Button ripple onClick={ this.addSubscription.bind(this) }>Lägg till ny kanal!</Button>

							<FilteredMessageList onValueChange={onValueChange} messages={messages.messages} />



							<div>
								<Input	value={latestMessage.content}
										onChange={ this.props.onValueChange.bind(this) } />
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

function mapDispatchToProps(dispatch) {
	return {
		onValueChange: (e) => {
			dispatch(updateNewMessageValue(e.target.value))
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
