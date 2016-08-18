import React from "react"
import ReactDOM from "react-dom"
import { connect } from "react-redux"
import { Router, Route, Link, hashHistory } from 'react-router'
import { push } from 'react-router-redux'
import { updateNewMessageValue, latestMessages, latestPointOfInterest, updateDest, newDest, sendPoi } from "../actions/messagesActions"
import { addSubscription } from "../actions/subscriptionsActions"
import { setSideMenuShown, toggleSideMenu, setChannelJoinDialogShown, setPokestopDialogShown, setGymDialogShown, setPokemonDialogShown, setSideMenuSwipeAble } from "../actions/applicationActions"
import { changeMapCenter } from "../actions/mapActions"
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
import Map from './../components/Map'
import Flow from './Flow'
import ChannelJoinDialog from '../components/dialogs/ChannelJoinDialog';

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
	toggleTabs(e){
		if(e.index === 1){
			this.refs.tabs.refs.map.componentDidResized();
			this.props.setSideMenuSwipeAble(false);
		}
		else
			this.props.setSideMenuSwipeAble(true);

	}
	render() {

		const { application, user, messages, map, onMessageValueChange, setSideMenuShown, toggleSideMenu, children, toggleChannelJoinDialog, setChannelJoinDialogShown, addSubscription, onChannelNameAndPasswordChange } = this.props;
		const { latestMessage } = messages;
		return <Splitter>
					<SplitterSide 	side='left'
									collapse={true}
									isOpen={application.sideMenuIsOpen}
									onClose={() => setSideMenuShown(false)}
									onOpen={() => setSideMenuShown(true)}
									isSwipeable={application.sideMenuSwipeAble}>
						<Page>
							<Button onClick={toggleChannelJoinDialog.bind(this)} >Join/Create</Button>

							<ChannelJoinDialog
								channelJoinDialogIsShown={application.channelJoinDialogIsShown}
								setChannelJoinDialogShown={setChannelJoinDialogShown.bind(this)}
								addSubscription={addSubscription.bind(this)}
								onChannelNameAndPasswordChange={onChannelNameAndPasswordChange.bind(this)}

							/>


							<List 	dataSource={user.subscriptions}
									renderRow={(subscription) => ( <ListItem className={this.props.application.dest._id == subscription._id ? "active" : ""} key={subscription._id} onClick={() => this.props.toogleDest(subscription)} tappable>{subscription.name}</ListItem> )} />
						</Page>
					</SplitterSide>
					<SplitterContent>
						<Page>
							<Navbar toggleSideMenu={toggleSideMenu.bind(this)} headerText="Messages" title="Messages" />
							<Tabbar
								onPreChange={() => console.log('preChange')}
								onPostChange={this.toggleTabs.bind(this)}
								onReactive={() => console.log('onReactive')}
								position='top'
								initialIndex={0}
								ref="tabs"
								renderTabs={() => [{
									content: <Page ref="chat" key="0" class="page tab"  >
										<Flow 	sendMessage={this.sendMessage}
												addSubscription={this.addSubscription}
												onValueChange={onMessageValueChange}
												messages={messages.messages}
												latestMessage={latestMessage}
												ref="chat" />
										</Page>,
									tab: <Tab key="0" label="Messages" icon="md-home" />
									},{
										content: <Page ref="mapCon" key="1" class="page tab">
											<Map ref="map"
												 changeMapCenter={this.props.changeMapCenter.bind(this)}
												 setPokemonDialogShown={this.props.setPokemonDialogShown.bind(this)}
												 isPokestopDialogShown={application.isPokestopDialogShown}
												 isGymDialogShown={application.isGymDialogShown}
												 isPokemonDialogShown={application.isPokemonDialogShown}
												 sendPoi={this.props.sendPoi.bind(this)}
												 pointOfInterests={messages.pointsOfInterest}
												 position={map.position}


												 style={this.style}></Map></Page>,
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
		application: state.application,
		map: state.map
	};
}

function mapDispatchToProps(dispatch, ownProps, state) {
	return {
		onMessageValueChange: (e) => {
			dispatch(updateNewMessageValue(e.target.value))
		},

		onChannelNameAndPasswordChange:(name, key) => {
			dispatch(newDest(name, key))
		},
		onChannelNameValueChange: (name) => {
			dispatch(newDestValue(e.target.value, document.getElementById("channelPasswordValue").value))
		},
		onChannelPasswordValueChange: (e) => {
			dispatch(newDestValue(document.getElementById("channelNameValue").value, e.target.value))
		},
		changeRoute: (route) => {
			dispatch(push("/chat/" + route))
		},
		setSideMenuShown: function(shown) {
			dispatch(setSideMenuShown(shown))
		},
		toggleSideMenu: function(){
			dispatch(toggleSideMenu())
		},
		setChannelJoinDialogShown: function(show){
			dispatch(setChannelJoinDialogShown(show))
		},

		toggleChannelJoinDialog(e) {
			if(this.props.application.channelJoinDialogIsShown)
				dispatch(setChannelJoinDialogShown(false))
			else
				dispatch(setChannelJoinDialogShown(true))
		},
		hideChannelJoinDialog: function() {
			dispatch(setChannelJoinDialogState(false))
		},
		addSubscription: function(){
			debugger;
			dispatch(addSubscription(this.props.messages.newDest.name, this.props.messages.newDest.key));
		},

		toogleDest: function(subscription){
			dispatch(updateDest(subscription));
			dispatch(latestMessages(subscription));
			dispatch(latestPointOfInterest(subscription));
		},
		changeMapCenter: function(coords){
			dispatch(changeMapCenter(coords))
		},
		sendPoi: function(content){
			dispatch(sendPoi(content, this.props.application.dest));
		},
		setPokestopDialogShown: function(show){
			dispatch(setPokestopDialogShown(show))
		},
		setGymDialogShown: function(show){
			dispatch(setGymDialogShown(show))
		},
		setPokemonDialogShown: function(show){
			dispatch(setPokemonDialogShown(show))
		},
		setSideMenuSwipeAble: function(swipeAble){
			dispatch(setSideMenuSwipeAble(swipeAble))
		}
	};
}



export default connect(mapStateToProps, mapDispatchToProps)(ChatLayout);
