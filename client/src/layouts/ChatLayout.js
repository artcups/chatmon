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
import Map from "./../components/Map";
import Chat from "./../components/Chat";
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

	toggleChannelJoinDialog() {
		if(this.props.application.channelJoinDialogIsOpen)
			this.props.dispatch(setChannelJoinDialogState(false))
		else
			this.props.dispatch(setChannelJoinDialogState(true))
	}
	hideChannelJoinDialog() {
		this.props.dispatch(setChannelJoinDialogState(false))
	}

	//renderTabs() {
	//	return [
	//		{
	//			content: <Page />,
	//			tab: <ons.Tab label='Home' icon='md-home' />
	//		},
	//		{
	//			content: <Page />,
	//			tab: <ons.Tab label='Settings' icon='md-settings' />
	//		}
	//	]
	//}

	resizeMap(){
		debugger;
		console.log('postChange');
		

	}
	render() {

		const { user, messages, onValueChange } = this.props;
		const { latestMessage } = messages;
		return <Splitter>
					<SplitterSide 	side='left'
									collapse={true}
									isOpen={this.props.application.sideMenuIsOpen}
									onClose={this.hide.bind(this)}
									isSwipeable={true}>
						<Page>
							<Button onClick={this.toggleChannelJoinDialog.bind(this)} >Join/Create</Button>
							<Dialog isOpen={this.props.application.channelJoinDialogIsOpen}
									cancelable
									onCancel={this.hideChannelJoinDialog.bind(this)}>

								<label>Channel name:</label><br/>
								<Input id="channelNameValue" onChange={this.props.onChannelNameValueChange.bind(this)}/>
								<br/><label>Channel password:</label><br/>
									<Input id="channelPasswordValue" onChange={this.props.onChannelPasswordValueChange.bind(this)}/><br/>

								<Button>Join/Create</Button>
								<Button onClick={this.hideChannelJoinDialog.bind(this)}>
									Close
								</Button>
							</Dialog>
							<List 	dataSource={user.subscriptions}
									renderRow={(subscription) => ( <ListItem key={subscription._id} onClick={() => this.toogleDest(subscription)} tappable>{subscription.name}</ListItem> )} />
						</Page>
					</SplitterSide>
					<SplitterContent>
						<Page>
							<Tabbar
								onPreChange={() => console.log('preChange')}
								onPostChange={this.resizeMap.bind(this)}
								onReactive={() => console.log('postChange')}
								position='top'
								initialIndex={0}
								ref="tabs"
								className="dasda"
								renderTabs={() => [{
									  content: <Page ref="chat" key="0" class="page" renderToolbar={() =>
									  			<Navbar toggleSideMenu={this.toggleSideMenu.bind(this)} headerText="Messages"/> } title="Messages" >
													<Chat toggleSideMenu={this.toggleSideMenu}
															sendMessage={this.sendMessage}
															addSubscription={this.addSubscription}
															onValueChange={onMessageValueChage}
															messages={messages.messages}
															latestMessage={latestMessage}
															ref="chat" />
												</Page>
									  ,
									  tab: <Tab key="0" label="Messages" icon="md-home" />
									},
									{
									  content: <Page key="1" class="page" renderToolbar={() => <Navbar toggleSideMenu={this.toggleSideMenu.bind(this)} headerText="Map"/> } title="Map" ><Map ref="map" markers={messages} style={this.style}></Map></Page>,
									  tab: <Tab key="1" label="Map" icon="md-settings" />
									}]
								  }
							/>
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
		onMessageValueChange: (e) => {
			dispatch(updateNewMessageValue(e.target.value))
		},
		onChannelNameValueChange: (e) => {
			dispatch(newDest(e.target.value, document.getElementById("channelPasswordValue").value))
		},
		onChannelPasswordValueChange: (e) => {
			dispatch(newDest(document.getElementById("channelNameValue").value, e.target.value))
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatLayout);
