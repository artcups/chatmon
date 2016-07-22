/*renderRow(idx) {
 return (
 /!*<LazyList length={messages.messages.length}
 renderRow={this.renderRow.bind(this)}
 calculateItemHeight={() => ons.platform.isAndroid() ? 48 : 44} />*!/
 <ListItem ref="myIndput" className="chatRow" key={idx}>
 <div className="left avatar"><img src={pokeball} /></div>
 <div className="center chatMessage">
 <label className="userName">{this.props.messages.messages[idx].sender.userName} posted:</label>
 <p className="chatText">{this.props.messages.messages[idx].text}</p>
 </div>
 </ListItem>
 );
 }*/