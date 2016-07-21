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
const pokeball = require("./../content/img/pokeball.png");


//@connect(mapStateToProps, mapDispatchToProps)
export default class Messages extends React.Component {
	constructor(){
		super();
		this.state = { messageText: ""}
	}
	sendMessage(){
		this.props.dispatch(sendMessage({text: this.props.messages.latestMessage.text, sender: this.props.user }));
		this.props.dispatch(updateNewMessageValue(""));
	}

	renderRow(idx) {
		return (
			/*<LazyList length={messages.messages.length}
			 renderRow={this.renderRow.bind(this)}
			 calculateItemHeight={() => ons.platform.isAndroid() ? 48 : 44} />*/
			<ListItem ref="myIndput" className="chatRow" key={idx}>
				<div className="left avatar"><img src={pokeball} /></div>
				<div className="center chatMessage">
					<label className="userName">{this.props.messages.messages[idx].sender.userName} posted:</label>
					<p className="chatText">{this.props.messages.messages[idx].text}</p>
				</div>
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
	componentDidUpdate() {
		console.log(ReactDOM.findDOMNode(this.refs.lastRow))
		ReactDOM.findDOMNode(this.refs.lastRow).scrollIntoView();
	}

	render() {

		const { messages } = this.props;
		const { latestMessage } = messages;
		debugger;
		const mappedMessages = messages.messages.map((message, index) => {
			debugger;
			var lastRow = index = messages.messages.length - 1 ? "lastRow" : "";
			return <li ref={lastRow}>
				<div className="left avatar"><img src={pokeball} /></div>
				<div className="center chatMessage">
					<label className="userName">{message.sender.userName} posted:</label>
					<p className="chatText">{message.text}</p>
				</div>
			</li>
		})
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
							<ul className="chatList">
								{mappedMessages}
							</ul>

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
