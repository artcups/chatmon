import React, { PropTypes } from 'react'
import ReactDOM from "react-dom"
import {Toolbar, Button, ToolbarButton, Icon, BackButton} from "react-onsenui"


export default class FilteredMessageList extends React.Component {

	componentDidUpdate() {
		console.log(ReactDOM.findDOMNode(this.refs.lastRow))
		ReactDOM.findDOMNode(this.refs.lastRow).scrollIntoView();
	}

	render(){
		const { messages } = this.props;
		const pokeball = require("./../content/img/pokeball.png");
		const mappedMessages = messages.map((message, index) => {
			debugger;
			var lastRow = index = messages.length - 1 ? "lastRow" : "";
			return <li key={message._id} className="chatRow" ref="lastRow">
				<div className="left avatar"><img src={pokeball} /></div>
				<div className="center chatMessage">
					<p className="chatText">[23:25] <label className="userName">{message.sender.userName} </label>{message.text}</p>
				</div>
			</li>
		})

		return <ul className="chatList">
			{mappedMessages}
		</ul>
	}
}

export default FilteredMessageList