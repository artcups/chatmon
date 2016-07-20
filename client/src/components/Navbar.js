import React, { PropTypes } from 'react'
import {Toolbar} from "react-onsenui"
const Navbar = ({ headerText }) => {
	return (
		<Toolbar>
			<div className="center">{ headerText }</div>
			<div className="right"></div>
		</Toolbar>
	)
}

export default Navbar