import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import {routerMiddleware} from 'react-router-redux'
import reducer from './reducer'
import history from '../history'
import {usersMiddleware} from '../ducks/users'

const enhancer = applyMiddleware(thunk, routerMiddleware(history), logger, usersMiddleware)

const store = createStore(reducer, enhancer)

window.store = store

export default store