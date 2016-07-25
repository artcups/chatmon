require("./content/css/onsenui.css");
require("./content/css/onsen-css-components.css");
require("./content/main.scss");
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory, useRouterHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import createBrowserHistory from 'history/lib/createHashHistory'
import ons from 'onsenui';

import { configureStore } from "./store"
import routes from "./routes"

let state = window.__initialState__ || undefined;
const store = configureStore(hashHistory, state);
const appHistory = useRouterHistory(createBrowserHistory)();
const history = syncHistoryWithStore(appHistory, store);

const app = document.getElementById('app');
ons.ready(function() {
	render(
		<Provider store={store}>
			<Router history={history} routes={routes} />
		</Provider>,
		app
	)
})
