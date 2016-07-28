import React from "react"
import { ReactRedux, connect } from "react-redux"
import  {fetchPosition} from "./../actions/mapActions";

class Layout extends React.Component {

	componentWillMount(){
		console.log("då")
		this.getPosition();
	}
	componentWillUnmount(){
		console.log("hej")
		if(this.props.map.status == -1)
			this.getPosition();
	}
	getPosition(){
		if(this.props.map.status == -1 && this.props.map.status != 1)
			this.props.dispatch(fetchPosition())
	}
	render(){
		return <div>{ this.props.children }</div>
	}
}

var mapStateToProps = function(state){
	// This component will have access to `state.battlefield` through `this.props.battle`
	return {
		user: state.user,
		map: state.map
	};
};
export default connect(mapStateToProps)(Layout);