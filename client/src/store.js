import {  createStore, combineReducers, compose, applyMiddleware } from "redux"
import logger from "redux-logger"
import thunkMiddleware from "redux-thunk"
import { routerReducer, routerMiddleware } from 'react-router-redux'
import promise from "redux-promise-middleware"

import reducer from "./reducers"
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-router';

import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

export function configureStore(history, initialState) {
    let socket = io('http://localhost:3000');
    let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");
    

    const store = createStore(
        reducer,
        initialState,
        compose(
            applyMiddleware(
                socketIoMiddleware,
                thunkMiddleware,
                promise(),
                routerMiddleware(history),
                logger()
            )
        )
    )

    return store;
}