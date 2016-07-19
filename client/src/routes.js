import React from 'react'
import { Route, IndexRoute, Link } from 'react-router'

//The smart components
import Layout from "./components/Layout"
import Messages from "./components/Messages"
import Login from "./components/Login"
import {RequireAuthentication} from "./components/RequireAuthentication"

function requireAuth() {
    debugger;
   /* return (nextState, replace) => {
        let { user } = store.getState().user;
        if (user.id === null)
            replace({ pathname: "/login", query: { return_to: nextState.location.pathname } });
    };*/
}

const routes = (
    <Route path="/" component={Layout}>
        <IndexRoute component={RequireAuthentication(Messages)} />
        <Route path="/messages" component={RequireAuthentication(Messages)} />
        <Route path="/login" component={Login}/>
    </Route>
)

export default routes