import React from 'react'
import { Route, IndexRoute, Link } from 'react-router'

//The smart components
import Layout from "./layouts/Layout"
import Messages from "./layouts/Chat"
import Login from "./layouts/Login"
import NewUser from "./layouts/NewUser"
import {RequireAuthentication} from "./components/RequireAuthentication"

const routes = (
    <Route path="/" component={Layout}>
        <IndexRoute component={RequireAuthentication(Messages)} />
        <Route path="/messages" component={RequireAuthentication(Messages)} />
        <Route path="/login" component={Login}/>
        <Route path="/newUser" component={NewUser}/>
    </Route>
)

export default routes