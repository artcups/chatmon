import React from "react"
import { Link, hashHistory } from 'react-router'
import {
	Page,
	Button,
	Toolbar,
	Icon,
	Input,
	ToolbarButton,
	Row
} from 'react-onsenui';

// load Onsen UI library
import ons from 'onsenui';


export default function Layout({ children }) {
	let toolbarButton;

	 return (
		 <div>{children}</div>
	)
}