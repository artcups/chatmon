import {Splitter} from "react-onsenui"

class SideMenu extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: false
		};
	}

	show() {
		this.setState({
			isOpen: true
		});
	}

	hide() {
		this.setState({
			isOpen: false
		});
	}

	render() {
		return (
			<Splitter>
				<SplitterSide
					side='left'
					isCollapsed={true}
					isOpen={this.state.isOpen}
					onClose={this.hide.bind(this)}
					isSwipeable={true}>
					<Page>
						Menu content
					</Page>
				</SplitterSide>
				<SplitterContent>
					<Page>
						<Button onClick={this.show.bind(this)}>Open</Button>
					</Page>
				</SplitterContent>
			</Splitter>
		);
	}
}
var mapStateToProps = function(state){
	// This component will have access to `state.battlefield` through `this.props.battle`
	return {
		application: state.application
	};
};
export default connect(mapStateToProps)(SideMenu);