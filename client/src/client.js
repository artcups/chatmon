import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory, useRouterHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import createBrowserHistory from 'history/lib/createHashHistory'

import { configureStore } from "./store"
import routes from "./routes"

let state = window.__initialState__ || undefined;
const store = configureStore(hashHistory, state);
const appHistory = useRouterHistory(createBrowserHistory)();
const history = syncHistoryWithStore(appHistory, store);

const app = document.getElementById('app');



render(
	<Provider store={store}>
		<Router history={history} routes={routes} />
	</Provider>,
	app
)