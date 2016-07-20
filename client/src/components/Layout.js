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

	if (!ons.platform.isAndroid()) {
		toolbarButton = <ToolbarButton>
			<Icon icon={{default: 'ion-log-in'}} />
		</ToolbarButton>;
	}
	 return (
	 <Page>
		 <div class="tile">
			 <Page id="login"
				   renderToolbar={() =>
             <Toolbar>
               <div className="center">Login</div>
               <div className="right">
                 {toolbarButton}
               </div>
             </Toolbar>
             }>
				 <div>{children}</div>
			 </Page>
		 </div>

	 </Page>
	)
}