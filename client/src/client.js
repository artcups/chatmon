import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { Router, Route, hashHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

//The smart components
import Layout from "./components/Layout"
import Messages from "./components/Messages"
import Login from "./components/Login"

import store from "./store"
const app = document.getElementById('app')
const history = syncHistoryWithStore(hashHistory, store)

ReactDOM.render(<Provider store={store}>
	{ /* Tell the Router to use our enhanced history */ }
    <Router history={history}>
      <Route path="/" component={Layout}>
      	<Route path="messages" component={Messages}/>
        <Route path="login" component={Login}/>
      </Route>
    </Router>
</Provider>, app);