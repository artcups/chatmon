import React, { PropTypes } from 'react'
import FilteredMessageList from './FilteredMessageList'
import {Page, Toolbar, Button, Input} from "react-onsenui"


const Chat = ({ toggleSideMenu, sendMessage, addSubscription, onValueChange, messages, latestMessage }) => {

	return (<div>
				<Button ripple onClick={ sendMessage.bind(this) }>New messages!</Button>
				<Button ripple onClick={ addSubscription.bind(this) }>Lägg till ny kanal!</Button>
				<FilteredMessageList onValueChange={onValueChange} messages={messages} />

				<div><ons-row verticalAlign="bottom">
					<Input	value={latestMessage.content}
							  placeholder="Say something..."
							  modifier="material"
							  type="text"
							  onChange={ onValueChange.bind(this) } />
				</ons-row>
				</div>
			</div>
	)
}

export default Chat