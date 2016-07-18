import { applyMiddleware, createStore } from "redux"

import logger from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"

//The socet fot the application
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
let socket = io('http://localhost:3000');

let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

import reducer from "./reducers"

const middleware = applyMiddleware(socketIoMiddleware, promise(), thunk, logger())

export default createStore(reducer, middleware)