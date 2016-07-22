import React from "react"
import ReactDOM from "react-dom"
import { connect } from "react-redux"
import { Router, Route, Link, hashHistory } from 'react-router'
import { push } from 'react-router-redux'
import { updateNewMessageValue, sendMessage } from "../actions/messagesActions"
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
		this.props.dispatch(sendMessage({text: this.props.messages.latestMessage.text, sender: this.props.user, _id: new Date().getTime() }));
		this.props.dispatch(updateNewMessageValue(""));
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

		const { messages, onValueChange } = this.props;
		const { latestMessage } = messages;
		debugger;

		return <Splitter>
					<SplitterSide 	side='left'
									collapse={true}
									isOpen={this.props.application.sideMenuIsOpen}
									onClose={this.hide.bind(this)}
									isSwipeable={true}>
						<Page>
							<List 	dataSource={['Profile', 'Followers', 'Settings']}
									renderRow={(title) => ( <ListItem key={title} onClick={this.hide.bind(this)} tappable>{title}</ListItem> )} />
						</Page>
					</SplitterSide>
					<SplitterContent>
						<Page class="page" renderToolbar={() => <Navbar toggleSideMenu={this.toggleSideMenu.bind(this)} headerText="Messages"/> }>
							<Button ripple onClick={ this.sendMessage.bind(this) }>New messages!</Button>

							<FilteredMessageList onValueChange={onValueChange} messages={messages.messages} />



							<div>
								<Input	value={latestMessage.text}
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
