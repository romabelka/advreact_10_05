import './config'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker'
import history from './history'
import store from './redux/store'
import './mocks'

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
