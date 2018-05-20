import React, { Component } from 'react'
import { Route, NavLink } from 'react-router-dom'
import ProtectedRoute from './components/common/protected-route'
import AuthPage from './routes/auth'
import AdminPage from './routes/admin'
import Events from './routes/events'

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <NavLink to="/admin/people" activeStyle={{ color: 'red' }}>
            people
          </NavLink>
        </div>
        <div>
          <NavLink to="/auth/sign-in" activeStyle={{ color: 'red' }}>
            auth
          </NavLink>
        </div>
        <div>
          <NavLink to="/events" activeStyle={{ color: 'red' }}>
            events
          </NavLink>
        </div>
        <Route path="/auth" component={AuthPage} />
        <ProtectedRoute path="/admin" component={AdminPage} />
        <Route path="/events" component={Events} />
      </div>
    )
  }
}

export default App
