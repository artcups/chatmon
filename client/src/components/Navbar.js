import React, { PropTypes } from 'react'
import {Toolbar, Button, ToolbarButton, Icon} from "react-onsenui"
const Navbar = ({ headerText, toggleSideMenu }) => {
	return (
		<Toolbar>
			<div className="left"><ToolbarButton onClick={toggleSideMenu.bind(this)}>
										<Icon icon='ion-navicon, material:md-menu' />
									</ToolbarButton></div>
			<div className="center">{ headerText }</div>
			<div className="right"></div>
		</Toolbar>
	)
}

export default Navbar