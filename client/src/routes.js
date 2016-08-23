import React from 'react'
import { Route, IndexRoute, Link, IndexRedirect } from 'react-router'

//The smart components
import Layout from "./layouts/Layout"
import ChatLayout from "./layouts/ChatLayout"
import Login from "./layouts/Login"
import NewUser from "./layouts/NewUser"
import {RequireAuthentication} from "./components/RequireAuthentication"

const routes = (
    <Route path="/" component={Layout}>
        <IndexRedirect to="/test" />
        <Route path="/test"  component={RequireAuthentication(ChatLayout)} />
        <Route path="/login" component={Login}/>
        <Route path="/newUser" component={NewUser}/>
    </Route>
)
export default routes