import React, { PropTypes } from 'react'
import {Toolbar, Button, ToolbarButton, Icon, BackButton} from "react-onsenui"
const Navbar = ({ route, navigator, headerText, toggleSideMenu, goBackClick }) => {

	return (
		<Toolbar>
			<div className="left"></div>
			<div className="center">{ headerText }</div>
			<div className="right"><ToolbarButton onClick={toggleSideMenu.bind(this)}>
				<Icon icon='ion-navicon, material:md-menu' />
			</ToolbarButton></div>
		</Toolbar>
	)
}

export default Navbar