import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer'
import history from '../history'
import { saga as peopleSaga } from '../ducks/people'

const sagaMiddleware = createSagaMiddleware()

const enhancer = applyMiddleware(
  thunk,
  sagaMiddleware,
  routerMiddleware(history),
  logger
)

const store = createStore(reducer, enhancer)

sagaMiddleware.run(peopleSaga)

window.store = store

export default store
