import React, { PropTypes } from 'react'
import ReactDOM from "react-dom"
import { Marker } from "react-google-maps";


export default class FilteredMessageList extends React.Component {

	render(){
		const { pois } = this.props;
		const pokeball = require("./../content/img/pokeball.png");



		const mappedMessages = messages.map((message, index) => {
			debugger;
			let date = new Date(message.date);
			var lastRow = index = messages.length - 1 ? "lastRow" : "";
			return <li key={message._id} className="chatRow" ref="lastRow">
				<div className="left avatar"><img src={pokeball} /></div>
				<div className="center chatMessage">
					<p className="chatText">[{date.getHours()}:{date.getMinutes()}] <label className="userName">{message.source.userName} </label>{message.content}</p>
				</div>
			</li>
		})

		return <ul className="chatList">
			{mappedMessages}
		</ul>
	}
}