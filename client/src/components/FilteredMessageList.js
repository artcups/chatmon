import React, { PropTypes } from 'react'
import ReactDOM from "react-dom"
import {Toolbar, Button, ToolbarButton, Icon, BackButton} from "react-onsenui"


export default class FilteredMessageList extends React.Component {

	componentDidUpdate() {
		if(ReactDOM.findDOMNode(this.refs.lastRow) != null)
			ReactDOM.findDOMNode(this.refs.lastRow).scrollIntoView();
	}

	render(){
		const { messages } = this.props;
		const pokeball = require("./../content/img/pokeball.png");


		const mappedMessages = messages.map((message, index) => {
			debugger;
			let date = new Date(message.date);
			var lastRow = index = messages.length - 1 ? "lastRow" : "";
			return <li key={message._id} className="chatRow" ref="lastRow">
				<div className="left avatar"><img src={pokeball} /></div>
				<div className="center chatMessage">
					<p className="chatText"><label className="userName">{message.source.userName}</label> {date.getHours()}:{date.getMinutes()}</p>
					<p className="chatContent">{message.content}</p>
				</div>
			</li>
		})

		return <ul className="chatList">
			{mappedMessages}
		</ul>
	}
}

export default FilteredMessageList