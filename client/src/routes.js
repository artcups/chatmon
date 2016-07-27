import React from 'react'
import { Route, IndexRoute, Link, IndexRedirect } from 'react-router'

//The smart components
import Layout from "./layouts/Layout"
import ChatLayout from "./layouts/ChatLayout"
import Login from "./layouts/Login"
import NewUser from "./layouts/NewUser"
import Flow from "./layouts/Flow"
import Map from "./layouts/Map"
import {RequireAuthentication} from "./components/RequireAuthentication"

const routes = (
    <Route path="/" component={Layout}>
        <IndexRedirect to="/chat/flow" />
        <Route path="/chat" component={ChatLayout} >
            <IndexRedirect to="/chat/flow" />
            <Route path="/chat/flow" component={RequireAuthentication(Flow)}/>
            <Route path="/chat/map" component={RequireAuthentication(Map)}/>
        </Route>
        <Route path="/login" component={Login}/>
        <Route path="/newUser" component={NewUser}/>
    </Route>
)
export default routes