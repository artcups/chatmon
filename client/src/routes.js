import React from 'react'
import { Route, IndexRoute, Link } from 'react-router'

//The smart components
import Layout from "./layouts/Layout"
import Messages from "./layouts/Messages"
import Login from "./layouts/Login"
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